import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { googleLogin } from "../../features/redux/user/userThunkActions";

const AuthRedirect = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get("access_token");

  useEffect(() => {
    const fetchToken = async () => {
      dispatch(googleLogin(accessToken));
      history.push("/");
    };
    fetchToken();
  }, []);

  return null;
};

export default AuthRedirect;
