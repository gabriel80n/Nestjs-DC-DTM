// /* eslint-disable @typescript-eslint/no-unused-vars */
// export function diagnosePain(answers: Record<string, string | null>): string {
//   if (
//     includesAny(answers['symptom_q3'], [
//       'A dor vem e vai',
//       'Dor está sempre presente',
//     ]) &&
//     (answers['symptom_q4_q1'] === 'Sim' ||
//       answers['symptom_q4_q2'] === 'Sim' ||
//       answers['symptom_q4_q3'] === 'Sim' ||
//       answers['symptom_q4_q4'] === 'Sim')
//   ) {
//     if (
//       answers['exam_q1_a_ld'] === 'ATM' ||
//       answers['exam_q1_a_le'] === 'ATM'
//     ) {
//       if (
//         includesDorFamiliar(answers['exam_q4_1_E_ATM']) ||
//         includesDorFamiliar(answers['exam_q4_1_D_ATM']) ||
//         includesDorFamiliar(answers['exam_q4_2_E_ATM']) ||
//         includesDorFamiliar(answers['exam_q4_2_D_ATM']) ||
//         includesDorFamiliar(answers['exam_q5_1_E_ATM']) ||
//         includesDorFamiliar(answers['exam_q5_1_D_ATM']) ||
//         includesDorFamiliar(answers['exam_q5_2_E_ATM']) ||
//         includesDorFamiliar(answers['exam_q5_2_D_ATM']) ||
//         includesDorFamiliar(answers['exam_q5_3_E_ATM']) ||
//         includesDorFamiliar(answers['exam_q5_3_D_ATM']) ||
//         includesDorFamiliar(answers['exam_q9_E_polo_lateral']) ||
//         includesDorFamiliar(answers['exam_q9_E_em_volta_do_polo_lateral']) ||
//         includesDorFamiliar(answers['exam_q9_D_polo_lateral']) ||
//         includesDorFamiliar(answers['exam_q9_D_em_volta_do_polo_lateral'])
//       ) {
//         return 'Artralgia (confirme local da dor)';
//       } else return 'Investigar outros diagnósticos de dor.';
//     }
//     if (
//       includesAny(answers['exam_q1_a_ld'], [
//         'Temporal',
//         'Masseter',
//         'Outros M. Mas',
//       ]) ||
//       includesAny(answers['exam_q1_a_le'], [
//         'Temporal',
//         'Masseter',
//         'Outros M. Mas',
//       ])
//     ) {
//       if (
//         // QUESTÃO 4
//         includesDorFamiliar(answers['exam_q4_1_E_temporal']) ||
//         includesDorFamiliar(answers['exam_q4_1_E_masseter']) ||
//         includesDorFamiliar(answers['exam_q4_1_E_outro']) ||
//         includesDorFamiliar(answers['exam_q4_1_D_temporal']) ||
//         includesDorFamiliar(answers['exam_q4_1_D_masseter']) ||
//         includesDorFamiliar(answers['exam_q4_1_D_outro']) ||
//         includesDorFamiliar(answers['exam_q4_2_E_temporal']) ||
//         includesDorFamiliar(answers['exam_q4_2_E_masseter']) ||
//         includesDorFamiliar(answers['exam_q4_2_E_outro']) ||
//         includesDorFamiliar(answers['exam_q4_2_D_temporal']) ||
//         includesDorFamiliar(answers['exam_q4_2_D_masseter']) ||
//         includesDorFamiliar(answers['exam_q4_2_D_outro']) ||
//         // QUESTÃO 5
//         includesDorFamiliar(answers['exam_q5_1_E_temporal']) ||
//         includesDorFamiliar(answers['exam_q5_1_E_masseter']) ||
//         includesDorFamiliar(answers['exam_q5_1_E_outro']) ||
//         includesDorFamiliar(answers['exam_q5_1_D_temporal']) ||
//         includesDorFamiliar(answers['exam_q5_1_D_masseter']) ||
//         includesDorFamiliar(answers['exam_q5_1_D_outro']) ||
//         includesDorFamiliar(answers['exam_q5_2_E_temporal']) ||
//         includesDorFamiliar(answers['exam_q5_2_E_masseter']) ||
//         includesDorFamiliar(answers['exam_q5_2_E_outro']) ||
//         includesDorFamiliar(answers['exam_q5_2_D_temporal']) ||
//         includesDorFamiliar(answers['exam_q5_2_D_masseter']) ||
//         includesDorFamiliar(answers['exam_q5_2_D_outro']) ||
//         includesDorFamiliar(answers['exam_q5_3_E_temporal']) ||
//         includesDorFamiliar(answers['exam_q5_3_E_masseter']) ||
//         includesDorFamiliar(answers['exam_q5_3_E_outro']) ||
//         includesDorFamiliar(answers['exam_q5_3_D_temporal']) ||
//         includesDorFamiliar(answers['exam_q5_3_D_masseter']) ||
//         includesDorFamiliar(answers['exam_q5_3_D_outro']) ||
//         // QUESTÃO 9
//         includesDorFamiliar(answers['exam_q9_E_temporal_posterior']) ||
//         includesDorFamiliar(answers['exam_q9_E_temporal_medio']) ||
//         includesDorFamiliar(answers['exam_q9_E_temporal_anterior']) ||
//         includesDorFamiliar(answers['exam_q9_E_masseter_origem']) ||
//         includesDorFamiliar(answers['exam_q9_E_masseter_corpo']) ||
//         includesDorFamiliar(answers['exam_q9_E_masseter_insercao']) ||
//         includesDorFamiliar(answers['exam_q9_D_temporal_posterior']) ||
//         includesDorFamiliar(answers['exam_q9_D_temporal_medio']) ||
//         includesDorFamiliar(answers['exam_q9_D_temporal_anterior']) ||
//         includesDorFamiliar(answers['exam_q9_D_masseter_origem']) ||
//         includesDorFamiliar(answers['exam_q9_D_masseter_corpo']) ||
//         includesDorFamiliar(answers['exam_q9_D_masseter_insercao'])
//       ) {
//         if (
//           answers['exam_q9_E_temporal_posterior'] === 'Dor Referida' ||
//           answers['exam_q9_E_temporal_medio'] === 'Dor Referida' ||
//           answers['exam_q9_E_temporal_anterior'] === 'Dor Referida' ||
//           answers['exam_q9_E_masseter_origem'] === 'Dor Referida' ||
//           answers['exam_q9_E_masseter_corpo'] === 'Dor Referida' ||
//           answers['exam_q9_E_masseter_insercao'] === 'Dor Referida' ||
//           answers['exam_q9_D_temporal_posterior'] === 'Dor Referida' ||
//           answers['exam_q9_D_temporal_medio'] === 'Dor Referida' ||
//           answers['exam_q9_D_temporal_anterior'] === 'Dor Referida' ||
//           answers['exam_q9_D_masseter_origem'] === 'Dor Referida' ||
//           answers['exam_q9_D_masseter_corpo'] === 'Dor Referida' ||
//           answers['exam_q9_D_masseter_insercao'] === 'Dor Referida'
//         ) {
//           return 'Dor Miofascial Referida. (confirmar local da dor)';
//         } else if (
//           answers['exam_q9_E_temporal_posterior'] === 'Dor' ||
//           answers['exam_q9_E_temporal_medio'] === 'Dor' ||
//           answers['exam_q9_E_temporal_anterior'] === 'Dor' ||
//           answers['exam_q9_E_masseter_origem'] === 'Dor' ||
//           answers['exam_q9_E_masseter_corpo'] === 'Dor' ||
//           answers['exam_q9_E_masseter_insercao'] === 'Dor' ||
//           answers['exam_q9_D_temporal_posterior'] === 'Dor' ||
//           answers['exam_q9_D_temporal_medio'] === 'Dor' ||
//           answers['exam_q9_D_temporal_anterior'] === 'Dor' ||
//           answers['exam_q9_D_masseter_origem'] === 'Dor' ||
//           answers['exam_q9_D_masseter_corpo'] === 'Dor' ||
//           answers['exam_q9_D_masseter_insercao'] === 'Dor'
//         ) {
//           return 'Dor Miofascial com espalhamento. (confirmar local da dor)';
//         } else return 'Mialgia Local';
//       } else return 'Investigar outros diagnósticos de dor.';
//     } else {
//       return 'Investigar outros diagnósticos de dor.';
//     }
//   }

//   return 'Investigar outros diagnósticos de dor.';
// }

// function includesAll(value: string | null, required: string[]): boolean {
//   if (!value) return false;

//   const selected = value.split(',').map((v) => v.trim());
//   return required.every((r) => selected.includes(r));
// }

function includesAny(value: string | null, options: string[]): boolean {
  if (!value) return false;

  const selected = value.split(',').map((v) => v.trim());
  return options.some((option) => selected.includes(option));
}
function includesDorFamiliar(value: string | null): boolean {
  return (
    value
      ?.split(',')
      .map((s) => s.trim())
      .includes('Dor Familiar') ?? false
  );
}
export function diagnosePain(answers: Record<string, string | null>): string {
  console.log('--- Iniciando diagnóstico de dor ---');
  console.log('Respostas recebidas:', answers);

  const hasPain = includesAny(answers['symptom_q3'], [
    'A dor vem e vai',
    'Dor está sempre presente',
  ]);
  const hasAggravatingFactors =
    answers['symptom_q4_q1'] === 'Sim' ||
    answers['symptom_q4_q2'] === 'Sim' ||
    answers['symptom_q4_q3'] === 'Sim' ||
    answers['symptom_q4_q4'] === 'Sim';

  console.log('Tem dor persistente?', hasPain);
  console.log('Fatores agravantes presentes?', hasAggravatingFactors);

  if (hasPain && hasAggravatingFactors) {
    let artralgia = false;
    let mialgia = false;
    let mialgiaSubtype = '';

    // Artralgia
    const hasATM =
      includesAny(answers['exam_q1_a_ld'], ['ATM']) ||
      includesAny(answers['exam_q1_a_le'], ['ATM']);
    console.log('ATM selecionada?', hasATM);

    if (hasATM) {
      const atmPoints = [
        'exam_q4_1_E_ATM',
        'exam_q4_1_D_ATM',
        'exam_q4_2_E_ATM',
        'exam_q4_2_D_ATM',
        'exam_q5_1_E_ATM',
        'exam_q5_1_D_ATM',
        'exam_q5_2_E_ATM',
        'exam_q5_2_D_ATM',
        'exam_q5_3_E_ATM',
        'exam_q5_3_D_ATM',
        'exam_q9_E_polo_lateral',
        'exam_q9_E_em_volta_do_polo_lateral',
        'exam_q9_D_polo_lateral',
        'exam_q9_D_em_volta_do_polo_lateral',
      ];
      artralgia = atmPoints.some((key) => includesDorFamiliar(answers[key]));
      console.log('Artralgia detectada?', artralgia);
    }

    // Mialgia
    const hasMuscularPain =
      includesAny(answers['exam_q1_a_ld'], [
        'Temporal',
        'Masseter',
        'Outros M. Mas',
      ]) ||
      includesAny(answers['exam_q1_a_le'], [
        'Temporal',
        'Masseter',
        'Outros M. Mas',
      ]);
    console.log(
      'Dor muscular (músculos mastigatórios) presente?',
      hasMuscularPain,
    );

    if (hasMuscularPain) {
      const musclePoints = [
        // Q4
        'exam_q4_1_E_temporal',
        'exam_q4_1_E_masseter',
        'exam_q4_1_E_outro',
        'exam_q4_1_D_temporal',
        'exam_q4_1_D_masseter',
        'exam_q4_1_D_outro',
        'exam_q4_2_E_temporal',
        'exam_q4_2_E_masseter',
        'exam_q4_2_E_outro',
        'exam_q4_2_D_temporal',
        'exam_q4_2_D_masseter',
        'exam_q4_2_D_outro',
        // Q5
        // 'exam_q5_1_E_temporal',
        // 'exam_q5_1_E_masseter',
        // 'exam_q5_1_E_outro',
        // 'exam_q5_1_D_temporal',
        // 'exam_q5_1_D_masseter',
        // 'exam_q5_1_D_outro',
        // 'exam_q5_2_E_temporal',
        // 'exam_q5_2_E_masseter',
        // 'exam_q5_2_E_outro',
        // 'exam_q5_2_D_temporal',
        // 'exam_q5_2_D_masseter',
        // 'exam_q5_2_D_outro',
        // 'exam_q5_3_E_temporal',
        // 'exam_q5_3_E_masseter',
        // 'exam_q5_3_E_outro',
        // 'exam_q5_3_D_temporal',
        // 'exam_q5_3_D_masseter',
        // 'exam_q5_3_D_outro',
        // Q9
        'exam_q9_E_temporal_posterior',
        'exam_q9_E_temporal_medio',
        'exam_q9_E_temporal_anterior',
        'exam_q9_E_masseter_origem',
        'exam_q9_E_masseter_corpo',
        'exam_q9_E_masseter_insercao',
        'exam_q9_D_temporal_posterior',
        'exam_q9_D_temporal_medio',
        'exam_q9_D_temporal_anterior',
        'exam_q9_D_masseter_origem',
        'exam_q9_D_masseter_corpo',
        'exam_q9_D_masseter_insercao',
      ];
      mialgia = musclePoints.some((key) => includesDorFamiliar(answers[key]));
      console.log('Mialgia detectada?', mialgia);

      if (mialgia) {
        const countDors = (...fields: (string | null | undefined)[]) =>
          fields.filter((value) => value === 'Dor').length;

        const dorEsquerdaCount = countDors(
          answers['exam_q9_E_temporal_posterior'],
          answers['exam_q9_E_temporal_medio'],
          answers['exam_q9_E_temporal_anterior'],
        );
        const dorDireitaCount = countDors(
          answers['exam_q9_D_temporal_posterior'],
          answers['exam_q9_D_temporal_medio'],
          answers['exam_q9_D_temporal_anterior'],
        );

        console.log('Contagem de "Dor" lado esquerdo:', dorEsquerdaCount);
        console.log('Contagem de "Dor" lado direito:', dorDireitaCount);

        const isReferidaEsquerda =
          includesAny(answers['exam_q9_E_temporal_posterior'], [
            'Dor Referida',
          ]) &&
          includesAny(answers['exam_q9_E_temporal_medio'], ['Dor Referida']) &&
          includesAny(answers['exam_q9_E_temporal_anterior'], ['Dor Referida']);

        const isReferidaDireita =
          includesAny(answers['exam_q9_D_temporal_posterior'], [
            'Dor Referida',
          ]) &&
          includesAny(answers['exam_q9_D_temporal_medio'], ['Dor Referida']) &&
          includesAny(answers['exam_q9_D_temporal_anterior'], ['Dor Referida']);

        console.log('Dor referida detectada à esquerda?', isReferidaEsquerda);
        console.log('Dor referida detectada à direita?', isReferidaDireita);

        if (isReferidaEsquerda || isReferidaDireita) {
          mialgiaSubtype = 'Dor Miofascial Referida. (confirmar local da dor)';
        } else if (dorEsquerdaCount >= 2 || dorDireitaCount >= 2) {
          mialgiaSubtype =
            'Dor Miofascial com espalhamento. (confirmar local da dor)';
        } else {
          mialgiaSubtype = 'Mialgia Local. (confirmar local da dor)';
        }

        console.log('Subtipo de mialgia definido:', mialgiaSubtype);
      }
    }

    if (artralgia && mialgia) {
      console.log('--- Diagnóstico Final: Artralgia + Mialgia ---');
      return `Diagnostico de dor: Artralgia + ${mialgiaSubtype}`;
    } else if (artralgia) {
      console.log('--- Diagnóstico Final: Artralgia ---');
      return 'Diagnostico de dor: Artralgia (confirme local da dor)';
    } else if (mialgia) {
      console.log('--- Diagnóstico Final: Mialgia ---');
      return `Diagnostico de dor: ${mialgiaSubtype}`;
    } else {
      console.log('--- Diagnóstico Final: Outro ---');
      return 'Diagnostico de dor: Investigar outros diagnósticos de dor.';
    }
  }

  console.log('--- Nenhum critério de dor persistente atendido ---');
  return 'Diagnostico de dor: Investigar outros diagnósticos de dor.';
}
