import React, { useState } from "react";
import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";
import { useHistory } from "react-router-dom";

import "./LoginModal.css";
import Home from "../Home/Home";
import bazarApi from "../../features/api/bazarApi";

const LoginModal = () => {
  const history = useHistory();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    let item = { identifier, password };
    const res = await bazarApi.post("auth/local/", item);
    localStorage.setItem("user-info", JSON.stringify(res.data));

    if (res.data.user) {
      history.push("/user");
    } else {
      return;
    }
  };

  return (
    <div className="signup-modal">
      <Home />
      <div className="overlay">
        <div className="modal-card-contact">
          <div className="modal-form">
            <div className="modals-navbar">
              <h2>Welcome Back</h2>
              <p>Login with your email & password</p>
            </div>
            <form onSubmit={loginHandler}>
              <div className="form-inputs">
                <input
                  onChange={(e) => setIdentifier(e.target.value)}
                  type="text"
                  placeholder="Your email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Your password"
                />
              </div>
              <button className="continue-btn">Continue</button>
            </form>
          </div>
          <div className="modal-bottom">
            <div className="divider">
              <p>
                <span>or</span>
              </p>
            </div>
            <div className="social-buttons">
              <button className="continuefb-btn">
                <span>
                  <ImFacebook2 />
                </span>
                Continue with Facebook
              </button>
              <button className="continuegoogle-btn">
                <span>
                  <BsGoogle />
                </span>
                Continue with Google
              </button>
            </div>
            <div className="login-text">
              <p>
                Don't have an account yet?{" "}
                <button onClick={() => history.push("/signup")}>Sign Up</button>
              </p>
            </div>
          </div>
          <div className="password-footer">
            <p>
              Forgot your Password?{" "}
              <button onClick={() => history.push("/password")}>
                Reset It
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
