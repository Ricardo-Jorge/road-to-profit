import style from "./FormFinanciado.module.css";
import { useState } from "react";

const FormFinanciado = () => {
  const [formDataFinanciado, setFormDataFinanciado] = useState({
    lucroEsperado: 0,
    parcelaFinanciamento: 0,
    ipva: 0,
    licenciamento: 0,
    seguro: 0,
    manutencao: 0,
    kilometragemMes: 0,
    diasTrabalhado: 0,
    horasTrabalhada: 0,
    precoCombustivel: 0,
    consumo: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  //   const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log(formDataFinanciado);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit}>
        <label>
          Lucro Esperado (Mensal): <br />
          <input
            type="text"
            name="lucroEsperado"
            placeholder="Ex: 5000"
            value={formDataFinanciado.lucroEsperado || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.lucroEsperado && (
          <span style={{ color: "red" }}>{formErrors.lucroEsperado}</span>
        )}
        <label>
          Valor Parcela Financiamento: <br />
          <input
            type="text"
            name="parcelaFinanciamento"
            placeholder="Ex: 750"
            value={formDataFinanciado.parcelaFinanciamento || ""}
            onChange={handleInputChange}
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
          <input
            type="text"
            name="ipva"
            placeholder="Ex: 750"
            value={formDataFinanciado.ipva || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.ipva && (
          <span style={{ color: "red" }}>{formErrors.ipva}</span>
        )}
        <label>
          Taxa de Licenciamento: <br />
          <input
            type="text"
            name="licenciamento"
            placeholder="Ex: 750"
            value={formDataFinanciado.licenciamento || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.licenciamento && (
          <span style={{ color: "red" }}>{formErrors.licenciamento}</span>
        )}
        <label>
          Seguro do Veículo: <br />
          <input
            type="text"
            name="seguro"
            placeholder="Ex: 750"
            value={formDataFinanciado.seguro || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.seguro && (
          <span style={{ color: "red" }}>{formErrors.seguro}</span>
        )}
        <label>
          Manutenção preventiva e reparos(Mensal): <br />
          <input
            type="text"
            name="manutencao"
            placeholder="Ex: 750"
            value={formDataFinanciado.manutencao || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.manutencao && (
          <span style={{ color: "red" }}>{formErrors.manutencao}</span>
        )}
        <label>
          Estimativa de Km Rodados(Mês): <br />
          <input
            type="text"
            name="kilometragemMes"
            placeholder="Ex: 1250"
            value={formDataFinanciado.kilometragemMes || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.kilometragemMes && (
          <span style={{ color: "red" }}>{formErrors.kilometragemMes}</span>
        )}
        <label>
          Dias trabalhado por semana: <br />
          <input
            type="text"
            name="diasTrabalhado"
            placeholder="Ex: 7"
            value={formDataFinanciado.diasTrabalhado || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.diasTrabalhado && (
          <span style={{ color: "red" }}>{formErrors.diasTrabalhado}</span>
        )}
        <label>
          Horas trabalhadas por dia: <br />
          <input
            type="text"
            name="horasTrabalhada"
            placeholder="Ex: 8"
            value={formDataFinanciado.horasTrabalhada || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.horasTrabalhada && (
          <span style={{ color: "red" }}>{formErrors.horasTrabalhada}</span>
        )}
        <label>
          Preço do combustível: <br />
          <input
            type="text"
            name="precoCombustivel"
            placeholder="Ex: 4.16"
            value={formDataFinanciado.precoCombustivel || ""}
            onChange={handleInputChange}
          />
        </label>
        {formErrors.precoCombustivel && (
          <span style={{ color: "red" }}>{formErrors.precoCombustivel}</span>
        )}
        <label>
          Consumo Médio do Veiculo: <br />
          <input
            type="text"
            name="consumo"
            placeholder="Ex: 10.9"
            value={formDataFinanciado.consumo || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.consumo && (
          <span style={{ color: "red" }}>{formErrors.consumo}</span>
        )}
        <button>Calcular</button>
      </form>
    </div>
  );
};

export default FormFinanciado;
