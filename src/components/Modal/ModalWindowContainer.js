import React from "react";
import { useHistory } from "react-router";

const ModalWindowContainer = ({ children }) => {
  const history = useHistory();

  const HideModalWindow = (event) => {
    if (event.target.classList.contains("overlay")) {
      history.push("");
    }
  };

  return (
    <div onClick={HideModalWindow} className="overlay">
      <div className="modal-card-contact">{children}</div>
    </div>
  );
};

export default ModalWindowContainer;
