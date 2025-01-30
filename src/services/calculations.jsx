export const custoAluguelDia = (formData) => {
  const { valorFranquiaSem, diasTrabalhado } = formData;
  if (!valorFranquiaSem || !diasTrabalhado) return 0;
  const aluguelMensalValue = (parseFloat(valorFranquiaSem) / 7) * 30;
  return aluguelMensalValue / 26;
};

export const custoAluguelMensal = (formData) => {
  const { valorFranquiaSem } = formData;
  if (!valorFranquiaSem) return 0;
  const aluguelTotal = (parseFloat(valorFranquiaSem) / 7) * 30;
  return aluguelTotal;
};

export const custoCombustivelSem = (formData) => {
  const { kilometragemSem, consumo, precoCombustivel } = formData;
  if (!kilometragemSem || !consumo || !precoCombustivel) return 0;
  const consumoSemanal = parseFloat(
    (kilometragemSem / consumo) * precoCombustivel
  );
  return consumoSemanal;
};

export const consumoDiario = (formData) => {
  const { diasTrabalhado } = formData;
  if (!diasTrabalhado) return 0;
  const consumoSemanal = custoCombustivelSem(formData); // Passando formData para a função
  const consumoDiario = consumoSemanal / parseInt(diasTrabalhado);
  return consumoDiario;
};

export const faturamentoTotal = (formData) => {
  const { lucroEsperado, valorFranquiaSem } = formData;
  if (!lucroEsperado || !valorFranquiaSem) return 0;
  const consumoDiarioValue = consumoDiario(formData); // Passando formData para a função
  const aluguelTotal = custoAluguelMensal(formData);
  const faturamentoTotal =
    parseFloat(lucroEsperado) +
    aluguelTotal + // Considerando que o valorFranquiaSem é semanal
    consumoDiarioValue * 26;
  return faturamentoTotal;
};

export const faturamentoDiario = (formData) => {
  const diasTrabalhadosTotal = 26;
  const faturamentoTotalValue = faturamentoTotal(formData); // Passando formData para a função
  return faturamentoTotalValue / diasTrabalhadosTotal;
};

export const faturamentoHora = (formData) => {
  const { horasTrabalhada } = formData;
  if (!horasTrabalhada) return 0;
  const faturamentoDiarioValue = faturamentoDiario(formData); // Passando formData para a função
  return faturamentoDiarioValue / parseInt(horasTrabalhada);
};

export const faturamentoKm = (formData) => {
  const { kilometragemSem } = formData;
  const franquiaTotal = kilometragemSem * 4;
  const faturamentoTotalValue = faturamentoTotal(formData);
  return faturamentoTotalValue / franquiaTotal;
};

export const custoDiario = (formData) => {
  const consumoDiarioValue = consumoDiario(formData);
  const diariaAluguel = custoAluguelDia(formData);
  return consumoDiarioValue + diariaAluguel;
};

const calculations = {
  custoAluguelDia,
  custoCombustivelSem,
  consumoDiario,
  faturamentoTotal,
  faturamentoDiario,
  faturamentoHora,
  faturamentoKm,
  custoDiario,
  custoAluguelMensal,
};

export default calculations;
