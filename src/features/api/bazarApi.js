import axios from "axios";
import store from "../redux/store";

const bazarApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

bazarApi.interceptors.request.use((config) => {
  const token = store.getState().user.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default bazarApi;
