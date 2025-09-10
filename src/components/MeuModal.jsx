/* eslint-disable react/prop-types */

import "./MeuModal.css";

const MeuModal = ({ children, isOpen, onClose, theme = "dark" }) => {
  if (!isOpen) {
    return null;
  }

  const modalThemeClass = theme === "light" ? "modal--light" : "modal--dark";

  return (
    <div className="background_modal" onClick={onClose}>
      <div
        className={`modal ${modalThemeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MeuModal;
