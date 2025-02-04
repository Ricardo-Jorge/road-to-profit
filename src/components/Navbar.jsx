import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to="/">
        <span>Road to Profit</span>
      </NavLink>
      <ul>
        <li>
          <NavLink to="/alugado">Alugado</NavLink>
        </li>
        <li>
          <NavLink to="/financiado">Financiado</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
