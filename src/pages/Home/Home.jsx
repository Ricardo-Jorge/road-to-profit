import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    return navigate(`/${name}`);
  };

  return (
    <div>
      <section>
        <div>
          <h1>Road to Profit</h1>
          <p>
            Calcule seus custos e lucros como motorista de aplicativo de forma
            simples e eficiente.
          </p>
          <p>
            Escolha entre as opções abaixo e descubra o melhor caminho para o
            seu lucro.
          </p>
        </div>
      </section>
      <section>
        <button
          className={style.button}
          name="alugado"
          onClick={() => handleClick("alugado")}
        >
          Alugado
        </button>
        <button
          className={style.button}
          name="financiado"
          onClick={() => handleClick("financiado")}
        >
          Financiado
        </button>
        <button
          className={style.button}
          name="quitado"
          onClick={() => handleClick("quitado")}
        >
          Quitado
        </button>
      </section>
    </div>
  );
};

export default Home;
