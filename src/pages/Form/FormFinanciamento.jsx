/* eslint-disable react/prop-types */
import "./Form.css";
import InputField from "../../components/InputField";

const FormFinanciamento = ({ formData, setFormData }) => {
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
            value={Number(formData.lucroEsperado) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                lucroEsperado: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          Valor Parcela Financiamento: <br />
          <InputField
            type="text"
            name={"parcelaFinanciamento"}
            placeholder={"Ex: 1500"}
            value={Number(formData.parcelaFinanciamento) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                parcelaFinanciamento: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          IPVA: <br />
          <InputField
            type="text"
            name={"ipva"}
            placeholder={"Ex: 2500"}
            value={Number(formData.ipva) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                ipva: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          Taxa de Licenciamento: <br />
          <InputField
            type="text"
            name={"licenciamento"}
            placeholder={"Ex: 230"}
            value={Number(formData.licenciamento) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                licenciamento: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          Seguro do Veículo: <br />
          <InputField
            type="text"
            name={"seguro"}
            placeholder={"Ex: 250"}
            value={Number(formData.seguro) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                seguro: Number(e.target.value),
              })
            }
            className="input"
          />
        </label>
        <label>
          Manutenção preventiva e reparos (Mês): <br />
          <InputField
            type="text"
            name={"manutencao"}
            placeholder={"Ex: 500"}
            value={Number(formData.manutencao) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                manutencao: Number(e.target.value),
              })
            }
            className="input"
          />
        </label>
        <label>
          Estimativa de Km Rodados (Mês): <br />
          <InputField
            type="text"
            name={"kilometragemMes"}
            placeholder={"Ex: 1250"}
            value={Number(formData.kilometragemMes) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                kilometragemMes: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          Folgas (Mês): <br />
          <InputField
            type="text"
            name={"folgasMensal"}
            placeholder={"Ex: 4"}
            value={Number(formData.folgasMensal) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                folgasMensal: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          Horas trabalhadas (Dia): <br />
          <InputField
            type="text"
            name={"horasTrabalhada"}
            placeholder={"Ex: 8"}
            value={Number(formData.horasTrabalhadas) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                horasTrabalhadas: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
        <label>
          Preço do combustível: <br />
          <InputField
            type="text"
            name={"precoCombustivel"}
            placeholder={"Ex: 4.16"}
            value={Number(formData.precoCombustivel) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                precoCombustivel: Number(e.target.value),
              })
            }
            className="input"
          />
        </label>
        <label>
          Consumo Médio do Veiculo: <br />
          <InputField
            type="text"
            name={"consumo"}
            placeholder={"Ex: 10.9"}
            value={Number(formData.consumo) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                consumo: Number(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>
      </form>
    </div>
  );
};

export default FormFinanciamento;
