import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import bazarApi from "../../features/api/bazarApi";
import SignInModal from "./SignInModal";
import { ModalContext } from "../../App";

import "./Modal.css";
import "react-toastify/dist/ReactToastify.css";

const SignUpModal = ({ setShowSignUpModal, showSignUpModal }) => {
  const history = useHistory();
  const [signInModal, setSignInModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is Required"),
      username: Yup.string().required("Username is Required"),
    }),
    onSubmit: async (values) => {
      let item = {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      try {
        const res = await bazarApi.post("auth/local/register", item);
        localStorage.setItem("user-info", JSON.stringify(res.data));
        if (res.data.user) {
          toast.success("Registration successfull!");
          setTimeout(() => history.push("/user"), 2000);
          setTimeout(() => showModal(""), 2000);
        }
      } catch (err) {
        toast.error("Try again");
      }
    },
  });

  const googleRedirect = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}connect/google`;
  };

  const { showModal } = useContext(ModalContext);

  return (
    <>
      <ToastContainer />
      {signInModal && (
        <SignInModal
          signInModal
          setSignInModal={setSignInModal}
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}
      <div className="modal-form">
        <div className="modal-close">
          <span>
            <IoMdClose onClick={() => showModal("")} />
          </span>
        </div>
        <div className="modal-navbar">
          <h2>Sign Up</h2>
          <p>Welcome!</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={"form-input"}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            ) : (
              ""
            )}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </div>
          <div className="form-text">
            <p>
              By signing up, you agree to Pickbazar's
              <a href="/"> Terms & Condition</a>
            </p>
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
            Already have an account?{" "}
            <button onClick={() => showModal("signin")}>Login</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
