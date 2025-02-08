import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    return navigate(`/${name}`);
  };

  return (
    <div className={style.home}>
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
        name="proprio"
        onClick={() => handleClick("proprio")}
      >
        Próprio
      </button>
    </div>
  );
};

export default Home;
