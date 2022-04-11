import React, { useState } from "react";
import ReactDom from "react-dom";

import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import PasswordModal from "./ResetPasswordModal";
import { MODAL_CONFIG } from "../../features/extraData";

import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";

const MODAL_STATE = {
  SIGNUP: "signup",
  SIGNIN: "signin",
  PASSWORD: "password",
};

const AuthModal = ({ closeModal }) => {
  const [modalState, setModalState] = useState(MODAL_STATE.SIGNUP);

  const googleRedirect = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}connect/google`;
  };

  const signUpModalRedirect = () => {
    setModalState(
      modalState === MODAL_STATE.SIGNIN
        ? MODAL_STATE.SIGNUP
        : MODAL_STATE.SIGNIN
    );
  };

  const passwordModalRedirect = () => {
    setModalState(MODAL_STATE.PASSWORD);
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("overlay")) {
      closeModal();
    }
  };

  const renderModalHeader = () => {
    return (
      <div className="modals-navbar">
        <h2>{MODAL_CONFIG[modalState]?.header}</h2>
        <p>{MODAL_CONFIG[modalState]?.subHeader}</p>
      </div>
    );
  };

  const renderMainModal = () => {
    return (
      <>
        {modalState === MODAL_STATE.SIGNUP && (
          <SignUpModal closeModal={closeModal} />
        )}
        {modalState === MODAL_STATE.SIGNIN && (
          <SignInModal closeModal={closeModal} />
        )}
        {modalState === MODAL_STATE.PASSWORD && <PasswordModal />}
      </>
    );
  };

  const renderModalBottom = () => {
    return (
      <div className="modal-bottom">
        {modalState !== MODAL_STATE.PASSWORD ? (
          <div className="divider">
            <p>
              <span>or</span>
            </p>
          </div>
        ) : (
          ""
        )}
        {modalState !== MODAL_STATE.PASSWORD ? (
          <div className="social-buttons">
            <button className="continue-fb-btn">
              <span>
                <ImFacebook2 />
              </span>
              Continue with Facebook
            </button>
            <button onClick={googleRedirect} className="continue-google-btn">
              <span>
                <BsGoogle />
              </span>
              Continue with Google
            </button>
          </div>
        ) : null}
        <div className="login-text">
          <p>
            {MODAL_CONFIG[modalState]?.footer}{" "}
            <button onClick={signUpModalRedirect}>
              {MODAL_CONFIG[modalState]?.footerButton}
            </button>
          </p>
        </div>
      </div>
    );
  };

  const renderSignInModalBottom = () => {
    return (
      <>
        {modalState === MODAL_STATE.SIGNIN ? (
          <div className="password-footer">
            <p>
              Forgot your Password?{" "}
              <button onClick={passwordModalRedirect}>Reset It</button>
            </p>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <div>
      {ReactDom.createPortal(
        <div onClick={handleOutsideClick} className={"overlay"}>
          <div className="modal-card-contact">
            <div className="modal-form">
              {renderModalHeader()}
              {renderMainModal()}
            </div>
            {renderModalBottom()}
            {renderSignInModalBottom()}
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </div>
  );
};

export default AuthModal;
