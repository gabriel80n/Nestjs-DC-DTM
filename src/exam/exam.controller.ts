// exam.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/exam.dto';
import { SearchExamsDto } from './dto/search-exams.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  createExam(@Body() createExamDto: CreateExamDto, @Req() req: any) {
    const userId = req.user.id; // vem do token
    return this.examService.createExam(createExamDto, userId);
  }
  @Get('patient/:examId')
  getExamsByexam(@Param('examId') examId: string) {
    return this.examService.getExamsByExamId(Number(examId));
  }
  @Post('full')
  getExams(@Body() body: SearchExamsDto) {
    return this.examService.searchExams(
      body.query,
      body.type,
      body.onlyNotValidated ?? false,
    );
  }
  @Roles('admin', 'validator')
  @Patch(':id/validate')
  async validateExam(
    @Param('id') examId: number,
    @Req() req: any,
    @Body() body: CreateExamDto, // mesmo DTO usado para criar exame, pois tem `answers`
  ) {
    const validatorId = req.user.id;
    return this.examService.validateExamWithChanges(
      examId,
      validatorId,
      body.answers,
    );
  }
  @Roles('admin')
  @Delete(':id')
  async deleteExam(@Param('id') id: number) {
    await this.examService.deleteExam(id);
    return { message: 'Exame deletado com sucesso.' };
  }
}
