/* eslint-disable react/prop-types */
import "./Report.css";

const ReportAlugado = ({ onClose, reportData, formData, loading, error }) => {
  console.log("info direta do componete ReportAlugado, formulário:", formData);
  console.log("info direta do componete ReportAlugado, relatório:", reportData);
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
              <td className="coluna_1">Faturamento (Hora)</td>
              <td className="coluna_2">R$ {reportData.faturamentoHora}</td>
            </tr>

            <tr>
              <td className="coluna_1">Custo Aluguel (Mês)</td>
              <td className="coluna_2">R$ {reportData.custoAluguelMes}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Combustível (Semana)</td>
              <td className="coluna_2">R$ {reportData.custoCombustivelSem}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Aluguel (Dia)</td>
              <td className="coluna_2">R$ {reportData.custoAluguelDia}</td>
            </tr>
            <tr>
              <td className="coluna_1">Custo Combustível (Dia)</td>
              <td className="coluna_2">R$ {reportData.custoCombustivelDia}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Baseado nas informações fornecidas, para obter um lucro Líquido de
        <span className="profit"> R$ {formData.lucroEsperado}.00</span>, com a
        franquia disponível de{" "}
        <span className="values">
          {formData.kilometragemSem * 4} quilômetros{" "}
        </span>
        no mês, será necessário aceitar viagens com tarifas de, no minimo,{" "}
        <span className="profit">R$ {reportData.faturamentoKm}</span>. Seu custo
        diário será de <span className="cost">R$ {reportData.custoDia}</span>,
        com isso, será necessário alcançar um faturamento diário de{" "}
        <span className="profit">R$ {reportData.faturamentoDia}</span>.
      </p>
    </div>
  );
};

export default ReportAlugado;
