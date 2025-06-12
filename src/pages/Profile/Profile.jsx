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
  createFormAlugado,
} from "../../slices/formAlugadoSlice";
import { profile } from "../../slices/userSlice";

// Slices - Financiado
import {
  getAllFormsFinanciado,
  deleteFormFinanciado,
  resetMessageFinanciado,
  updateFormFinanciado,
  createFormFinanciado,
} from "../../slices/formFinanciadoSlice";

// Slices - Quitado
import {
  getAllFormsQuitado,
  deleteFormQuitado,
  resetMessageQuitado,
  updateFormQuitado,
  createFormQuitado,
} from "../../slices/formQuitadoSlice";

//Styles
import "./Profile.css";

// Components
import Loading from "../../components/Loading";
import Message from "../../components/Message";

import { format, parseISO } from "date-fns";

import FormAluguel from "../Form/FormAluguel";
import FormFinanciamento from "../Form/FormFinanciamento";
import FormQuitado from "../Form/FormQuitado";
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

  // Forms - Quitado
  const {
    forms: quitadoForms,
    loading: quitadoLoading,
    error: quitadoError,
    success: quitadoSuccess,
  } = useSelector((state) => state.formQuitado);

  // User and Auth
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userAuth.token) {
      navigate("/login");
    } else {
      dispatch(profile());
      dispatch(getAllFormsAlugado());
      dispatch(getAllFormsFinanciado());
      dispatch(getAllFormsQuitado());
    }
  }, [dispatch, userAuth.token, navigate]);

  useEffect(() => {
    if (alugadoError || alugadosuccess) {
      setTimeout(() => {
        dispatch(resetMessage());
      }, 5000);
    }

    if (financiadoError || financiadoSuccess) {
      setTimeout(() => {
        dispatch(resetMessageFinanciado());
      }, 5000);
    }

    if (quitadoError || quitadoSuccess) {
      setTimeout(() => {
        dispatch(resetMessageQuitado());
      }, 5000);
    }
  }, [
    alugadoError,
    alugadosuccess,
    financiadoError,
    financiadoSuccess,
    quitadoError,
    quitadoSuccess,
    dispatch,
  ]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleNewForm = (type) => {
    setFormType(type);
    setFormData({
      ...(type === "Alugado" && {
        lucroEsperado: "",
        valorFranquiaSem: "",
        precoCombustivel: "",
        consumo: "",
        diasTrabalhadosSem: "",
        horasTrabalhadas: "",
        kilometragemSem: "",
      }),
      ...(type === "Financiado" && {
        lucroEsperado: "",
        precoCombustivel: "",
        consumo: "",
        folgasMensal: "",
        horasTrabalhadas: "",
        ipva: "",
        licenciamento: "",
        seguro: "",
        manutencao: "",
        parcelaFinanciamento: "",
        kilometragemMes: "",
      }),
      ...(type === "Quitado" && {
        lucroEsperado: "",
        precoCombustivel: "",
        consumo: "",
        folgasMensal: "",
        horasTrabalhadas: "",
        ipva: "",
        licenciamento: "",
        seguro: "",
        manutencao: "",
        kilometragemMes: "",
      }),
    });
    setIsModalOpen(true);
  };

  const handleDeleteForm = (id, type) => {
    if (type === "Alugado") {
      dispatch(deleteFormAlugado(id));
    } else if (type === "Financiado") {
      dispatch(deleteFormFinanciado(id));
    } else if (type === "Quitado") {
      dispatch(deleteFormQuitado(id));
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
        lucroEsperado: Number(form.lucroEsperado) || "",
        precoCombustivel: Number(form.precoCombustivel) || "",
        consumo: Number(form.consumo) || "",
        folgasMensal: Number(form.folgasMensal) || "",
        horasTrabalhadas: Number(form.horasTrabalhadas) || "",
        ipva: Number(form.ipva) || "",
        licenciamento: Number(form.licenciamento) || "",
        seguro: Number(form.seguro) || "",
        manutencao: Number(form.manutencao) || "",
        parcelaFinanciamento: Number(form.parcelaFinanciamento) || "",
        kilometragemMes: Number(form.kilometragemMes) || "",
      }),
      ...(type === "Quitado" && {
        lucroEsperado: Number(form.lucroEsperado) || "",
        precoCombustivel: Number(form.precoCombustivel) || "",
        consumo: Number(form.consumo) || "",
        folgasMensal: Number(form.folgasMensal) || "",
        horasTrabalhadas: Number(form.horasTrabalhadas) || "",
        ipva: Number(form.ipva) || "",
        licenciamento: Number(form.licenciamento) || "",
        seguro: Number(form.seguro) || "",
        manutencao: Number(form.manutencao) || "",
        kilometragemMes: Number(form.kilometragemMes) || "",
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

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const newForm = {
      ...formData,
    };

    const actionMap = {
      Alugado: createFormAlugado,
      Financiado: createFormFinanciado,
      Quitado: createFormQuitado,
    };

    const action = actionMap[formType];

    try {
      if (action) {
        await dispatch(action(newForm))
          .unwrap()
          .then(() => {
            setIsModalOpen(false);
            setFormType("");
            setFormData({});
          });
      }
    } catch (rejectedValue) {
      setIsModalOpen(false);
      console.error("Falha ao criar formulário:", rejectedValue);
    }
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
      Quitado: updateFormQuitado,
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
            <FormFinanciamento formData={formData} setFormData={setFormData} />
          </>
        );
      case "Quitado":
        return (
          <>
            <FormQuitado formData={formData} setFormData={setFormData} />
          </>
        );
      default:
        return null;
    }
  };

  if (userLoading || alugadoLoading || financiadoLoading || quitadoLoading)
    return <Loading />;

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
  const userData = user.user || user;
  const formsDataAlugado = alugadoForms.forms || alugadoForms;
  const formsDataFinanciado = financiadoForms.forms || financiadoForms;
  const formsDataQuitado = quitadoForms.forms || quitadoForms;

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

      {/* Mensagens */}
      {alugadoError && <Message msg={`${alugadoError}`} type={"error"} />}
      {financiadoError && <Message msg={`${financiadoError}`} type={"error"} />}
      {quitadoError && <Message msg={`${quitadoError}`} type={"error"} />}

      <section className="forms_section">
        {formsDataAlugado.length === 0 ? (
          <div className="form_card">
            <h3>Alugado</h3>
            <p>Nenhum formulário preenchido ainda.</p>
            <button title="Criar" onClick={() => handleNewForm("Alugado")}>
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
                        onClick={() => handleDeleteForm(form.id, "Alugado")}
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
            <button title="Criar" onClick={() => handleNewForm("Financiado")}>
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
        {formsDataQuitado.length === 0 ? (
          <div className="form_card">
            <h3>Quitado</h3>
            <p>Nenhum formulário preenchido ainda.</p>
            <button title="Criar" onClick={() => handleNewForm("Quitado")}>
              <BsClipboard2Plus />
            </button>
          </div>
        ) : (
          <div className="forms">
            <div className="form_card">
              <h3>Quitado</h3>
              {formsDataQuitado.map((form) => (
                <>
                  <div className="form_list">
                    <p key={form.id}>
                      <strong>Criado:</strong>{" "}
                      {formatDate(form.createdAt) || "Não disponível"}
                    </p>
                    <div>
                      <button
                        title="Editar"
                        onClick={() => handleEditForm(form, "Quitado")}
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
                        onClick={() => handleDeleteForm(form.id, "Quitado")}
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
          <form>
            {renderFormFields()}
            <div className="modal-actions">
              <button
                type="button"
                style={{ backgroundColor: "#FF6200", color: "#FFFFFF" }}
                onClick={handleUpdateForm}
              >
                Salvar
              </button>
              <button
                type="button"
                style={{ backgroundColor: "#FF6200", color: "#FFFFFF" }}
                onClick={handleCreateForm}
              >
                Novo
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
