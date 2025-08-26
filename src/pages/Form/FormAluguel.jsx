/* eslint-disable react/prop-types */
import "./Form.css";
import InputField from "../../components/InputField";

const FormAluguel = ({ formData, setFormData, formErrors, setFormErrors }) => {
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
      case "diasTrabalhadosSem":
        if (parseInt(value) > 7) {
          error = "O valor não pode ser maior que 7.";
        }
        break;
    }
    return error;
  };

  const handleChange = (e) => {
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
      {" "}
      <h1>Alugado</h1>
      <form className="form">
        <label>
          Lucro Esperado: <br />
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
          Valor Franquia (Semana): <br />
          <InputField
            type="text"
            name={"valorFranquiaSem"}
            placeholder={"Ex: 750"}
            value={formData.valorFranquiaSem || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.valorFranquiaSem && (
            <span className="error-message">{formErrors.valorFranquiaSem}</span>
          )}
        </label>

        <label>
          Quilometragem (Semana): <br />
          <InputField
            type="text"
            name={"kilometragemSem"}
            placeholder={"Ex: 1250"}
            value={formData.kilometragemSem || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.kilometragemSem && (
            <span className="error-message">{formErrors.kilometragemSem}</span>
          )}
        </label>

        <label>
          Dias trabalhado (Semana): <br />
          <InputField
            type="text"
            name={"diasTrabalhadosSem"}
            placeholder={"Ex: 7"}
            value={formData.diasTrabalhadosSem || ""}
            onChange={handleChange}
            className="input"
            required
          />
          {formErrors.diasTrabalhadosSem && (
            <span className="error-message">
              {formErrors.diasTrabalhadosSem}
            </span>
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

export default FormAluguel;
