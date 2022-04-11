import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import store, { persistor } from "./features/redux/store";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "pure-react-carousel/dist/react-carousel.es.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
