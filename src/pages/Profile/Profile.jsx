// React
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Styles
import "./Profile.css";

// Icons
import {
  BsClipboard2Data,
  BsClipboard2Plus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";

import { profile } from "../../slices/userSlice";

// Slices - Alugado
import {
  getAllFormsAlugado,
  deleteFormAlugado,
  resetMessage,
  updateFormAlugado,
  createFormAlugado,
} from "../../slices/formAlugadoSlice";

import {
  createReportAlugado,
  getReportAlugado,
  deleteReportAlugado,
} from "../../slices/reportAlugadoSlice";

// Slices - Financiado
import {
  getAllFormsFinanciado,
  deleteFormFinanciado,
  resetMessageFinanciado,
  updateFormFinanciado,
  createFormFinanciado,
} from "../../slices/formFinanciadoSlice";

import {
  createReportFinanciado,
  getReportFinanciado,
  deleteReportFinanciado,
} from "../../slices/reportFinanciadoSlice";

// Slices - Quitado
import {
  getAllFormsQuitado,
  deleteFormQuitado,
  resetMessageQuitado,
  updateFormQuitado,
  createFormQuitado,
} from "../../slices/formQuitadoSlice";

import {
  createReportQuitado,
  getReportQuitado,
  deleteReportQuitado,
} from "../../slices/reportQuitadoSlice";

// Components
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import MeuModal from "../../components/MeuModal";

import { format, parseISO } from "date-fns";

import FormAluguel from "../Form/FormAluguel";
import FormFinanciamento from "../Form/FormFinanciamento";
import FormQuitado from "../Form/FormQuitado";

import ReportAlugado from "../../components/ReportAlugado";
import ReportFinanciado from "../../components/ReportFinanciado";
import ReportQuitado from "../../components/ReportQuitado";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados para Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formToEdit, setFormToEdit] = useState(null);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});
  const [reportId, setReportId] = useState(null);
  const [reportType, setReportType] = useState("");
  const [typeToRender, setTypeToRender] = useState("");

  // Forms - Alugado
  const {
    forms: alugadoForms,
    loading: alugadoLoading,
    error: alugadoError,
    success: alugadosuccess,
  } = useSelector((state) => state.formAlugado);

  // Encontre o formData específico que corresponde ao reportId selecionado
  const formDataAlugado = alugadoForms.find((form) => form.id === reportId);

  // Report - Alugado
  const { loading: alugadoReportLoading, error: alugadoReportError } =
    useSelector((state) => state.reportAlugado);

  const reportAlugado = useSelector((state) =>
    reportId ? state.reportAlugado.reports[reportId] : null
  );

  // Forms - Financiado
  const {
    forms: financiadoForms,
    loading: financiadoLoading,
    error: financiadoError,
    success: financiadoSuccess,
  } = useSelector((state) => state.formFinanciado);

  const formDataFinanciado = financiadoForms.find(
    (form) => form.id === reportId
  );

  // Report - Financiado
  const { loading: financiadoReportLoading, error: financiadoReportError } =
    useSelector((state) => state.reportFinanciado);

  const reportFinanciado = useSelector((state) =>
    reportId ? state.reportFinanciado.reports[reportId] : null
  );

  // Forms - Quitado
  const {
    forms: quitadoForms,
    loading: quitadoLoading,
    error: quitadoError,
    success: quitadoSuccess,
  } = useSelector((state) => state.formQuitado);

  const formDataQuitado = quitadoForms.find((form) => form.id === reportId);

  // Report - Financiado
  const { loading: quitadoReportLoading, error: quitadoReportError } =
    useSelector((state) => state.reportFinanciado);

  const reportQuitado = useSelector((state) =>
    reportId ? state.reportQuitado.reports[reportId] : null
  );

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
    setTypeToRender("form");
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
    setTypeToRender("form");
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
    setTypeToRender(null);
    setFormData({});
    setReportId(null);
    setReportType("");
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

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    if (!formToEdit || !formType) return;

    const updatedForm = {
      id: formToEdit.id,
      ...formData,
    };

    try {
      if (formType === "Alugado") {
        await dispatch(deleteReportAlugado(updatedForm.id)).unwrap();
        console.log(
          `Relatório antigo para o formulário ${updatedForm.id} invalidado.`
        );
      }
      if (formType === "Financiado") {
        await dispatch(deleteReportFinanciado(updatedForm.id)).unwrap();
        console.log(
          `Relatório antigo para o formulário ${updatedForm.id} invalidado.`
        );
      }
      if (formType === "Quitado") {
        await dispatch(deleteReportQuitado(updatedForm.id)).unwrap();
        console.log(
          `Relatório antigo para o formulário ${updatedForm.id} invalidado.`
        );
      }

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
          });
      }
    } catch (error) {
      console.error(`Erro no processo de atualização de ${formType}: `, error);
    }
  };

  const handleViewReport = async (form, type) => {
    setReportType(type);
    setReportId(Number(form.id));
    setFormData(form);
    setTypeToRender("report");
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && reportId && !reportAlugado && reportType === "Alugado") {
      const fetchOrCreateReport = async () => {
        try {
          const fetchedReport = await dispatch(
            getReportAlugado(reportId)
          ).unwrap();
          console.log("Relatório buscado com sucesso!", fetchedReport);
        } catch (error) {
          console.warn("Busca falhou, tentando criar o relatório...", error);
          try {
            const newReport = await dispatch(
              createReportAlugado(reportId)
            ).unwrap();
            console.log("Relatório criado com sucesso!", newReport);
          } catch (alugadoReportError) {
            console.error(
              "Erro ao tentar criar o relatório:",
              alugadoReportError
            );
          }
        }
      };
      fetchOrCreateReport();
    }
    if (
      isModalOpen &&
      reportId &&
      !reportFinanciado &&
      reportType === "Financiado"
    ) {
      const fetchOrCreateReport = async () => {
        try {
          const fetchedReport = await dispatch(
            getReportFinanciado(reportId)
          ).unwrap();
          console.log("Relatório buscado com sucesso!", fetchedReport);
        } catch (error) {
          console.warn("Busca falhou, tentando criar o relatório...", error);
          try {
            const newReport = await dispatch(
              createReportFinanciado(reportId)
            ).unwrap();
            console.log("Relatório criado com sucesso!", newReport);
          } catch (financiadoReportError) {
            console.error(
              "Erro ao tentar criar o relatório:",
              financiadoReportError
            );
          }
        }
      };
      fetchOrCreateReport();
    }
    if (isModalOpen && reportId && !reportQuitado && reportType === "Quitado") {
      const fetchOrCreateReport = async () => {
        try {
          const fetchedReport = await dispatch(
            getReportQuitado(reportId)
          ).unwrap();
          console.log("Relatório buscado com sucesso!", fetchedReport);
        } catch (error) {
          console.warn("Busca falhou, tentando criar o relatório...", error);
          try {
            const newReport = await dispatch(
              createReportQuitado(reportId)
            ).unwrap();
            console.log("Relatório criado com sucesso!", newReport);
          } catch (quitadoReportError) {
            console.error(
              "Erro ao tentar criar o relatório:",
              quitadoReportError
            );
          }
        }
      };
      fetchOrCreateReport();
    }
  }, [
    isModalOpen,
    reportId,
    reportAlugado,
    reportFinanciado,
    reportQuitado,
    reportType,
    dispatch,
  ]);

  const renderFormFields = () => {
    if (typeToRender === "form") {
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
              <FormFinanciamento
                formData={formData}
                setFormData={setFormData}
              />
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
    } else {
      switch (reportType) {
        case "Alugado":
          return (
            <>
              <ReportAlugado
                reportData={reportAlugado}
                loading={alugadoReportLoading}
                error={alugadoReportError}
                formData={formDataAlugado}
                loadingForm={alugadoLoading}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          );
        case "Financiado":
          return (
            <>
              <ReportFinanciado
                reportData={reportFinanciado}
                loading={financiadoReportLoading}
                error={financiadoReportError}
                formData={formDataFinanciado}
                loadingForm={financiadoLoading}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          );
        case "Quitado":
          return (
            <>
              <ReportQuitado
                reportData={reportQuitado}
                loading={quitadoReportLoading}
                error={quitadoReportError}
                formData={formDataQuitado}
                loadingForm={quitadoLoading}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          );
      }
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
  const formsDataAlugado = alugadoForms;
  const formsDataFinanciado = financiadoForms;
  const formsDataQuitado = quitadoForms;

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
              <h3>
                Alugado{" "}
                <button title="Criar" onClick={() => handleNewForm("Alugado")}>
                  <BsClipboard2Plus />
                </button>
              </h3>
              {formsDataAlugado.map((form) => (
                <>
                  <div className="form_list">
                    <div key={form.id}>
                      <strong>Criado:</strong>{" "}
                      {formatDate(form.createdAt) || "Não disponível"}
                    </div>
                    <div>
                      <button
                        title="Editar"
                        onClick={() => handleEditForm(form, "Alugado")}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        title="Ver relatório"
                        onClick={() => handleViewReport(form, "Alugado")}
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
              <h3>
                Financiado
                <button
                  title="Criar"
                  onClick={() => handleNewForm("Financiado")}
                >
                  <BsClipboard2Plus />
                </button>
              </h3>
              {formsDataFinanciado.map((form) => (
                <>
                  <div className="form_list">
                    <div key={form.id}>
                      <strong>Criado:</strong>{" "}
                      {formatDate(form.createdAt) || "Não disponível"}
                    </div>
                    <div>
                      <button
                        title="Editar"
                        onClick={() => handleEditForm(form, "Financiado")}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        title="Ver relatório"
                        onClick={() => handleViewReport(form, "Financiado")}
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
              <h3>
                Quitado
                <button title="Criar" onClick={() => handleNewForm("Quitado")}>
                  <BsClipboard2Plus />
                </button>
              </h3>
              {formsDataQuitado.map((form) => (
                <>
                  <div className="form_list">
                    <div key={form.id}>
                      <strong>Criado:</strong>{" "}
                      {formatDate(form.createdAt) || "Não disponível"}
                    </div>
                    <div>
                      <button
                        title="Editar"
                        onClick={() => handleEditForm(form, "Quitado")}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        title="Ver relatório"
                        onClick={() => handleViewReport(form, "Quitado")}
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
          {renderFormFields(typeToRender)}
          <div className="modal-actions">
            {typeToRender === "form" && (
              <>
                <button
                  type="button"
                  style={{ backgroundColor: "#FF6200", color: "#FFFFFF" }}
                  onClick={formToEdit ? handleUpdateForm : handleCreateForm}
                >
                  {formToEdit ? "Salvar" : "Criar Novo"}
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
              </>
            )}
          </div>
        </MeuModal>
      )}
    </div>
  );
};

export default Profile;
