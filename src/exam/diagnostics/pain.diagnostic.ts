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
  if (
    includesAny(answers['symptom_q3'], [
      'A dor vem e vai',
      'Dor está sempre presente',
    ]) &&
    (answers['symptom_q4_q1'] === 'Sim' ||
      answers['symptom_q4_q2'] === 'Sim' ||
      answers['symptom_q4_q3'] === 'Sim' ||
      answers['symptom_q4_q4'] === 'Sim')
  ) {
    let artralgia = false;
    let mialgia = false;
    let mialgiaSubtype = ''; // para diferenciar local, referida, espalhada

    // Verifica artralgia (dor na ATM)
    if (
      includesAny(answers['exam_q1_a_ld'], ['ATM']) ||
      includesAny(answers['exam_q1_a_le'], ['ATM'])
    ) {
      if (
        includesDorFamiliar(answers['exam_q4_1_E_ATM']) ||
        includesDorFamiliar(answers['exam_q4_1_D_ATM']) ||
        includesDorFamiliar(answers['exam_q4_2_E_ATM']) ||
        includesDorFamiliar(answers['exam_q4_2_D_ATM']) ||
        includesDorFamiliar(answers['exam_q5_1_E_ATM']) ||
        includesDorFamiliar(answers['exam_q5_1_D_ATM']) ||
        includesDorFamiliar(answers['exam_q5_2_E_ATM']) ||
        includesDorFamiliar(answers['exam_q5_2_D_ATM']) ||
        includesDorFamiliar(answers['exam_q5_3_E_ATM']) ||
        includesDorFamiliar(answers['exam_q5_3_D_ATM']) ||
        includesDorFamiliar(answers['exam_q9_E_polo_lateral']) ||
        includesDorFamiliar(answers['exam_q9_E_em_volta_do_polo_lateral']) ||
        includesDorFamiliar(answers['exam_q9_D_polo_lateral']) ||
        includesDorFamiliar(answers['exam_q9_D_em_volta_do_polo_lateral'])
      ) {
        artralgia = true;
      }
    }

    // Verifica mialgia (dor nos músculos da mastigação)
    if (
      includesAny(answers['exam_q1_a_ld'], [
        'Temporal',
        'Masseter',
        'Outros M. Mas',
      ]) ||
      includesAny(answers['exam_q1_a_le'], [
        'Temporal',
        'Masseter',
        'Outros M. Mas',
      ])
    ) {
      if (
        // QUESTÃO 4
        includesDorFamiliar(answers['exam_q4_1_E_temporal']) ||
        includesDorFamiliar(answers['exam_q4_1_E_masseter']) ||
        includesDorFamiliar(answers['exam_q4_1_E_outro']) ||
        includesDorFamiliar(answers['exam_q4_1_D_temporal']) ||
        includesDorFamiliar(answers['exam_q4_1_D_masseter']) ||
        includesDorFamiliar(answers['exam_q4_1_D_outro']) ||
        includesDorFamiliar(answers['exam_q4_2_E_temporal']) ||
        includesDorFamiliar(answers['exam_q4_2_E_masseter']) ||
        includesDorFamiliar(answers['exam_q4_2_E_outro']) ||
        includesDorFamiliar(answers['exam_q4_2_D_temporal']) ||
        includesDorFamiliar(answers['exam_q4_2_D_masseter']) ||
        includesDorFamiliar(answers['exam_q4_2_D_outro']) ||
        // QUESTÃO 5
        includesDorFamiliar(answers['exam_q5_1_E_temporal']) ||
        includesDorFamiliar(answers['exam_q5_1_E_masseter']) ||
        includesDorFamiliar(answers['exam_q5_1_E_outro']) ||
        includesDorFamiliar(answers['exam_q5_1_D_temporal']) ||
        includesDorFamiliar(answers['exam_q5_1_D_masseter']) ||
        includesDorFamiliar(answers['exam_q5_1_D_outro']) ||
        includesDorFamiliar(answers['exam_q5_2_E_temporal']) ||
        includesDorFamiliar(answers['exam_q5_2_E_masseter']) ||
        includesDorFamiliar(answers['exam_q5_2_E_outro']) ||
        includesDorFamiliar(answers['exam_q5_2_D_temporal']) ||
        includesDorFamiliar(answers['exam_q5_2_D_masseter']) ||
        includesDorFamiliar(answers['exam_q5_2_D_outro']) ||
        includesDorFamiliar(answers['exam_q5_3_E_temporal']) ||
        includesDorFamiliar(answers['exam_q5_3_E_masseter']) ||
        includesDorFamiliar(answers['exam_q5_3_E_outro']) ||
        includesDorFamiliar(answers['exam_q5_3_D_temporal']) ||
        includesDorFamiliar(answers['exam_q5_3_D_masseter']) ||
        includesDorFamiliar(answers['exam_q5_3_D_outro']) ||
        // QUESTÃO 9
        includesDorFamiliar(answers['exam_q9_E_temporal_posterior']) ||
        includesDorFamiliar(answers['exam_q9_E_temporal_medio']) ||
        includesDorFamiliar(answers['exam_q9_E_temporal_anterior']) ||
        includesDorFamiliar(answers['exam_q9_E_masseter_origem']) ||
        includesDorFamiliar(answers['exam_q9_E_masseter_corpo']) ||
        includesDorFamiliar(answers['exam_q9_E_masseter_insercao']) ||
        includesDorFamiliar(answers['exam_q9_D_temporal_posterior']) ||
        includesDorFamiliar(answers['exam_q9_D_temporal_medio']) ||
        includesDorFamiliar(answers['exam_q9_D_temporal_anterior']) ||
        includesDorFamiliar(answers['exam_q9_D_masseter_origem']) ||
        includesDorFamiliar(answers['exam_q9_D_masseter_corpo']) ||
        includesDorFamiliar(answers['exam_q9_D_masseter_insercao'])
      ) {
        mialgia = true;

        // Verifica subtipo mialgia
        if (
          includesAny(answers['exam_q9_E_temporal_posterior'], [
            'Dor Referida',
          ]) ||
          includesAny(answers['exam_q9_E_temporal_medio'], ['Dor Referida']) ||
          includesAny(answers['exam_q9_E_temporal_anterior'], [
            'Dor Referida',
          ]) ||
          includesAny(answers['exam_q9_E_masseter_origem'], ['Dor Referida']) ||
          includesAny(answers['exam_q9_E_masseter_corpo'], ['Dor Referida']) ||
          includesAny(answers['exam_q9_E_masseter_insercao'], [
            'Dor Referida',
          ]) ||
          includesAny(answers['exam_q9_D_temporal_posterior'], [
            'Dor Referida',
          ]) ||
          includesAny(answers['exam_q9_D_temporal_medio'], ['Dor Referida']) ||
          includesAny(answers['exam_q9_D_temporal_anterior'], [
            'Dor Referida',
          ]) ||
          includesAny(answers['exam_q9_D_masseter_origem'], ['Dor Referida']) ||
          includesAny(answers['exam_q9_D_masseter_corpo'], ['Dor Referida']) ||
          includesAny(answers['exam_q9_D_masseter_insercao'], ['Dor Referida'])
        ) {
          mialgiaSubtype = 'Dor Miofascial Referida. (confirmar local da dor)';
        } else if (
          includesAny(answers['exam_q9_E_temporal_posterior'], ['Dor']) ||
          includesAny(answers['exam_q9_E_temporal_medio'], ['Dor']) ||
          includesAny(answers['exam_q9_E_temporal_anterior'], ['Dor']) ||
          includesAny(answers['exam_q9_E_masseter_origem'], ['Dor']) ||
          includesAny(answers['exam_q9_E_masseter_corpo'], ['Dor']) ||
          includesAny(answers['exam_q9_E_masseter_insercao'], ['Dor']) ||
          includesAny(answers['exam_q9_D_temporal_posterior'], ['Dor']) ||
          includesAny(answers['exam_q9_D_temporal_medio'], ['Dor']) ||
          includesAny(answers['exam_q9_D_temporal_anterior'], ['Dor']) ||
          includesAny(answers['exam_q9_D_masseter_origem'], ['Dor']) ||
          includesAny(answers['exam_q9_D_masseter_corpo'], ['Dor']) ||
          includesAny(answers['exam_q9_D_masseter_insercao'], ['Dor'])
        ) {
          mialgiaSubtype =
            'Dor Miofascial com espalhamento. (confirmar local da dor)';
        } else {
          mialgiaSubtype = 'Mialgia Local. (confirmar local da dor)';
        }
      }
    }

    // Retorna diagnóstico combinando os achados
    if (artralgia && mialgia) {
      return `Diagnostico de dor: Artralgia + ${mialgiaSubtype}`;
    } else if (artralgia) {
      return 'Diagnostico de dor: Artralgia (confirme local da dor)';
    } else if (mialgia) {
      return `Diagnostico de dor: ${mialgiaSubtype}`;
    } else {
      return 'Diagnostico de dor: Investigar outros diagnósticos de dor.';
    }
  }

  return 'Diagnostico de dor: Investigar outros diagnósticos de dor.';
}
