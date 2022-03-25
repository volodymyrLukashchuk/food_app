import React from "react";
import ReactDom from "react-dom";
import { useHistory } from "react-router";
import Home from "../Home/Home";

const ModalWindowContainer = ({ children }) => {
  const history = useHistory();

  const HideModalWindow = (event) => {
    if (event.target.classList.contains("overlay")) {
      history.push("");
    }
  };

  return (
    <>
      <Home />
      {ReactDom.createPortal(
        <div onClick={HideModalWindow} className="overlay">
          <div className="modal-card-contact">{children}</div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
};

export default ModalWindowContainer;
