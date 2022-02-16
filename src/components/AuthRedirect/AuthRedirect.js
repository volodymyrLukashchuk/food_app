import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AuthRedirect = () => {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get("access_token");

  useEffect(() => {
    const fetchToken = async () => {
      const res = await axios.get(
        `https://pickbazar.batarin.dev/auth/google/callback?access_token=${accessToken}`
      );
      localStorage.setItem("jwt", res.data.jwt);
      return res.data;
    };
    fetchToken();
  }, [accessToken]);

  return <div></div>;
};

export default AuthRedirect;
