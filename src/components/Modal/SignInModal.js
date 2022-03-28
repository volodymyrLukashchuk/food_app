import React, { useState, useContext } from "react";

import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { getUser } from "../../features/redux/userSlice";
import PasswordModal from "./ResetPasswordModal";
import { ModalContext } from "../../App";

const SignInModal = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordModal, setPasswordModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      identifier: "",
    },
    onSubmit: async (values) => {
      let item = { identifier: values.identifier, password: values.password };
      const res = await dispatch(getUser(item));
      if (!res.error) {
        history.push("/user");
        showModal("");
      }
    },
  });

  const googleRedirect = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}connect/google`;
  };

  const { showModal } = useContext(ModalContext);

  return (
    <>
      <div>
        {passwordModal && <PasswordModal />}
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
                type="text"
                placeholder="Your username"
                onChange={formik.handleChange}
                value={formik.values.username}
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
          <div className="login-text">
            <p>
              Don't have an account yet?{" "}
              <button onClick={() => showModal("signup")}>Sign Up</button>
            </p>
          </div>
        </div>
        <div className="password-footer">
          <p>
            Forgot your Password?{" "}
            <button onClick={() => showModal("password")}>Reset It</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
