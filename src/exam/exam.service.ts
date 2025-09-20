import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Exam } from 'src/database/entities/exam.entity';
import { Patient } from 'src/database/entities/patient.entity';
import { User } from '../user/entities/user.entity';

import { CreateExamDto } from './dto/exam.dto';
import { processExamDiagnosis } from './diagnostics/index';
import { ALL_EXAM_KEYS } from './answersKeys/answers-keys';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepo: Repository<Exam>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createExam(data: CreateExamDto, userId: number) {
    try {
      // Verifica se paciente existe
      const patientExists = await this.patientRepo.findOneBy({
        id: data.patientId,
      });
      if (!patientExists) {
        throw new NotFoundException(
          `Paciente com id ${data.patientId} não encontrado.`,
        );
      }

      // Verifica se usuário existe
      const userExists = await this.userRepo.findOneBy({ id: userId });
      if (!userExists) {
        throw new NotFoundException(`Usuário com id ${userId} não encontrado.`);
      }

      const answers = await this.normalizeAnswers(data.answers || {});

      const comentarios = answers['exam_q11_comentarios'] || null;

      const newExam = this.examRepo.create({
        patient: patientExists,
        user: userExists,
        status: 'in_progress',
        answers,
        observations: comentarios,
      });

      const createdExam = await this.examRepo.save(newExam);

      // Diagnóstico automático
      const diagnostics = processExamDiagnosis(answers);

      // Atualiza exame com resultado e status
      createdExam.result = diagnostics;
      createdExam.status = 'pending_validation';
      await this.examRepo.save(createdExam);

      return {
        message: 'Exame criado com sucesso.',
        examId: createdExam.id,
        diagnostic: diagnostics,
      };
    } catch (error) {
      console.error('[Erro ao criar exame]:', error);
      throw new InternalServerErrorException('Erro ao criar exame.');
    }
  }

  async getExamsByExamId(examId: number) {
    try {
      const exam = await this.examRepo.findOne({
        where: { id: examId },
        relations: ['patient', 'user', 'validator'],
        select: {
          patient: { id: true, name: true },
          user: { id: true, name: true, email: true },
          validator: { id: true, name: true, email: true },
        } as any, // TypeORM não suporta select parcial em relations nativamente, então pode precisar ajustar ou omitir
      });

      if (!exam) {
        throw new NotFoundException(`Exame com id ${examId} não encontrado.`);
      }

      return exam;
    } catch (error) {
      console.error('[Erro ao buscar exame pelo ID]:', error);
      throw new InternalServerErrorException('Erro ao buscar exame pelo ID.');
    }
  }

  async normalizeAnswers(
    rawAnswers: Record<string, string | null | undefined>,
  ): Promise<Record<string, string | null>> {
    const normalized: Record<string, string | null> = {};

    ALL_EXAM_KEYS.forEach((key) => {
      normalized[key] = rawAnswers[key] ?? null;
    });

    return normalized;
  }

  async searchExams(
    query?: string,
    type?: 'id' | 'patient' | 'user',
    onlyNotValidated = false,
  ) {
    const qb = this.examRepo
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.patient', 'patient')
      .leftJoinAndSelect('exam.user', 'user');

    if (onlyNotValidated) {
      qb.andWhere('exam.validated IS NULL OR exam.validated = false');
    }

    if (query?.trim()) {
      switch (type) {
        case 'id': {
          const examId = Number(query);
          if (!isNaN(examId)) {
            qb.andWhere('exam.id = :examId', { examId });
          }
          break;
        }
        case 'patient':
          qb.andWhere('patient.name ILIKE :patientName', {
            patientName: `%${query}%`,
          });
          break;
        case 'user':
          qb.andWhere('user.name ILIKE :userName', { userName: `%${query}%` });
          break;
      }
    }

    qb.orderBy('exam.createdAt', 'DESC');

    return qb.getMany();
  }

  async validateExamWithChanges(
    examId: number,
    validatorId: number,
    newAnswers: Record<string, string | null | undefined>,
  ) {
    try {
      const exam = await this.examRepo.findOne({
        where: { id: examId },
        relations: ['validator'],
      });

      if (!exam) {
        throw new NotFoundException(`Exame ${examId} não encontrado`);
      }

      const oldAnswers = exam.answers || {};
      const normalizedNewAnswers = await this.normalizeAnswers(newAnswers);

      // Comparar e coletar diferenças
      const changes: Record<
        string,
        { old: string | null; new: string | null }
      > = {};

      for (const key in normalizedNewAnswers) {
        const oldValue = oldAnswers[key] ?? null;
        const newValue = normalizedNewAnswers[key] ?? null;

        if (oldValue !== newValue) {
          changes[key] = { old: oldValue, new: newValue };
        }
      }

      // Atualiza o exame
      exam.validated = true;
      exam.status = 'validated';
      exam.validatedAt = new Date();

      // Busca validator para associar
      const validator = await this.userRepo.findOneBy({ id: validatorId });
      if (!validator) {
        throw new NotFoundException(
          `Validador com id ${validatorId} não encontrado.`,
        );
      }
      exam.validatorId = validatorId;

      exam.answers = normalizedNewAnswers;
      exam.observations = normalizedNewAnswers['exam_q11_comentarios'] || null;
      exam.result = processExamDiagnosis(normalizedNewAnswers);
      exam.validationChanges = Object.keys(changes).length > 0 ? changes : null;

      const updatedExam = await this.examRepo.save(exam);

      return {
        message: 'Exame validado com sucesso.',
        examId: updatedExam.id,
        changes,
      };
    } catch (error) {
      console.error('[Erro ao validar exame com alterações]:', error);
      throw new InternalServerErrorException('Erro ao validar exame.');
    }
  }

  async deleteExam(examId: number) {
    try {
      const exam = await this.examRepo.findOneBy({ id: examId });
      if (!exam) {
        throw new NotFoundException(`Exame com id ${examId} não encontrado.`);
      }
      await this.examRepo.remove(exam);
    } catch (error) {
      console.error('[Erro ao deletar exame]:', error);
      throw new InternalServerErrorException('Erro ao deletar exame.');
    }
  }
}
