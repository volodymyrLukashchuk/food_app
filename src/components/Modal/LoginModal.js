import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import ReactDom from "react-dom";
import "./LoginModal.css";
import Home from "../Home/Home";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { getUser } from "../../features/redux/userSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      identifier: "",
    },
    onSubmit: async (values) => {
      let item = { identifier: values.identifier, password: values.password };
      dispatch(getUser(item)).then((res) => {
        if (!res.error) {
          history.push("/user");
        }
      });
    },
  });

  return ReactDom.createPortal(
    <div className="signup-modal">
      <Home />
      <div className="overlay">
        <div className="modal-card-contact">
          <div className="modal-form">
            <div className="modals-navbar">
              <h2>Welcome Back</h2>
              <p>Login with your email & password</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-inputs">
                <input
                  id="identifier"
                  name="identifier"
                  type="email"
                  placeholder="Your email"
                  onChange={formik.handleChange}
                  value={formik.values.identifier}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <button type="submit" className="continue-btn">
                Continue
              </button>
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
    </div>,
    document.getElementById("portal")
  );
};

export default LoginModal;
