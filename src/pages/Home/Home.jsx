import style from "./Home.module.css";
import mainImgage from "../../assets/main-image.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    return navigate(`/${name}`);
  };

  return (
    <div className={style.home_container}>
      <section className={style.main}>
        <div className={style.intro}>
          <p>
            <span className={style.logo}>Road to Profit</span> surgiu para você
            que tem objetivo de alcançar um determinado{" "}
            <span className={style.profit}>lucro</span> em sua jornada mas
            esbarra nos complexos calculos de{" "}
            <span className={style.cost}>custos</span> e como analisar essas
            informações de forma correta.
          </p>
          <p>
            Com a nossa ferramenta você vai escolher dentre três categorias de
            calculo (Alugado, Financiado, Quitado), cada uma delas com seus
            determinados custos. Ao final será gerado um relatório personalizado
            com todas as informações necessárias para você conseguir alcançar o
            seu lucro esperado.
          </p>
        </div>
        <div className={style.main_img}>
          <img src={mainImgage} alt="" />
        </div>
      </section>
      <section className={style.steps}>
        <div className={style.cards}>
          <h2>1° Passo:</h2>
        </div>
        <div className={style.cards}>
          <h2>2° Passo:</h2>
        </div>
        <div className={style.cards}>
          <h2>3° Passo:</h2>
        </div>
      </section>
      <section className={style.btn_section}>
        <h2>Escolha uma das categorias para começar:</h2>
        <button name="alugado" onClick={() => handleClick("alugado")}>
          Alugado
        </button>
        <button name="financiado" onClick={() => handleClick("financiado")}>
          Financiado
        </button>
        <button name="quitado" onClick={() => handleClick("quitado")}>
          Quitado
        </button>
      </section>
    </div>
  );
};

export default Home;
