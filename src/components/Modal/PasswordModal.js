import React from "react";
import { useHistory } from "react-router";
import Home from "../Home/Home";
import ReactDom from "react-dom";
import "./PasswordModal.css";

const PasswordModal = () => {
  const history = useHistory();

  return ReactDom.createPortal(
    <div className="signup-modal">
      <Home />
      <div className="overlay">
        <div className="modal-card-contact">
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
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default PasswordModal;
