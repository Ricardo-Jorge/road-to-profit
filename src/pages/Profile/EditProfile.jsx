import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../slices/userSlice"; // Supondo que você tenha essa ação
import Loading from "../../components/Loading";
import "./Profile.css";
import InputField from "../../components/InputField";
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!userAuth.token) {
      navigate("/login");
    }
    // Atualiza os estados locais com os dados do usuário ao carregar
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [userAuth.token, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData = {
      name,
      email,
      ...(password && { password }), // Só inclui password se for fornecido
      ...(confirmPassword && { confirmPassword }), // Só inclui password se for fornecido
    };

    dispatch(updateProfile(userData))
      .unwrap() // Desempacota a Promise para lidar com sucesso/erro
      .then(() => {
        navigate("/profile"); // Redireciona para a página de perfil após sucesso
      })
      .catch((err) => {
        console.error("Erro ao atualizar perfil:", err);
      });
  };

  if (loading) return <Loading />;
  if (error) return <Message type={"error"} msg={error} />;

  return (
    <div className="profile_container">
      <section className="user_info">
        <h1>Editar Perfil</h1>
        {error && <Message type={"error"} msg={error} />}
        <div className="info_card">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>
              <InputField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>
              <InputField type="email" value={email} disabled />
            </div>
            <div>
              <label>
                <strong>Nova Senha:</strong>
              </label>
              <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Deixe em branco para manter a atual"
              />
            </div>
            <div>
              <label>
                <strong>Confirmar Senha:</strong>
              </label>
              <InputField
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a nova senha"
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#FF6200", color: "#FFFFFF" }}
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              style={{
                backgroundColor: "#444",
                color: "#FFFFFF",
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
