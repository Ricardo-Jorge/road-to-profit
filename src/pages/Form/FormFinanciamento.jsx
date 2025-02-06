import "./Form.css";
import { useState } from "react";
import calculationsFinanciado from "../../services/calculationsFinanciado";
import InputField from "../../components/InputField";
import MeuModal from "../../components/MeuModal";
import FormResultsFinanciado from "../../components/FormResultsFinanciado";

const FormFinanciamento = () => {
  const [formDataFinanciado, setFormDataFinanciado] = useState({
    lucroEsperado: "",
    parcelaFinanciamento: "",
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
  const [calculationsFinanciadoResults, setCalculationsFinanciadoResults] =
    useState({
      custoFinanciamentoDia: 0,
      custoImpostosDia: 0,
      seguroDia: 0,
      manutencaoDia: 0,
      custoCombustivel: 0,
      custoCombustivelDia: 0,
      custoTotalDia: 0,
      custoTotal: 0,
      faturamentoTotal: 0,
      faturamentoDia: 0,
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
      case "parcelaFinanciamento":
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Atualiza o valor do campo
    setFormDataFinanciado((prevData) => ({
      ...prevData,
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

    const resultsFinanciado = {
      custoFinanciamentoDia:
        calculationsFinanciado.custoFinanciamentoDia(formDataFinanciado),
      custoImpostosDia:
        calculationsFinanciado.custoImpostosDia(formDataFinanciado),
      seguroDia: calculationsFinanciado.seguroDia(formDataFinanciado),
      manutencaoDia: calculationsFinanciado.manutencaoDia(formDataFinanciado),
      custoCombustivel:
        calculationsFinanciado.custoCombustivel(formDataFinanciado),
      custoCombustivelDia:
        calculationsFinanciado.custoCombustivelDia(formDataFinanciado),
      custoTotalDia: calculationsFinanciado.custoTotalDia(formDataFinanciado),
      custoTotal: calculationsFinanciado.custoTotal(formDataFinanciado),
      faturamentoTotal:
        calculationsFinanciado.faturamentoTotal(formDataFinanciado),
      faturamentoDia: calculationsFinanciado.faturamentoDia(formDataFinanciado),
      faturamentoKm: calculationsFinanciado.faturamentoKm(formDataFinanciado),
    };

    setCalculationsFinanciadoResults(resultsFinanciado);
    setIsModalOpen(true);
  };
  return (
    <div className="container">
      <h1>Calculadora de Custos (Financiamento):</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Lucro Esperado (Mês): <br />
          <InputField
            type="text"
            name={"lucroEsperado"}
            placeholder={"Ex: 5000"}
            value={formDataFinanciado.lucroEsperado || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.lucroEsperado && (
          <span style={{ color: "red" }}>{formErrors.lucroEsperado}</span>
        )}
        <label>
          Valor Parcela Financiamento: <br />
          <InputField
            type="text"
            name={"parcelaFinanciamento"}
            placeholder={"Ex: 1500"}
            value={formDataFinanciado.parcelaFinanciamento || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.parcelaFinanciamento && (
          <span style={{ color: "red" }}>
            {formErrors.parcelaFinanciamento}
          </span>
        )}
        <label>
          IPVA: <br />
          <InputField
            type="text"
            name={"ipva"}
            placeholder={"Ex: 2500"}
            value={formDataFinanciado.ipva || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.ipva && (
          <span style={{ color: "red" }}>{formErrors.ipva}</span>
        )}
        <label>
          Taxa de Licenciamento: <br />
          <InputField
            type="text"
            name={"licenciamento"}
            placeholder={"Ex: 230"}
            value={formDataFinanciado.licenciamento || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.licenciamento && (
          <span style={{ color: "red" }}>{formErrors.licenciamento}</span>
        )}
        <label>
          Seguro do Veículo: <br />
          <InputField
            type="text"
            name={"seguro"}
            placeholder={"Ex: 250"}
            value={formDataFinanciado.seguro || ""}
            onChange={handleInputChange}
            className="input"
          />
        </label>
        {formErrors.seguro && (
          <span style={{ color: "red" }}>{formErrors.seguro}</span>
        )}
        <label>
          Manutenção preventiva e reparos (Mês): <br />
          <InputField
            type="text"
            name={"manutencao"}
            placeholder={"Ex: 500"}
            value={formDataFinanciado.manutencao || ""}
            onChange={handleInputChange}
            className="input"
          />
        </label>
        {formErrors.manutencao && (
          <span style={{ color: "red" }}>{formErrors.manutencao}</span>
        )}
        <label>
          Estimativa de Km Rodados (Mês): <br />
          <InputField
            type="text"
            name={"kilometragemMes"}
            placeholder={"Ex: 1250"}
            value={formDataFinanciado.kilometragemMes || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.kilometragemMes && (
          <span style={{ color: "red" }}>{formErrors.kilometragemMes}</span>
        )}
        <label>
          Folgas (Mês): <br />
          <InputField
            type="text"
            name={"folgasMensal"}
            placeholder={"Ex: 4"}
            value={formDataFinanciado.folgasMensal || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.folgasMensal && (
          <span style={{ color: "red" }}>{formErrors.folgasMensal}</span>
        )}
        <label>
          Horas trabalhadas (Dia): <br />
          <InputField
            type="text"
            name={"horasTrabalhada"}
            placeholder={"Ex: 8"}
            value={formDataFinanciado.horasTrabalhada || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.horasTrabalhada && (
          <span style={{ color: "red" }}>{formErrors.horasTrabalhada}</span>
        )}
        <label>
          Preço do combustível: <br />
          <InputField
            type="text"
            name={"precoCombustivel"}
            placeholder={"Ex: 4.16"}
            value={formDataFinanciado.precoCombustivel || ""}
            onChange={handleInputChange}
            className="input"
          />
        </label>
        {formErrors.precoCombustivel && (
          <span style={{ color: "red" }}>{formErrors.precoCombustivel}</span>
        )}
        <label>
          Consumo Médio do Veiculo: <br />
          <InputField
            type="text"
            name={"consumo"}
            placeholder={"Ex: 10.9"}
            value={formDataFinanciado.consumo || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.consumo && (
          <span style={{ color: "red" }}>{formErrors.consumo}</span>
        )}
        <button>Calcular</button>
      </form>

      {/* Modal */}
      <MeuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormResultsFinanciado
          resultsFinanciado={calculationsFinanciadoResults}
          formDataFinanciado={formDataFinanciado}
          onClose={() => setIsModalOpen(false)}
        />
      </MeuModal>
    </div>
  );
};

export default FormFinanciamento;
