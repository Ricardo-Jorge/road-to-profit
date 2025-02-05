/* eslint-disable react/prop-types */
import style from "./FormResults.module.css";

const FormResultsQuitado = ({ onClose, resultsQuitado, formDataQuitado }) => {
  return (
    <div className={style.modal}>
      <h1>Resultado do Calculo:</h1>
      <div>
        <table className={style.content_table}>
          <thead>
            <tr>
              <th className={style.coluna_1}>Categoria</th>
              <th className={style.coluna_2}>Valores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={style.coluna_1}>Faturamento Total</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.faturamentoTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento Diário</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.faturamentoDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento Hora</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.faturamentoHora.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Total (Mês)</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.custoTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Total (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.custoTotalDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Imposto (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.custoImpostosDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Combustível (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.custoCombustivelDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Seguro (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.seguroDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Reserva Manutenção (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsQuitado.manutencaoDia.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Baseado nas informações fornecidas, para obter um lucro Líquido de{" "}
        <span className={style.profit}>
          {" "}
          R$ {formDataQuitado.lucroEsperado}.00
        </span>{" "}
        rodando um total mensal de{" "}
        <span className={style.values}>
          {formDataQuitado.kilometragemMes} quilômetros
        </span>{" "}
        no mês, será necessário aceitar viagens que paguem, pelo menos,{" "}
        <span className={style.profit}>
          R$ {resultsQuitado.faturamentoKm.toFixed(2)}
        </span>
        . Seu custo diário será de{" "}
        <span className={style.cost}>
          {" "}
          R$ {resultsQuitado.custoTotalDia.toFixed(2)}
        </span>
        , com isso, será necessário alcançar um faturamento diário de{" "}
        <span className={style.profit}>
          {" "}
          R$ {resultsQuitado.faturamentoDia.toFixed(2)}
        </span>
      </p>
      .<button onClick={onClose}>Close</button>
    </div>
  );
};

export default FormResultsQuitado;
