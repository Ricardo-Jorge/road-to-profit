/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import style from "./MeuModal.module.css";

const MeuModal = ({ isOpen, onClose, results, formData }) => {
  return (
    <div>
      {" "}
      <Modal
        show={isOpen}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={style.modal}>
          <Modal.Title id="contained-modal-title-vcenter">
            Resultado do Calculo:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modal}>
          <Table hover variant="dark">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Valores</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Faturamento Total</td>
                <td>R$ {results.faturamentoTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Faturamento Diário</td>
                <td>R$ {results.faturamentoDiario.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Faturamento Hora</td>
                <td>R$ {results.faturamentoHora.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Faturamento por Km</td>
                <td>R$ {results.faturamentoKm.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Custo Aluguel (Mensal)</td>
                <td>R$ {results.custoAluguelMensal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Custo Combustível (Semanal)</td>
                <td>R$ {results.custoCombustivelSem.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Custo Aluguel (Diário)</td>
                <td>R$ {results.custoAluguelDia.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Custo Combustível (Diário)</td>
                <td>R$ {results.consumoDiario.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
          <p>
            Baseado nas informações fornecidas, para obter um lucro Líquido de
            <span className={style.profit}>
              {" "}
              R$ {formData.lucroEsperado}.00
            </span>
            , com a franquia disponível de{" "}
            <span className={style.values}>
              {formData.kilometragemSem * 4} quilômetros{" "}
            </span>
            no mês, será necessário aceitar viagens com trarifas de, no minimo,{" "}
            <span className={style.profit}>
              R$ {results.faturamentoKm.toFixed(2)}
            </span>
            . Seu custo diário será de{" "}
            <span className={style.cost}>
              R$ {results.custoDiario.toFixed(2)}
            </span>
            , com isso, será necessário alcançar um faturamento diário de{" "}
            <span className={style.profit}>
              R$ {results.faturamentoDiario.toFixed(2)}
            </span>
            .
          </p>
        </Modal.Body>
        <Modal.Footer className={style.modal}>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MeuModal;
