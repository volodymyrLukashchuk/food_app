import React, { useContext } from "react";
import { ModalContext } from "../../App";

import "./PasswordModal.css";

const PasswordModal = () => {
  const { showModal } = useContext(ModalContext);

  return (
    <>
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
            Back to <button onClick={() => showModal("signin")}>Login</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default PasswordModal;
