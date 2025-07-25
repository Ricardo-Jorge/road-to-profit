/* eslint-disable react/prop-types */
import "./Report.css";

const ReportFinanciado = ({
  onClose,
  reportData,
  formData,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="modal">
        <div className="modal_content">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // 2. Se ocorreu um erro, mostre a mensagem de erro.
  if (error) {
    return (
      <div className="modal">
        <div className="modal_header">
          <h1>Erro</h1>
          <button className="close_button" onClick={onClose}>
            x
          </button>
        </div>
        <div className="modal_content">
          <p className="error-text">Não foi possível gerar o relatório:</p>
          {/* Supondo que 'error.errors' seja um array de mensagens */}
          <p className="error-detail">{error.errors}</p>
        </div>
      </div>
    );
  }

  // 3. Se não está carregando e não há erro, mas os dados AINDA não chegaram,
  // isso pode indicar um estado transitório ou que não foi encontrado.
  if (!reportData || !formData) {
    return (
      <div className="modal">
        <div className="modal_content">
          <p>Aguardando dados...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="modal">
      {" "}
      <div className="modal_header">
        <h1>Resultado do Calculo:</h1>
        <button className="close_button" onClick={onClose}>
          x
        </button>
      </div>
      <div>
        <table className="content_table">
          <thead>
            <tr>
              <th className="content_table_header_1">Categoria</th>
              <th className="content_table_header_2">Valores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="coluna_1">Faturamento Total</td>
              <td className="coluna_2">R$ {reportData.faturamentoTotal}</td>
            </tr>
            <tr>
              <td className="coluna_1">Faturamento (Dia)</td>
              <td className="coluna_2">R$ {reportData.faturamentoDia}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Total</td>
              <td className="coluna_2">R$ {reportData.custoTotal}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Total (Dia)</td>
              <td className="coluna_2">R$ {reportData.custoTotalDia}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Financiamento (Dia)</td>
              <td className="coluna_2">
                R$ {reportData.custoFinanciamentoDia}
              </td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Impostos (Dia)</td>
              <td className="coluna_2">R$ {reportData.custoImpostosDia}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Seguro (Dia) </td>
              <td className="coluna_2">R$ {reportData.seguroDia}</td>
            </tr>

            <tr>
              <td className="coluna_1">Custo Combustível (Dia)</td>
              <td className="coluna_2">R$ {reportData.custoCombustivelDia}</td>
            </tr>
            <tr>
              <td className="coluna_1">Reserva Manutenção (Dia)</td>
              <td className="coluna_2">R$ {reportData.manutencaoDia}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Baseado nas informações fornecidas, para obter um lucro Líquido de
        <span className="profit"> R$ {formData.lucroEsperado}.00</span>, rodando
        um total mensal de{" "}
        <span className="values">{formData.kilometragemMes} quilômetros </span>
        no mês, será necessário aceitar viagens com tarifas de, no minimo,{" "}
        <span className="profit">R$ {reportData.faturamentoKm}</span>. Seu custo
        diário será de{" "}
        <span className="cost">R$ {reportData.custoTotalDia}</span>, com isso,
        será necessário alcançar um faturamento diário de{" "}
        <span className="profit">R$ {reportData.faturamentoDia}</span>.
      </p>
    </div>
  );
};

export default ReportFinanciado;
