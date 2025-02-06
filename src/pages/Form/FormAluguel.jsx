import "./Form.css";
import { useState } from "react";
import calculations from "../../services/calculations";
import InputField from "../../components/InputField";
import MeuModal from "../../components/MeuModal";
import FormResults from "../../components/FormResults";

const FormAluguel = () => {
  const [formData, setFormData] = useState({
    lucroEsperado: "",
    valorFranquiaSem: "",
    kilometragemSem: "",
    diasTrabalhado: "",
    horasTrabalhada: "",
    precoCombustivel: "",
    consumo: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculationResults, setCalculationResults] = useState({
    custoAluguelDia: 0,
    custoAluguelMensal: 0,
    custoCombustivelSem: 0,
    consumoDiario: 0,
    faturamentoTotal: 0,
    faturamentoDiario: 0,
    faturamentoHora: 0,
    faturamentoKm: 0,
    custoDiario: 0,
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
      case "valorFranquiaSem":
      case "kilometragemSem":
      case "diasTrabalhado":
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
    setFormData((prevData) => ({
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

    const results = {
      custoAluguelDia: calculations.custoAluguelDia(formData),
      custoAluguelMensal: calculations.custoAluguelMensal(formData),
      custoCombustivelSem: calculations.custoCombustivelSem(formData),
      consumoDiario: calculations.consumoDiario(formData),
      faturamentoTotal: calculations.faturamentoTotal(formData),
      faturamentoDiario: calculations.faturamentoDiario(formData),
      faturamentoHora: calculations.faturamentoHora(formData),
      faturamentoKm: calculations.faturamentoKm(formData),
      custoDiario: calculations.custoDiario(formData),
    };

    setCalculationResults(results);
    setIsModalOpen(true);
  };
  return (
    <div className="container">
      {" "}
      <h1>Calculadora de Custos (Aluguel):</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Lucro Esperado (Mês): <br />
          <InputField
            type="text"
            name={"lucroEsperado"}
            placeholder={"Ex: 5000"}
            value={formData.lucroEsperado}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.lucroEsperado && (
          <span style={{ color: "red" }}>{formErrors.lucroEsperado}</span>
        )}
        <label>
          Valor Franquia (Semanal): <br />
          <InputField
            type="text"
            name={"valorFranquiaSem"}
            placeholder={"Ex: 750"}
            value={formData.valorFranquiaSem || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.valorFranquiaSem && (
          <span style={{ color: "red" }}>{formErrors.valorFranquiaSem}</span>
        )}
        <label>
          Quilometragem (Semanal): <br />
          <InputField
            type="text"
            name={"kilometragemSem"}
            placeholder={"Ex: 1250"}
            value={formData.kilometragemSem || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.kilometragemSem && (
          <span style={{ color: "red" }}>{formErrors.kilometragemSem}</span>
        )}
        <label>
          Dias trabalhado (Semana): <br />
          <InputField
            type="text"
            name={"diasTrabalhado"}
            placeholder={"Ex: 7"}
            value={formData.diasTrabalhado || ""}
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        {formErrors.diasTrabalhado && (
          <span style={{ color: "red" }}>{formErrors.diasTrabalhado}</span>
        )}
        <label>
          Horas trabalhadas (Dia): <br />
          <InputField
            type="text"
            name={"horasTrabalhada"}
            placeholder={"Ex: 8"}
            value={formData.horasTrabalhada || ""}
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
            value={formData.precoCombustivel || ""}
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
            value={formData.consumo || ""}
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
        <FormResults
          results={calculationResults}
          formData={formData}
          onClose={() => setIsModalOpen(false)}
        />
      </MeuModal>
    </div>
  );
};

export default FormAluguel;
