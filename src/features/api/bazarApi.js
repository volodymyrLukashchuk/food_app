import axios from "axios";

let store;

export const injectStore = (_store) => {
  store = _store;
};

axios.interceptors.request.use((config) => {
  config.headers.authorization = store.getState().user.token;
  return config;
});

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
