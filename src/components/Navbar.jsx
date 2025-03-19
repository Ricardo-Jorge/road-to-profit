import "./Navbar.css";
import logo from "../assets/logo.png";

import { NavLink } from "react-router-dom";

import { BsFillPersonFill } from "react-icons/bs";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/">
          <span>
            {" "}
            <img src={logo} alt="Road to Profit" />
          </span>
        </NavLink>

        <ul className="navbar-auth">
          {auth ? (
            <>
              <li>
                <NavLink to="/profile">
                  <BsFillPersonFill />
                </NavLink>
              </li>
              <li>
                <a onClick={handleLogout}>Sair</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register">Cadastrar</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
