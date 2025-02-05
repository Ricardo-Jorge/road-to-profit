import { NavLink } from "react-router-dom";
import style from "./Home.module.css";
const Home = () => {
  return (
    <div className={style.home}>
      <div className={style.button}>
        <NavLink to="./alugado">
          <p>Alugado</p>
        </NavLink>
      </div>
      <div className={style.button}>
        <NavLink to="/financiado">
          <p>Financiado</p>
        </NavLink>
      </div>
      <div className={style.button}>
        <NavLink to="/quitado">
          <p>Quitado</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
