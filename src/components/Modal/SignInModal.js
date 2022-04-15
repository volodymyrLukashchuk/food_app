import React from "react";

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/redux/user/userThunkActions";

const SignInModal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      identifier: "",
    },
    onSubmit: async (values) => {
      const item = { identifier: values.identifier, password: values.password };
      const res = await dispatch(signIn(item));
      if (!res.error) {
        closeModal();
      }
    },
  });

  return (
    <>
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
    </>
  );
};

export default SignInModal;
