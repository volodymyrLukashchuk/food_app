import axios, { AxiosRequestConfig } from "axios";
import store from "../redux/store";

const bazarApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

bazarApi.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = store.getState().user.token;
  if (config.headers === undefined) {
    config.headers = {};
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default bazarApi;
