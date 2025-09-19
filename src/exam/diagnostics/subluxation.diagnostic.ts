export function diagnoseSubluxation(
  answers: Record<string, string | null>,
): string {
  if (answers['symptom_q13'] === 'Sim' && answers['symptom_q14'] === 'Sim') {
    if (
      includesAny(answers['exam_q8_D_A'], ['Travamento']) ||
      includesAny(answers['exam_q8_D_AM'], ['Travamento']) ||
      includesAny(answers['exam_q8_E_A'], ['Travamento']) ||
      includesAny(answers['exam_q8_E_AM'], ['Travamento'])
    )
      return 'Subluxação: Sim';
  }

  return 'Subluxação: Não';
}

function includesAny(value: string | null, options: string[]): boolean {
  if (!value) return false;

  const selected = value.split(',').map((v) => v.trim());
  return options.some((option) => selected.includes(option));
}
