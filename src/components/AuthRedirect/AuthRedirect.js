import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const AuthRedirect = () => {
  const location = useLocation();
  const history = useHistory();

  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get("access_token");

  useEffect(() => {
    const fetchToken = async () => {
      const res = await axios.get(
        `https://pickbazar.batarin.dev/auth/google/callback?access_token=${accessToken}`
      );
      localStorage.setItem("jwt", res.data.jwt);
      history.push("/user");
    };
    fetchToken();
  }, [accessToken, history]);

  return <div></div>;
};

export default AuthRedirect;
