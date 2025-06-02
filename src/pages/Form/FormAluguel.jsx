/* eslint-disable react/prop-types */
import "./Form.css";
import InputField from "../../components/InputField";

const FormAluguel = ({ formData, setFormData }) => {
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
            value={parseFloat(formData.lucroEsperado) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                lucroEsperado: parseFloat(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>

        <label>
          Valor Franquia (Semana): <br />
          <InputField
            type="text"
            name={"valorFranquiaSem"}
            placeholder={"Ex: 750"}
            value={parseFloat(formData.valorFranquiaSem) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                valorFranquiaSem: parseFloat(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>

        <label>
          Quilometragem (Semana): <br />
          <InputField
            type="text"
            name={"kilometragemSem"}
            placeholder={"Ex: 1250"}
            value={parseFloat(formData.kilometragemSem) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                kilometragemSem: parseFloat(e.target.value),
              })
            }
            className="input"
            required
          />
        </label>

        <label>
          Dias trabalhado (Semana): <br />
          <InputField
            type="text"
            name={"diasTrabalhado"}
            placeholder={"Ex: 7"}
            value={Number(formData.diasTrabalhadosSem) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                diasTrabalhadosSem: Number(e.target.value),
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
            value={parseFloat(formData.precoCombustivel) || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                precoCombustivel: parseFloat(e.target.value),
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
            value={parseFloat(formData.consumo) || ""}
            onChange={(e) =>
              setFormData({ ...formData, consumo: parseFloat(e.target.value) })
            }
            className="input"
            required
          />
        </label>
      </form>
    </div>
  );
};

export default FormAluguel;
