import { useState } from "react";
import InputField from "../../components/InputField";
import Label from "../../components/Label";
import "./Form.css";
import calculationsQuitado from "../../services/calculationsQuitado";
import MeuModal from "../../components/MeuModal";
import FormResultsQuitado from "../../components/FormResultsQuitado";

const FormQuitado = () => {
  const [formDataQuitado, setFormDataQuitado] = useState({
    lucroEsperado: "",
    ipva: "",
    licenciamento: "",
    seguro: "",
    manutencao: "",
    kilometragemMes: "",
    folgasMensal: "",
    horasTrabalhada: "",
    precoCombustivel: "",
    consumo: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculationsQuitadoResults, setCalculationsQuitadoResults] = useState({
    custoImpostosDia: 0,
    seguroDia: 0,
    manutencaoDia: 0,
    custoCombustivel: 0,
    custoCombustivelDia: 0,
    custoTotalDia: 0,
    custoTotal: 0,
    faturamentoTotal: 0,
    faturamentoDia: 0,
    faturamentoHora: 0,
    faturamentoKm: 0,
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "horasTrabalhada": // Validação apenas para Horas Trabalhadas
        if (!value) {
          error = "Este campo é obrigatório.";
        } else if (!/^\d+$/.test(value)) {
          error = "Insira um número inteiro válido.";
        } else if (parseInt(value) <= 0) {
          error = "O valor deve ser maior que 0.";
        } else if (parseInt(value) > 24) {
          error = "O valor não pode ser maior que 24.";
        }
        break;

      case "lucroEsperado":
      case "kilometragemMes":
      case "ipva":
      case "licenciamento":
      case "seguro":
      case "manutencao":
      case "folgasMensal":
      case "precoCombustivel":
      case "consumo":
        // Validações genéricas para outros campos numéricos
        if (!value) {
          error = "Este campo é obrigatório.";
        } else if (!/^\d*\.?\d+$/.test(value)) {
          error = "Insira um valor numérico válido.";
        } else if (parseFloat(value) <= 0) {
          error = "O valor deve ser maior que zero.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Função para atualizar o estado conforme os inputs mudam
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataQuitado((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Valida o campo e atualiza os erros
    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultsQuitado = {
      custoImpostosDia: calculationsQuitado.custoImpostosDia(formDataQuitado),
      seguroDia: calculationsQuitado.seguroDia(formDataQuitado),
      manutencaoDia: calculationsQuitado.manutencaoDia(formDataQuitado),
      custoCombustivel: calculationsQuitado.custoCombustivel(formDataQuitado),
      custoCombustivelDia:
        calculationsQuitado.custoCombustivelDia(formDataQuitado),
      custoTotalDia: calculationsQuitado.custoTotalDia(formDataQuitado),
      custoTotal: calculationsQuitado.custoTotal(formDataQuitado),
      faturamentoTotal: calculationsQuitado.faturamentoTotal(formDataQuitado),
      faturamentoDia: calculationsQuitado.faturamentoDia(formDataQuitado),
      faturamentoHora: calculationsQuitado.faturamentoHora(formDataQuitado),
      faturamentoKm: calculationsQuitado.faturamentoKm(formDataQuitado),
    };

    setCalculationsQuitadoResults(resultsQuitado);
    setIsModalOpen(true);

    console.log(calculationsQuitadoResults);
  };

  return (
    <div className="container">
      <h1>Calculadora de Custos (Uber):</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Label title={"Lucro Esperado (Mês):"} className="label" />
        <InputField
          type="text"
          name={"lucroEsperado"}
          placeholder={"Ex: 5000"}
          value={formDataQuitado.lucroEsperado || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.lucroEsperado && (
          <span style={{ color: "red" }}>{formErrors.lucroEsperado}</span>
        )}
        <Label title={"IPVA:"} className="label" />
        <InputField
          type="text"
          name={"ipva"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.ipva || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.ipva && (
          <span style={{ color: "red" }}>{formErrors.ipva}</span>
        )}
        <Label title={"Taxa Licenciamento:"} className="label" />
        <InputField
          type="text"
          name={"licenciamento"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.licenciamento || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.licenciamento && (
          <span style={{ color: "red" }}>{formErrors.licenciamento}</span>
        )}
        <Label title={"Seguro do Veículo:"} className="label" />
        <InputField
          type="text"
          name={"seguro"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.seguro || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.seguro && (
          <span style={{ color: "red" }}>{formErrors.seguro}</span>
        )}
        <Label
          title={"Manutenção preventiva e reparos (Mês):"}
          className="label"
        />
        <InputField
          type="text"
          name={"manutencao"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.manutencao || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.manutencao && (
          <span style={{ color: "red" }}>{formErrors.manutencao}</span>
        )}
        <Label title={"Estimativa de Km rodades (Mês):"} className="label" />
        <InputField
          type="text"
          name={"kilometragemMes"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.kilometragemMes || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.kilometragemMes && (
          <span style={{ color: "red" }}>{formErrors.kilometragemMes}</span>
        )}
        <Label title={"Folgas (Mês):"} className="label" />
        <InputField
          type="text"
          name={"folgasMensal"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.folgasMensal || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.folgasMensal && (
          <span style={{ color: "red" }}>{formErrors.folgasMensal}</span>
        )}
        <Label title={"Horas trabalhadas (Dia):"} className="label" />
        <InputField
          type="text"
          name={"horasTrabalhada"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.horasTrabalhada || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.horasTrabalhada && (
          <span style={{ color: "red" }}>{formErrors.horasTrabalhada}</span>
        )}
        <Label title={"Preço do Combustível:"} className="label" />
        <InputField
          type="text"
          name={"precoCombustivel"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.precoCombustivel || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.precoCombustivel && (
          <span style={{ color: "red" }}>{formErrors.precoCombustivel}</span>
        )}
        <Label title={"Consumo Médio do Veículo:"} className="label" />
        <InputField
          type="text"
          name={"consumo"}
          placeholder={"Ex: 1200"}
          value={formDataQuitado.consumo || ""}
          onChange={handleInputChange}
          className="input"
          required
        />
        {formErrors.consumo && (
          <span style={{ color: "red" }}>{formErrors.consumo}</span>
        )}
        <button>Calcular</button>
      </form>

      {/* Modal */}

      <MeuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormResultsQuitado
          resultsQuitado={calculationsQuitadoResults}
          formDataQuitado={formDataQuitado}
          onClose={() => setIsModalOpen(false)}
        />
      </MeuModal>
    </div>
  );
};

export default FormQuitado;
