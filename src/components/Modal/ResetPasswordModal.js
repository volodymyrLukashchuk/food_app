import React from "react";
import { useHistory } from "react-router";

import ModalWindowContainer from "./ModalWindowContainer";

import "./PasswordModal.css";

const PasswordModal = () => {
  const history = useHistory();

  return (
    <ModalWindowContainer>
      <div className="modal-form">
        <div className="modals-navbar">
          <h2>Forgot Password</h2>
          <p>We'll send you a link to reset your password</p>
        </div>
        <form>
          <div className="form-inputs">
            <input type="text" placeholder="Your email" />
          </div>
          <button className="continue-btn">Continue</button>
        </form>
      </div>
      <div className="modal-bottom">
        <div className="logins-text">
          <p>
            Back to{" "}
            <button onClick={() => history.push("/login")}>Login</button>
          </p>
        </div>
      </div>
    </ModalWindowContainer>
  );
};

export default PasswordModal;
