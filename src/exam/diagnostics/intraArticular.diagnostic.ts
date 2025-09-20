export function diagnoseIntraArticularDisorders(
  answers: Record<string, string | null>,
): string {
  console.log('[Diagnóstico] Iniciando avaliação...');

  if (answers['symptom_q9'] === 'Sim' || answers['symptom_q10'] === 'Sim') {
    console.log('[Diagnóstico] Entrou no bloco: symptom_q9 ou q10 = Sim');

    const examQ4C = answers['exam_q4_C'];
    const examQ4CNumber = examQ4C !== null ? parseFloat(examQ4C) : NaN;

    console.log(`[Diagnóstico] exam_q2_q3: ${answers['exam_q2_q3']}`);
    console.log(`[Diagnóstico] exam_q4_C: ${examQ4CNumber}`);

    if (
      answers['exam_q2_q3'] === null &&
      !isNaN(examQ4CNumber) &&
      examQ4CNumber >= 40
    ) {
      console.log('[Diagnóstico] Sem limitação de abertura');
      return 'Desordens Intra-articulares: Deslocamento do disco sem redução, sem limitação de abertura. (confirmar por IRM quando indicado)';
    } else {
      console.log('[Diagnóstico] Com limitação de abertura');
      return 'Desordens Intra-articulares: Deslocamento de disco sem redução, com limitação de abertura. (confirmar por IRM quando indicado)';
    }
  } else if (
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
    console.log(
      '[Diagnóstico] Entrou no bloco: clique/estalido/crepitação ou symptom_q8',
    );

    if (
      includesAll(answers['exam_q6_D_estalido'], ['Abertura', 'Fechamento']) ||
      includesAll(answers['exam_q6_E_estalido'], ['Abertura', 'Fechamento']) ||
      ((includesAny(answers['exam_q6_D_estalido'], [
        'Abertura',
        'Fechamento',
      ]) ||
        includesAny(answers['exam_q6_E_estalido'], [
          'Abertura',
          'Fechamento',
        ])) &&
        (includesAny(answers['exam_q7_D_estalido'], [
          'Lateralidade',
          'Protusão',
        ]) ||
          includesAny(answers['exam_q7_E_estalido'], [
            'Lateralidade',
            'Protusão',
          ])))
    ) {
      console.log(
        '[Diagnóstico] Estalidos compatíveis com deslocamento de disco com redução',
      );

      if (
        answers['symptom_q11'] === 'Sim' &&
        answers['symptom_q12'] !== 'Não'
      ) {
        console.log('[Diagnóstico] Travamento intermitente detectado');

        if (
          includesAny(answers['exam_q8_D_AM'], ['Redução(examinador)']) ||
          includesAny(answers['exam_q8_E_AM'], ['Redução(examinador)']) ||
          includesAny(answers['exam_q8_D_A'], ['Redução(examinador)']) ||
          includesAny(answers['exam_q8_E_A'], ['Redução(examinador)'])
        ) {
          console.log('[Diagnóstico] Redução observada pelo examinador');
          return 'Desordens Intra-articulares: Deslocamento do disco com redução, com travamento intermitente. (confirmar por IRM quando indicado)';
        } else {
          console.log(
            '[Diagnóstico] Sem redução observada, limitação de abertura',
          );
          return 'Desordens Intra-articulares: Deslocamento do disco sem redução, com limitação de abertura. (confirmar por IRM quando indicado)';
        }
      } else {
        console.log('[Diagnóstico] Sem travamento intermitente');
        return 'Desordens Intra-articulares: Deslocamento do disco com redução';
      }
    } else {
      console.log(
        '[Diagnóstico] Estalidos não compatíveis com deslocamento típico',
      );
      return 'Desordens Intra-articulares: Investigar outros diagnósticos';
    }
  } else {
    console.log('[Diagnóstico] Nenhuma condição atendida');
    return 'Desordens Intra-articulares: Investigar outros diagnósticos';
  }
}

function includesAll(value: string | null, required: string[]): boolean {
  if (!value) return false;

  const selected = value.split(',').map((v) => v.trim());
  return required.every((r) => selected.includes(r));
}

function includesAny(value: string | null, options: string[]): boolean {
  if (!value) return false;

  const selected = value.split(',').map((v) => v.trim());
  return options.some((option) => selected.includes(option));
}
