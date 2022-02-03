import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";

import { useHistory } from "react-router-dom";

import "./Modal.css";
import Home from "../Home/Home";

const SignupModal = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    let item = { email, username, password };
    let req = await fetch("https://pickbazar.batarin.dev/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const res = await req.json();
    localStorage.setItem("user-info", JSON.stringify(res));
    if (res.user) {
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
            <div className="modal-close">
              <span>
                <IoMdClose onClick={() => history.push("/")} />
              </span>
            </div>
            <div className="modal-navbar">
              <h2>Sign Up</h2>
              <p>Welcome!</p>
            </div>
            <form onSubmit={loginHandler}>
              <div className={"form-input"}>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Your username"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Your email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Your password"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Confirm password"
                />
              </div>
              <div className="form-text">
                <p>
                  By signing up, you agree to Pickbazar's
                  <a href="/"> Terms & Condition</a>
                </p>
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
              <button
                onClick={() =>
                  (window.location.href =
                    "https://pickbazar.batarin.dev/connect/google")
                }
                className="continuegoogle-btn"
              >
                <span>
                  <BsGoogle />
                </span>
                Continue with Google
              </button>
            </div>
            <div className="login-text">
              <p>
                Already have an account?{" "}
                <button onClick={() => history.push("/login")}>Login</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
