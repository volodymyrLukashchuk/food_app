import React from "react";
import ReactDom from "react-dom";

import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import PasswordModal from "./ResetPasswordModal";

import { ImFacebook2 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { BsGoogle } from "react-icons/bs";

const MODAL_CONFIG = {
  signup: {
    header: "Sign Up",
    subHeader: "Welcome",
    footer: "Already have an account?",
    footerButton: "Login",
  },
  signin: {
    header: "Welcome Back",
    subHeader: "Login with your email & password",
    footer: "Don't have an account yet?",
    footerButton: "Sign Up",
  },
  password: {
    header: "Forgot Password",
    subHeader: "We'll send you a link to reset your password",
    footer: "Back to",
    footerButton: "Login",
  },
};

const AuthModal = ({ modalState, setModalState }) => {
  const googleRedirect = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}connect/google`;
  };

  const closeModal = (event) => {
    if (event.target.classList.contains("overlay")) {
      setModalState("");
    }
  };

  const signUpModalRedirect = () => {
    setModalState(modalState === "signin" ? "signup" : "signin");
  };

  const passwordModalRedirect = () => {
    setModalState("password");
  };
  const renderModalHeader = () => {
    return (
      <div className="modals-navbar">
        {modalState === "signup" ? (
          <div className="modal-close">
            <span onClick={() => setModalState("")}>
              <IoMdClose />
            </span>
          </div>
        ) : null}
        <h2>{MODAL_CONFIG[modalState].header}</h2>
        <p>{MODAL_CONFIG[modalState].subHeader}</p>
      </div>
    );
  };

  const renderMainModal = () => {
    return (
      <>
        {modalState === "signup" && (
          <SignUpModal setModalState={setModalState} />
        )}
        {modalState === "signin" && (
          <SignInModal setModalState={setModalState} />
        )}
        {modalState === "password" && (
          <PasswordModal setModalState={setModalState} />
        )}
      </>
    );
  };

  const renderModalBottom = () => {
    return (
      <div className="modal-bottom">
        {modalState !== "password" ? (
          <div className="divider">
            <p>
              <span>or</span>
            </p>
          </div>
        ) : (
          ""
        )}
        {modalState !== "password" ? (
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
            {MODAL_CONFIG[modalState].footer}{" "}
            <button onClick={signUpModalRedirect}>
              {MODAL_CONFIG[modalState].footerButton}
            </button>
          </p>
        </div>
      </div>
    );
  };

  const renderSignInModalBottom = () => {
    return (
      <>
        {modalState === "signin" ? (
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
      {modalState &&
        ReactDom.createPortal(
          <div onClick={closeModal} className="overlay">
            <div className={"modal-card-contact"}>
              <div>
                <div className="modal-form">
                  {renderModalHeader()}
                  {renderMainModal()}
                </div>
                {renderModalBottom()}
                {renderSignInModalBottom()}
              </div>
            </div>
          </div>,
          document.getElementById("portal")
        )}
    </div>
  );
};

export default AuthModal;
