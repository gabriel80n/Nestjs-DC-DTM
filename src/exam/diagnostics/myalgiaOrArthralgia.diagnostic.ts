export function diagnoseMyalgiaOrArthralgia(
  answers: Record<string, string | null>,
): string {
  if (
    answers['symptom_q5'] === 'Sim' &&
    (answers['symptom_q7_q1'] != null ||
      answers['symptom_q7_q2'] != null ||
      answers['symptom_q7_q3'] != null ||
      answers['symptom_q7_q4'] != null)
  ) {
    if (
      includesAny(answers['exam_q1_b_ld'], ['Temporal']) ||
      includesAny(answers['exam_q1_b_le'], ['Temporal'])
    ) {
      if (
        includesCefaleiaFamiliar(answers['exam_q4_1_D_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q4_1_E_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q4_2_D_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q4_2_E_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q5_1_D_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q5_1_E_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q5_2_D_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q5_2_E_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q5_3_D_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q5_3_E_temporal']) ||
        includesCefaleiaFamiliar(answers['exam_q9_E_temporal_posterior']) ||
        includesCefaleiaFamiliar(answers['exam_q9_E_temporal_medio']) ||
        includesCefaleiaFamiliar(answers['exam_q9_E_temporal_anterior']) ||
        includesCefaleiaFamiliar(answers['exam_q9_D_temporal_posterior']) ||
        includesCefaleiaFamiliar(answers['exam_q9_D_temporal_posterior']) ||
        includesCefaleiaFamiliar(answers['exam_q9_D_temporal_posterior'])
      ) {
        return 'Diagnostico de Mialgia ou Artralgia: Cefaleia atribuída à DTM. (caso a cefaleia não seja melhor explicada por outro diagnostico de cefaleia)';
      }
    }
  }

  return 'Diagnostico de Mialgia ou Artralgia: Investigar outros diagnósticos de dor';
}

function includesAny(value: string | null, options: string[]): boolean {
  if (!value) return false;

  const selected = value.split(',').map((v) => v.trim());
  return options.some((option) => selected.includes(option));
}

function includesCefaleiaFamiliar(value: string | null): boolean {
  return (
    value
      ?.split(',')
      .map((s) => s.trim())
      .includes('Cefaleia Familiar') ?? false
  );
}
