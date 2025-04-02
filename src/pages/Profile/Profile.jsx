import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllFormsAlugado,
  createFormAlugado,
  updateFormAlugado,
  deleteFormAlugado,
  resetMessage,
} from "../../slices/formAlugadoSlice";
import { profile } from "../../slices/userSlice";

import { FaRegEye } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LuClipboardPlus } from "react-icons/lu";

import "./Profile.css";
import { format, parseISO } from "date-fns";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    forms: alugadoForms,
    loading: loadingForm,
    error: formError,
    success,
  } = useSelector((state) => state.formAlugado);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userAuth.token) {
      navigate("/login");
    } else {
      dispatch(profile());
      dispatch(getAllFormsAlugado());
    }
  }, [dispatch, userAuth.token, navigate]);

  useEffect(() => {
    if (formError || success) {
      setTimeout(() => {
        dispatch(resetMessage());
      }, 3000);
    }
  }, [formError, success, dispatch]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleCreateForm = (type) => {
    navigate(`/${type.toLowerCase()}`);
  };

  const handleDeleteForm = (id) => {
    dispatch(deleteFormAlugado(id));
  };

  if (userLoading || loadingForm) return <div>Carregando...</div>;
  if (userError)
    return (
      <div style={{ color: "red" }}>Erro ao carregar perfil: {userError}</div>
    );
  if (formError)
    return (
      <div style={{ color: "red" }}>
        Erro ao carregar formulários: {formError}
      </div>
    );

  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";

    try {
      const date = parseISO(dateString); // Converte a string ISO para um objeto Date
      return format(date, "dd/MM/yyyy HH:mm"); // Formata no formato desejado
    } catch (error) {
      return "Data inválida";
    }
  };

  // Ajuste para lidar com a estrutura aninhada, se necessário
  const userData = user.user || user; // Desaninha se necessário
  const formsDataAlugado = alugadoForms.forms || alugadoForms; // Desaninha se necessário

  return (
    <div className="profile_container">
      <section className="user_info">
        <h1>Bem vindo, {userData.name || "Usuário"}.</h1>
        <div className="info_card">
          <p>
            <strong>Nome:</strong> {userData.name || "Não disponível"}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "Não disponível"}
          </p>
          <p>
            <strong>Senha:</strong> {userData.password || "********"}
          </p>
          <button onClick={handleEditProfile}>Editar Perfil</button>
        </div>
      </section>

      <section className="forms_list">
        <h2>Seus Formularios</h2>
        {formError && <div style={{ color: "red" }}>{formError}</div>}
        {success && (
          <div style={{ color: "green" }}>Ação realizada com sucesso!</div>
        )}

        {formsDataAlugado.length === 0 ? (
          <p>Nenhum formulário preenchido ainda.</p>
        ) : (
          <div className="forms">
            <div className="form_card">
              <h3>Alugado</h3>
              {formsDataAlugado.map((form) => (
                <>
                  <div className="form_list">
                    <p key={form.id}>
                      <strong>Criado:</strong>{" "}
                      {formatDate(form.createdAt) || "Não disponível"}
                    </p>
                    <div>
                      <button
                        title="Abrir"
                        // onClick={() => handleViewReport(form)}
                      >
                        <FaRegEye />
                      </button>
                      <button
                        title="Deletar"
                        onClick={() => handleDeleteForm(form.id)}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                      <button
                        title="Criar"
                        onClick={() => handleCreateForm("Alugado")}
                      >
                        <LuClipboardPlus />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
