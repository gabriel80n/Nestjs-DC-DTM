import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/exam.dto';
import { processExamDiagnosis } from './diagnostics/index';
import { ALL_EXAM_KEYS } from './answersKeys/answers-keys';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async createExam(data: CreateExamDto, userId: number) {
    console.log(data);
    try {
      // Verifica se paciente existe
      const patientExists = await this.prisma.patient.findUnique({
        where: { id: data.patientId },
      });
      if (!patientExists) {
        throw new NotFoundException(
          `Paciente com id ${data.patientId} não encontrado.`,
        );
      }

      // Verifica se usuário existe
      const userExists = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        throw new NotFoundException(`Usuário com id ${userId} não encontrado.`);
      }

      const answers = await this.normalizeAnswers(data.answers || {});

      const comentarios = answers['exam_q11_comentarios'] || null;

      const createdExam = await this.prisma.exam.create({
        data: {
          patientId: data.patientId,
          userId,
          status: 'in_progress',
          answers,
          observations: comentarios,
        },
      });

      // Diagnóstico automático
      const diagnostics = processExamDiagnosis(answers);

      // (Opcional) Salva os diagnósticos no banco
      await this.prisma.exam.update({
        where: { id: createdExam.id },
        data: {
          result: diagnostics, // precisa do campo diagnosticDetails no schema
          status: 'pending_validation',
        },
      });

      // Retorna diagnóstico ao front
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
      const exam = await this.prisma.exam.findUnique({
        where: { id: examId },
        include: {
          patient: {
            select: {
              id: true,
              name: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          validator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
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
    onlyNotValidated: boolean = false,
  ) {
    const filters: any[] = [];

    // filtro de validação
    if (onlyNotValidated) {
      filters.push({
        OR: [{ validated: false }, { validated: null }],
      });
    }

    // filtro por query + tipo
    if (query?.trim()) {
      switch (type) {
        case 'id': {
          const examId = Number(query);
          if (!isNaN(examId)) {
            filters.push({ id: examId });
          }
          break;
        }
        case 'patient':
          filters.push({
            patient: {
              name: {
                contains: query,
              },
            },
          });
          break;

        case 'user':
          filters.push({
            user: {
              name: {
                contains: query,
              },
            },
          });
          break;
      }
    }

    // Se não tiver nenhum filtro, retorna todos (possivelmente só não validados)
    const whereClause = filters.length > 0 ? { AND: filters } : undefined;

    return this.prisma.exam.findMany({
      where: whereClause,
      include: {
        patient: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            type: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async validateExamWithChanges(
    examId: number,
    validatorId: number,
    newAnswers: Record<string, string | null | undefined>,
  ) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    try {
      const exam = await this.prisma.exam.findUnique({
        where: { id: examId },
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

      const updatedExam = await this.prisma.exam.update({
        where: { id: examId },
        data: {
          validated: true,
          status: 'validated',
          validatedAt: new Date(),
          validatorId,
          answers: normalizedNewAnswers,
          observations: normalizedNewAnswers['exam_q11_comentarios'] || null,
          result: processExamDiagnosis(normalizedNewAnswers),
          validationChanges: Object.keys(changes).length > 0 ? changes : null,
        },
      });

      return {
        message: 'Exame validado com sucesso.',
        examId: updatedExam.id,
        changes: changes,
      };
    } catch (error) {
      console.error('[Erro ao validar exame com alterações]:', error);
      throw new InternalServerErrorException('Erro ao validar exame.');
    }
  }

  async deleteExam(examId: number) {
    try {
      // Tenta deletar, caso não exista, lança NotFoundException
      await this.prisma.exam.delete({
        where: { id: examId },
      });
    } catch (error) {
      // Se o erro for de registro não encontrado, lança 404
      if (error.code === 'P2025') {
        // código do Prisma para registro não encontrado
        throw new NotFoundException(`Exame com id ${examId} não encontrado.`);
      }
      throw new InternalServerErrorException('Erro ao deletar exame.');
    }
  }
}
