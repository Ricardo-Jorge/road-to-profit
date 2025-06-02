// React
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Icons
import {
  BsClipboard2Data,
  BsClipboard2Plus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";

// Slices - Alugado
import {
  getAllFormsAlugado,
  deleteFormAlugado,
  resetMessage,
  updateFormAlugado,
} from "../../slices/formAlugadoSlice";
import { profile } from "../../slices/userSlice";

// Slices - Financiado
import {
  getAllFormsFinanciado,
  deleteFormFinanciado,
  resetMessageFinanciado,
  updateFormFinanciado,
} from "../../slices/formFinanciadoSlice";

//Styles
import "./Profile.css";

// Components
import Loading from "../../components/Loading";
import Message from "../../components/Message";

import { format, parseISO } from "date-fns";

import FormAluguel from "../Form/FormAluguel";
import FormFinanciamento from "../Form/FormFinanciamento";
import MeuModal from "../../components/MeuModal";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados para Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formToEdit, setFormToEdit] = useState(null);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});

  // Forms - Alugado
  const {
    forms: alugadoForms,
    loading: alugadoLoading,
    error: alugadoError,
    success: alugadosuccess,
  } = useSelector((state) => state.formAlugado);
  // Forms - Financiado
  const {
    forms: financiadoForms,
    loading: financiadoLoading,
    error: financiadoError,
    success: financiadoSuccess,
  } = useSelector((state) => state.formFinanciado);

  // User and Auth
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
      dispatch(getAllFormsFinanciado());
    }
  }, [dispatch, userAuth.token, navigate]);

  useEffect(() => {
    if (alugadoError || alugadosuccess) {
      setTimeout(() => {
        dispatch(resetMessage());
      }, 3000);

      if (financiadoError || financiadoSuccess) {
        setTimeout(() => {
          dispatch(resetMessageFinanciado());
        }, 3000);
      }
    }
  }, [
    alugadoError,
    alugadosuccess,
    financiadoError,
    financiadoSuccess,
    dispatch,
  ]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleCreateForm = (type) => {
    navigate(`/${type.toLowerCase()}`);
  };

  const handleDeleteForm = (id, type) => {
    if (type === "Alugado") {
      dispatch(deleteFormAlugado(id));
    } else if (type === "Financiado") {
      dispatch(deleteFormFinanciado(id));
    }
  };

  const handleEditForm = (form, type) => {
    setFormToEdit(form);
    setFormType(type);
    setFormData({
      ...(type === "Alugado" && {
        lucroEsperado: Number(form.lucroEsperado) || "",
        valorFranquiaSem: Number(form.valorFranquiaSem) || "",
        precoCombustivel: Number(form.precoCombustivel) || "",
        consumo: Number(form.consumo) || "",
        diasTrabalhadosSem: Number(form.diasTrabalhadosSem) || "",
        horasTrabalhadas: Number(form.horasTrabalhadas) || "",
        kilometragemSem: Number(form.kilometragemSem) || "",
      }),
      ...(type === "Financiado" && {
        lucroEsperado: form.lucroEsperado || "",
        precoCombustivel: form.precoCombustivel || "",
        consumo: form.consumo || "",
        folgasMensal: form.folgasMensal || "",
        horasTrabalhadas: form.horasTrabalhadas || "",
        ipva: form.ipva || "",
        licenciamento: form.licenciamento || "",
        seguro: form.seguro || "",
        manutencao: form.manutencao || "",
        parcelaFinanciamento: form.parcelaFinanciamento || "",
        kilometragemMes: form.kilometragemMes || "",
      }),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormToEdit(null);
    setFormType("");
    setFormData({});
  };

  const handleUpdateForm = (e) => {
    e.preventDefault();
    if (!formToEdit || !formType) return;

    const updatedForm = {
      id: formToEdit.id,
      ...formData,
    };

    const actionMap = {
      Alugado: updateFormAlugado,
      Financiado: updateFormFinanciado,
    };

    const action = actionMap[formType];

    if (action) {
      dispatch(action(updatedForm))
        .unwrap()
        .then(() => {
          setIsModalOpen(false);
          setFormToEdit(null);
          setFormType("");
          setFormData({});
        })
        .catch((err) => {
          console.error(`Erro ao atualizar formulário ${formType}: `, err);
        });
    }
  };

  const renderFormFields = () => {
    switch (formType) {
      case "Alugado":
        return (
          <>
            <FormAluguel formData={formData} setFormData={setFormData} />
          </>
        );
      case "Financiado":
        return (
          <>
            <FormFinanciamento />
          </>
        );
      default:
        return null;
    }
  };

  if (userLoading || alugadoLoading || financiadoLoading) return <Loading />;
  if (userError) return <Message msg={`${userError}`} type={"error"} />;
  if (alugadoError) return <Message msg={`${alugadoError}`} type={"error"} />;
  if (financiadoError)
    return <Message msg={`${financiadoError}`} type={"error"} />;

  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";

    try {
      const date = parseISO(dateString); // Converte a string ISO para um objeto Date
      return format(date, "dd/MM/yyyy HH:mm"); // Formata no formato desejado
    } catch (error) {
      return console.error("Data inválida", error);
    }
  };

  // Ajuste para lidar com a estrutura aninhada, se necessário
  const userData = user.user || user; // Desaninha se necessário
  const formsDataAlugado = alugadoForms.forms || alugadoForms; // Desaninha se necessário
  const formsDataFinanciado = financiadoForms.forms || financiadoForms; // Desaninha se necessário

  return (
    <div className="profile_container">
      <section className="user_info">
        <h1>Bem vindo, {userData.name || "Usuário"}</h1>
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

      <h2 className="forms_header">Seus Formularios</h2>
      {alugadoError && <Message msg={`${alugadoError}`} type={"error"} />}
      {alugadosuccess && (
        <Message msg={"Ação realizada com sucesso!"} type={"success"} />
      )}
      <section className="forms_section">
        {formsDataAlugado.length === 0 ? (
          <div className="form_card">
            <h3>Alugado</h3>
            <p>Nenhum formulário preenchido ainda.</p>
            <button title="Criar" onClick={() => handleCreateForm("Alugado")}>
              <BsClipboard2Plus />
            </button>
          </div>
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
                        title="Editar"
                        onClick={() => handleEditForm(form, "Alugado")}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        title="Ver relatório"
                        // onClick={() => handleViewReport(form)}
                      >
                        <BsClipboard2Data />
                      </button>
                      <button
                        title="Deletar"
                        onClick={() => handleDeleteForm(form.id, "alugado")}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
        {formsDataFinanciado.length === 0 ? (
          <div className="form_card">
            <h3>Financiado</h3>
            <p>Nenhum formulário preenchido ainda.</p>
            <button
              title="Criar"
              onClick={() => handleCreateForm("Financiado")}
            >
              <BsClipboard2Plus />
            </button>
          </div>
        ) : (
          <div className="forms">
            <div className="form_card">
              <h3>Financiado</h3>
              {formsDataFinanciado.map((form) => (
                <>
                  <div className="form_list">
                    <p key={form.id}>
                      <strong>Criado:</strong>{" "}
                      {formatDate(form.createdAt) || "Não disponível"}
                    </p>
                    <div>
                      <button
                        title="Editar"
                        onClick={() => handleEditForm(form, "Financiado")}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        title="Ver relatório"
                        // onClick={() => handleViewReport(form)}
                      >
                        <BsClipboard2Data />
                      </button>
                      <button
                        title="Deletar"
                        onClick={() => handleDeleteForm(form.id, "Financiado")}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </section>
      {/* Modal de Edição */}
      {isModalOpen && (
        <MeuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleUpdateForm}>
            {renderFormFields()}
            <div className="modal-actions">
              <button
                type="submit"
                style={{ backgroundColor: "#FF6200", color: "#FFFFFF" }}
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "#444",
                  color: "#FFFFFF",
                  marginLeft: "10px",
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </MeuModal>
      )}
    </div>
  );
};

export default Profile;
