import calculationsFinanciado from "../services/calculationsFinanciado";
import style from "./FormFinanciado.module.css";
import { useState } from "react";
import MeuModal from "./MeuModal";
import FormResultsFinanciado from "./FormResultsFinanciado";

const FormFinanciado = () => {
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
    };

    setCalculationsFinanciadoResults(resultsFinanciado);
    setIsModalOpen(true);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit}>
        <label>
          Lucro Esperado (Mês): <br />
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
          />
        </label>
        {formErrors.seguro && (
          <span style={{ color: "red" }}>{formErrors.seguro}</span>
        )}
        <label>
          Manutenção preventiva e reparos(Mês): <br />
          <input
            type="text"
            name="manutencao"
            placeholder="Ex: 750"
            value={formDataFinanciado.manutencao || ""}
            onChange={handleInputChange}
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
          Folgas (Mês): <br />
          <input
            type="text"
            name="folgasMensal"
            placeholder="Ex: 2"
            value={formDataFinanciado.folgasMensal || ""}
            onChange={handleInputChange}
            required
          />
        </label>
        {formErrors.folgasMensal && (
          <span style={{ color: "red" }}>{formErrors.folgasMensal}</span>
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

export default FormFinanciado;
