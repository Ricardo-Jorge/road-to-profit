/* eslint-disable react/prop-types */
import style from "./FormResults.module.css";

const FormResults = ({ onClose, results, formData }) => {
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
                R$ {results.faturamentoTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento Diário</td>
              <td className={style.coluna_2}>
                R$ {results.faturamentoDiario.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento Hora</td>
              <td className={style.coluna_2}>
                R$ {results.faturamentoHora.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Faturamento por Km</td>
              <td className={style.coluna_2}>
                R$ {results.faturamentoKm.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Aluguel (Mensal)</td>
              <td className={style.coluna_2}>
                R$ {results.custoAluguelMensal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Combustível (Semanal)</td>
              <td className={style.coluna_2}>
                R$ {results.custoCombustivelSem.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Aluguel (Diário)</td>
              <td className={style.coluna_2}>
                R$ {results.custoAluguelDia.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className={style.coluna_1}>Custo Combustível (Diário)</td>
              <td className={style.coluna_2}>
                R$ {results.consumoDiario.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Baseado nas informações fornecidas, para obter um lucro Líquido de
        <span className={style.profit}> R$ {formData.lucroEsperado}.00</span>,
        com a franquia disponível de{" "}
        <span className={style.values}>
          {formData.kilometragemSem * 4} quilômetros{" "}
        </span>
        no mês, será necessário aceitar viagens com trarifas de, no minimo,{" "}
        <span className={style.profit}>
          R$ {results.faturamentoKm.toFixed(2)}
        </span>
        . Seu custo diário será de{" "}
        <span className={style.cost}>R$ {results.custoDiario.toFixed(2)}</span>,
        com isso, será necessário alcançar um faturamento diário de{" "}
        <span className={style.profit}>
          R$ {results.faturamentoDiario.toFixed(2)}
        </span>
        .
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FormResults;
