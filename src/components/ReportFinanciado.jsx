/* eslint-disable react/prop-types */
import style from "./FormResults.module.css";

const FormResultsFinanciado = ({
  onClose,
  resultsFinanciado,
  formDataFinanciado,
}) => {
  return (
    <div className={style.modal}>
      {" "}
      <div className={style.modal_header}>
        <h1>Resultado do Calculo:</h1>
        <button className={style.close_button} onClick={onClose}>
          x
        </button>
      </div>
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
                R$ {resultsFinanciado.faturamentoTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.faturamentoDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Total</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Total (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoTotalDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Financiamento (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoFinanciamentoDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Impostos (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoImpostosDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Seguro (Dia) </td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.seguroDia.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className={style.coluna_1}>Custo Combustível (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoCombustivelDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Reserva Manutenção (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.manutencaoDia.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Baseado nas informações fornecidas, para obter um lucro Líquido de
        <span className={style.profit}>
          {" "}
          R$ {formDataFinanciado.lucroEsperado}.00
        </span>
        , rodando um total mensal de{" "}
        <span className={style.values}>
          {formDataFinanciado.kilometragemMes} quilômetros{" "}
        </span>
        no mês, será necessário aceitar viagens com tarifas de, no minimo,{" "}
        <span className={style.profit}>
          R$ {resultsFinanciado.faturamentoKm.toFixed(2)}
        </span>
        . Seu custo diário será de{" "}
        <span className={style.cost}>
          R$ {resultsFinanciado.custoTotalDia.toFixed(2)}
        </span>
        , com isso, será necessário alcançar um faturamento diário de{" "}
        <span className={style.profit}>
          R$ {resultsFinanciado.faturamentoDia.toFixed(2)}
        </span>
        .
      </p>
    </div>
  );
};

export default FormResultsFinanciado;
