/* eslint-disable react/prop-types */
import "./Form.css";
import InputField from "../../components/InputField";

const FormQuitado = ({ formData, setFormData, formErrors, setFormErrors }) => {
  const validateField = (name, value) => {
    let error = "";
    // Validações genéricas para campos numéricos
    if (!value && value !== 0) {
      return "Este campo é obrigatório.";
    }

    if (/^\d+\.$/.test(value)) {
      return "";
    }

    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      error = "Insira um valor numérico válido.";
    } else if (numericValue <= 0) {
      error = "O valor deve ser maior que zero.";
    }

    // Validações específicas
    switch (name) {
      case "horasTrabalhadas":
        if (parseInt(value) > 24) {
          error = "O valor não pode ser maior que 24.";
        }
        break;
      case "folgasMensal":
        if (parseInt(value) > 20) {
          error = "O valor não pode ser maior que 20.";
        }
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Atualiza o estado do formulário
    setFormData({
      ...formData,
      [name]: value,
    });

    // Valida e atualiza o estado de erros
    const error = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  return (
    <div className="form_container">
      <h1>Financiado</h1>
      <form className="form">
        <label>
          Lucro Esperado (Mês): <br />
          <InputField
            type="text"
            name={"lucroEsperado"}
            placeholder={"Ex: 5000"}
            value={formData.lucroEsperado || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.lucroEsperado && (
            <span className="error-message">{formErrors.lucroEsperado}</span>
          )}
        </label>
        <label>
          IPVA: <br />
          <InputField
            type="text"
            name={"ipva"}
            placeholder={"Ex: 2500"}
            value={formData.ipva || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.ipva && (
            <span className="error-message">{formErrors.ipva}</span>
          )}
        </label>
        <label>
          Taxa de Licenciamento: <br />
          <InputField
            type="text"
            name={"licenciamento"}
            placeholder={"Ex: 230"}
            value={formData.licenciamento || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.licenciamento && (
            <span className="error-message">{formErrors.licenciamento}</span>
          )}
        </label>
        <label>
          Seguro do Veículo: <br />
          <InputField
            type="text"
            name={"seguro"}
            placeholder={"Ex: 250"}
            value={formData.seguro || ""}
            onChange={handleChange}
            className="input"
          />
          {formErrors.seguro && (
            <span className="error-message">{formErrors.seguro}</span>
          )}
        </label>
        <label>
          Manutenção preventiva e reparos (Mês): <br />
          <InputField
            type="text"
            name={"manutencao"}
            placeholder={"Ex: 500"}
            value={formData.manutencao || ""}
            onChange={handleChange}
            className="input"
          />
          {formErrors.manutencao && (
            <span className="error-message">{formErrors.manutencao}</span>
          )}
        </label>
        <label>
          Estimativa de Km Rodados (Mês): <br />
          <InputField
            type="text"
            name={"kilometragemMes"}
            placeholder={"Ex: 1250"}
            value={formData.kilometragemMes || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.kilometragemMes && (
            <span className="error-message">{formErrors.kilometragemMes}</span>
          )}
        </label>
        <label>
          Folgas (Mês): <br />
          <InputField
            type="text"
            name={"folgasMensal"}
            placeholder={"Ex: 4"}
            value={formData.folgasMensal || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.folgasMensal && (
            <span className="error-message">{formErrors.folgasMensal}</span>
          )}
        </label>
        <label>
          Horas trabalhadas (Dia): <br />
          <InputField
            type="text"
            name={"horasTrabalhadas"}
            placeholder={"Ex: 8"}
            value={formData.horasTrabalhadas || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.horasTrabalhadas && (
            <span className="error-message">{formErrors.horasTrabalhadas}</span>
          )}
        </label>
        <label>
          Preço do combustível: <br />
          <InputField
            type="text"
            name={"precoCombustivel"}
            placeholder={"Ex: 4.16"}
            value={formData.precoCombustivel || ""}
            onChange={handleChange}
            className="input"
          />
          {formErrors.precoCombustivel && (
            <span className="error-message">{formErrors.precoCombustivel}</span>
          )}
        </label>
        <label>
          Consumo Médio do Veiculo: <br />
          <InputField
            type="text"
            name={"consumo"}
            placeholder={"Ex: 10.9"}
            value={formData.consumo || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.consumo && (
            <span className="error-message">{formErrors.consumo}</span>
          )}
        </label>
      </form>
    </div>
  );
};

export default FormQuitado;
