import { diagnoseIntraArticularDisorders } from './intraArticular.diagnostic';
import { diagnoseDegenerativeDisorders } from './degenerative.diagnostic';
import { diagnoseSubluxation } from './subluxation.diagnostic';
import { diagnosePain } from './pain.diagnostic';
import { diagnoseMyalgiaOrArthralgia } from './myalgiaOrArthralgia.diagnostic';

export function processExamDiagnosis(answers: Record<string, any>): string[] {
  return [
    diagnoseIntraArticularDisorders(answers),
    diagnoseDegenerativeDisorders(answers),
    diagnoseSubluxation(answers),
    diagnosePain(answers),
    diagnoseMyalgiaOrArthralgia(answers),
  ];
}
