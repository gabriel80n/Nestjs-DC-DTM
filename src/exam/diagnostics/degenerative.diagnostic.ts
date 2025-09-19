export function diagnoseDegenerativeDisorders(
  answers: Record<string, string | null>,
): string {
  if (
    answers['symptom_q8'] === 'Sim' ||
    answers['exam_q6_D_estalido'] != null ||
    answers['exam_q6_D_crepitacao'] != null ||
    answers['exam_q6_E_estalido'] != null ||
    answers['exam_q6_E_crepitacao'] != null ||
    answers['exam_q7_D_estalido'] != null ||
    answers['exam_q7_D_crepitacao'] != null ||
    answers['exam_q7_E_estalido'] != null ||
    answers['exam_q7_E_crepitacao'] != null
  ) {
    if (
      includesAny(answers['exam_q6_D_crepitacao'], ['Paciente']) ||
      includesAny(answers['exam_q6_E_crepitacao'], ['Paciente']) ||
      includesAny(answers['exam_q7_D_crepitacao'], ['Paciente']) ||
      includesAny(answers['exam_q7_E_crepitacao'], ['Paciente'])
    )
      return 'Desordem Articular Degenerativa: Doença articular degenerativa (confirmar por TC quando indicado)';
  }

  return 'Desordem Articular Degenerativa:Investigar outros diagnósticos';
}
function includesAny(value: string | null, options: string[]): boolean {
  if (!value) return false;

  const selected = value.split(',').map((v) => v.trim());
  return options.some((option) => selected.includes(option));
}
