import style from "./Home.module.css";

//Assets
import mainImgage from "../../assets/main-image.png";
import register from "../../assets/register.svg";
import login from "../../assets/login.svg";
import form from "../../assets/form.svg";
import report from "../../assets/report.svg";
import profit from "../../assets/profit.svg";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`/profile`);
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
      <div className={style.steps}>
        <div className={style.cards}>
          <h2>1° Passo:</h2>
          <img src={register} alt="" />
          <p>Cadastrar</p>
        </div>
        <div className={style.cards}>
          <h2>2° Passo:</h2>
          <img src={login} alt="" />
          <p>Entrar</p>
        </div>
        <div className={style.cards}>
          <h2>3° Passo:</h2>
          <img src={form} alt="" />
          <p>Preencher Formulário</p>
        </div>
        <div className={style.cards}>
          <h2>4° Passo:</h2>
          <img src={report} alt="" />
          <p>Gerar Relatório</p>
        </div>
        <div className={style.cards}>
          <h2>5° Passo:</h2>
          <img src={profit} alt="" />
          <p>Caminho para Lucro</p>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default Home;
