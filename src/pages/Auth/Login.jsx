import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

// Component
import InputField from "../../components/InputField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }
  }, [dispatch, error]);

  return (
    <div id="login">
      <h2>Road to Profit</h2>
      <p className="subtitle">
        Faça o login para iniciar a sua rota para o lucro.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail: <br />
          <InputField
            type="text"
            placeholder={"Digite o seu E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </label>
        <label>
          Senha: <br />
          <InputField
            type="password"
            placeholder={"Digite sua Senha"}
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p className="subtitle">
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
