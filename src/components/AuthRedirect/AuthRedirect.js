import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getToken } from "../../features/redux/userSlice";

const AuthRedirect = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get("access_token");

  useEffect(() => {
    const fetchToken = async () => {
      dispatch(getToken(accessToken));
      history.push("/user");
    };
    fetchToken();
  }, [dispatch, accessToken, history]);

  return null;
};

export default AuthRedirect;
