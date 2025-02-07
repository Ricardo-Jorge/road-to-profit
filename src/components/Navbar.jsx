import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to="/">
        <span>
          {" "}
          <img src={logo} alt="" />
        </span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
