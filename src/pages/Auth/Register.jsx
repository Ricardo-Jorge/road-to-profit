import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import InputField from "../../components/InputField";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(user);
    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>Road to Profit</h2>
      <p className="subtitle">
        Cadastre-se para iniciar sua rota para o lucro.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Nome: <br />
          <InputField
            type="text"
            placeholder={"Digite seu nome."}
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
        </label>
        <label>
          E-mail: <br />
          <InputField
            type="text"
            placeholder={"Digite seu E-mail."}
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </label>
        <label>
          Senha: <br />
          <InputField
            type="password"
            placeholder={"Digite sua senha."}
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        <label>
          Confirmar Senha: <br />
          <InputField
            type="password"
            placeholder={"Confirme sua senha."}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword || ""}
          />
        </label>

        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p className="subtitle">
        Já possui conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  );
};

export default Register;
