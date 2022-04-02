import React from "react";

import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/redux/user/userThunkActions";

const SignInModal = ({ setModalState }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      identifier: "",
    },
    onSubmit: async (values) => {
      let item = { identifier: values.identifier, password: values.password };
      const res = await dispatch(signIn(item));
      if (!res.error) {
        history.push("/");
        setModalState("");
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
