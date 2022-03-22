import React from "react";
import { IoMdClose } from "react-icons/io";
import { ImFacebook2 } from "react-icons/im";
import { BsGoogle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import ReactDom from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Modal.css";
import Home from "../Home/Home";
import bazarApi from "../../features/api/bazarApi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SignupModal = () => {
  const history = useHistory();

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
        }
      } catch (err) {
        toast.error("Try again");
      }
    },
  });

  return ReactDom.createPortal(
    <div className="signup-modal">
      <Home />
      <ToastContainer />
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
    </div>,
    document.getElementById("portal")
  );
};

export default SignupModal;
