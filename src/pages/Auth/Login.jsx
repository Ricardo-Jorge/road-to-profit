import "./Auth.css";

import { useState } from "react";
import InputField from "../../components/InputField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // const user = {
    //   email,
    //   password,
    // };
  };
  return (
    <div id="login">
      <h2>Road to Profit</h2>
      <p className="subtitle">
        Faça o login para iniciar a sua rota para o lucro.
      </p>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder={"Digite o seu E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <InputField
          type="password"
          placeholder={"Digite sua Senha"}
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <InputField type="submit" value={"Entrar"} />
      </form>
    </div>
  );
};

export default Login;
