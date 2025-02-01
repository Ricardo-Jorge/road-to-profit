/* eslint-disable react/prop-types */

import style from "./MeuModal.module.css";

const MeuModal = ({ isOpen, children }) => {
  if (isOpen) {
    return (
      <div className={style.background_modal}>
        <div className={style.modal}>
          <div>{children}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default MeuModal;
