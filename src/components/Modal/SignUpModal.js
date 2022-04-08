import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { signUp } from "../../features/redux/user/userThunkActions";

import "./Modal.css";
import "react-toastify/dist/ReactToastify.css";

const SignUpModal = ({ closeModal }) => {
  const dispatch = useDispatch();

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
    onSubmit: (values) => {
      let item = {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const res = dispatch(signUp(item));
      if (!res.error) {
        toast.success("Registration successfull!!");
        closeModal();
      } else {
        toast.error("Try again");
      }
    },
  });

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default SignUpModal;
