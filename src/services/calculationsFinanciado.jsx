export const diasTrabalhados = (formDataFinanciado) => {
  const { folgasMensal } = formDataFinanciado;
  const diasTrabalhadosValue = 30 - Number(folgasMensal);
  return diasTrabalhadosValue;
};

export const custoFinanciamentoDia = (formDataFinanciado) => {
  const { parcelaFinanciamento } = formDataFinanciado;
  if (!parcelaFinanciamento) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const financiamentoDiaValue =
    Number(parcelaFinanciamento) / diasTrabalhadosValue;
  return financiamentoDiaValue;
};

export const custoImpostos = (formDataFinanciado) => {
  const { ipva, licenciamento } = formDataFinanciado;
  if (!ipva || !licenciamento) return 0;
  const totalValueImpostos = Number(ipva) + Number(licenciamento);
  return totalValueImpostos;
};

export const custoImpostosDia = (formDataFinanciado) => {
  const impostosDiaValue = custoImpostos(formDataFinanciado);
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);

  return impostosDiaValue / 12 / diasTrabalhadosValue;
};

export const seguroDia = (formDataFinanciado) => {
  const { seguro } = formDataFinanciado;
  if (!seguro) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const seguroDiaValue = Number(seguro) / diasTrabalhadosValue;
  return seguroDiaValue;
};

export const manutencaoDia = (formDataFinanciado) => {
  const { manutencao } = formDataFinanciado;
  if (!manutencao) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const manutencaoDiaValue = Number(manutencao) / diasTrabalhadosValue;
  return manutencaoDiaValue;
};

export const custoCombustivel = (formDataFinanciado) => {
  const { kilometragemMes, precoCombustivel, consumo } = formDataFinanciado;
  if (!kilometragemMes || !precoCombustivel || !consumo) return 0;
  const consumoMensal =
    Number(kilometragemMes / consumo) * Number(precoCombustivel);
  return consumoMensal;
};

export const custoCombustivelDia = (formDataFinanciado) => {
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const consumoMensal = custoCombustivel(formDataFinanciado);
  const consumoDiarioValue = consumoMensal / diasTrabalhadosValue;
  return consumoDiarioValue;
};

export const custoTotalDia = (formDataFinanciado) => {
  const financiamentoDiaValue = custoFinanciamentoDia(formDataFinanciado);
  const impostosDiaValue = custoImpostosDia(formDataFinanciado);
  const seguroDiaValue = seguroDia(formDataFinanciado);
  const manutencaoDiaValue = manutencaoDia(formDataFinanciado);
  const consumoDiaValue = custoCombustivelDia(formDataFinanciado);
  const custoTotalDia =
    financiamentoDiaValue +
    impostosDiaValue +
    seguroDiaValue +
    manutencaoDiaValue +
    consumoDiaValue;
  return custoTotalDia;
};

export const custoTotal = (formDataFinanciado) => {
  const { parcelaFinanciamento, seguro, manutencao } = formDataFinanciado;
  if (!parcelaFinanciamento || !seguro || !manutencao) return 0;
  const custoCombustivelValue = custoCombustivel(formDataFinanciado);
  const custoImpostosValue = custoImpostos(formDataFinanciado);
  const custoTotalValue =
    Number(parcelaFinanciamento) +
    Number(seguro) +
    Number(manutencao) +
    custoCombustivelValue +
    custoImpostosValue / 12;
  return custoTotalValue;
};

export const faturamentoTotal = (formDataFinanciado) => {
  const { lucroEsperado } = formDataFinanciado;
  if (!lucroEsperado) return 0;
  const custoTotalValue = custoTotal(formDataFinanciado);
  const faturamentoTotalValue = Number(lucroEsperado) + custoTotalValue;
  return faturamentoTotalValue;
};

export const faturamentoDia = (formDataFinanciado) => {
  const faturamentoTotalValue = faturamentoTotal(formDataFinanciado);
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const faturamentoDiaValue = faturamentoTotalValue / diasTrabalhadosValue;
  return faturamentoDiaValue;
};

export const faturamentoKm = (formDataFinanciado) => {
  const { kilometragemMes } = formDataFinanciado;
  if (!kilometragemMes) return 0;
  const faturamentoTotalValue = faturamentoTotal(formDataFinanciado);
  const faturamentoKmValue = faturamentoTotalValue / Number(kilometragemMes);
  return faturamentoKmValue;
};

const calculationsFinanciado = {
  custoFinanciamentoDia,
  custoImpostosDia,
  seguroDia,
  manutencaoDia,
  custoCombustivel,
  custoCombustivelDia,
  custoTotalDia,
  custoTotal,
  faturamentoTotal,
  faturamentoDia,
  faturamentoKm,
};

export default calculationsFinanciado;
