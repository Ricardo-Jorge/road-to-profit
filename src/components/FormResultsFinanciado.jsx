/* eslint-disable react/prop-types */
import style from "./FormResults.module.css";

const FormResultsFinanciado = ({
  onClose,
  resultsFinanciado,
  formDataFinanciado,
}) => {
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
                R$ {resultsFinanciado.faturamentoTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento Diário</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.faturamentoDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Impostos (Diário)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoImpostosDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Seguro (Diário) </td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.seguroDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Financiamento (Dia)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoFinanciamentoDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Combustível (Mensal)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoCombustivel.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Total (Diário)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoTotalDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Combustível (Diário)</td>
              <td className={style.coluna_2}>
                R$ {resultsFinanciado.custoCombustivelDia.toFixed(2)}
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
        no mês, será necessário aceitar viagens com trarifas de, no minimo,{" "}
        <span className={style.profit}>R$ {}</span>. Seu custo diário será de{" "}
        <span className={style.cost}>
          R$ {resultsFinanciado.custoTotalDia.toFixed(2)}
        </span>
        , com isso, será necessário alcançar um faturamento diário de{" "}
        <span className={style.profit}>
          R$ {resultsFinanciado.faturamentoDia.toFixed(2)}
        </span>
        .
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FormResultsFinanciado;
