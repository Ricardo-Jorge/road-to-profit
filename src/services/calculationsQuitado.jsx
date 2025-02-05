export const diasTrabalhados = (formDataQuitado) => {
  const { folgasMensal } = formDataQuitado;
  const diasTrabalhadosValue = 30 - Number(folgasMensal);
  return diasTrabalhadosValue;
};

export const custoImpostos = (formDataQuitado) => {
  const { ipva, licenciamento } = formDataQuitado;
  if (!ipva || !licenciamento) return 0;
  const totalValueImpostos = Number(ipva) + Number(licenciamento);
  return totalValueImpostos;
};

export const custoImpostosDia = (formDataQuitado) => {
  const impostosDiaValue = custoImpostos(formDataQuitado);
  const diasTrabalhadosValue = diasTrabalhados(formDataQuitado);

  return impostosDiaValue / 12 / diasTrabalhadosValue;
};

export const seguroDia = (formDataQuitado) => {
  const { seguro } = formDataQuitado;
  if (!seguro) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataQuitado);
  const seguroDiaValue = Number(seguro) / diasTrabalhadosValue;
  return seguroDiaValue;
};

export const manutencaoDia = (formDataQuitado) => {
  const { manutencao } = formDataQuitado;
  if (!manutencao) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataQuitado);
  const manutencaoDiaValue = Number(manutencao) / diasTrabalhadosValue;
  return manutencaoDiaValue;
};

export const custoCombustivel = (formDataQuitado) => {
  const { kilometragemMes, precoCombustivel, consumo } = formDataQuitado;
  if (!kilometragemMes || !precoCombustivel || !consumo) return 0;
  const consumoMensal =
    Number(kilometragemMes / consumo) * Number(precoCombustivel);
  return consumoMensal;
};

export const custoCombustivelDia = (formDataQuitado) => {
  const diasTrabalhadosValue = diasTrabalhados(formDataQuitado);
  const consumoMensal = custoCombustivel(formDataQuitado);
  const consumoDiarioValue = consumoMensal / diasTrabalhadosValue;
  return consumoDiarioValue;
};

export const custoTotalDia = (formDataQuitado) => {
  const impostosDiaValue = custoImpostosDia(formDataQuitado);
  const seguroDiaValue = seguroDia(formDataQuitado);
  const manutencaoDiaValue = manutencaoDia(formDataQuitado);
  const consumoDiaValue = custoCombustivelDia(formDataQuitado);
  const custoTotalDia =
    impostosDiaValue + seguroDiaValue + manutencaoDiaValue + consumoDiaValue;
  return custoTotalDia;
};

export const custoTotal = (formDataQuitado) => {
  const { seguro, manutencao } = formDataQuitado;
  if (!seguro || !manutencao) return 0;
  const custoCombustivelValue = custoCombustivel(formDataQuitado);
  const custoImpostosValue = custoImpostos(formDataQuitado);
  const custoTotalValue =
    Number(seguro) +
    Number(manutencao) +
    custoCombustivelValue +
    custoImpostosValue / 12;
  return custoTotalValue;
};

export const faturamentoTotal = (formDataQuitado) => {
  const { lucroEsperado } = formDataQuitado;
  if (!lucroEsperado) return 0;
  const custoTotalValue = custoTotal(formDataQuitado);
  const faturamentoTotalValue = Number(lucroEsperado) + custoTotalValue;
  return faturamentoTotalValue;
};

export const faturamentoDia = (formDataQuitado) => {
  const faturamentoTotalValue = faturamentoTotal(formDataQuitado);
  const diasTrabalhadosValue = diasTrabalhados(formDataQuitado);
  const faturamentoDiaValue = faturamentoTotalValue / diasTrabalhadosValue;
  return faturamentoDiaValue;
};

export const faturamentoHora = (formDataQuitado) => {
  const { horasTrabalhada } = formDataQuitado;
  const faturamentoDiaValue = faturamentoDia(formDataQuitado);
  const faturamentoHoraValue = faturamentoDiaValue / Number(horasTrabalhada);
  return faturamentoHoraValue;
};

export const faturamentoKm = (formDataQuitado) => {
  const { kilometragemMes } = formDataQuitado;
  if (!kilometragemMes) return 0;
  const faturamentoTotalValue = faturamentoTotal(formDataQuitado);
  const faturamentoKmValue = faturamentoTotalValue / Number(kilometragemMes);
  return faturamentoKmValue;
};

const calculationsQuitado = {
  custoImpostosDia,
  seguroDia,
  manutencaoDia,
  custoCombustivel,
  custoCombustivelDia,
  custoTotalDia,
  custoTotal,
  faturamentoTotal,
  faturamentoDia,
  faturamentoHora,
  faturamentoKm,
};

export default calculationsQuitado;
