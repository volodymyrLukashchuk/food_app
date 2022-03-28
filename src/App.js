import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { useState, React, createContext } from "react";
import ReactDom from "react-dom";

import User from "./components/User/User";
import Profile from "./components/Profile/Profile";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Product from "./components/Product/Product";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import SignInModal from "./components/Modal/SignInModal";
import SignUpModal from "./components/Modal/SignUpModal";
import PasswordModal from "./components/Modal/ResetPasswordModal";

export const ModalContext = createContext();

function App() {
  const [modalShown, setModalShown] = useState();

  const closeModal = (event) => {
    if (event.target.classList.contains("overlay")) {
      setModalShown("");
    }
  };

  return (
    <ModalContext.Provider value={{ showModal: setModalShown }}>
      <div className="App">
        <BrowserRouter>
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/user" component={User} />
              <Route path="/profile" component={Profile} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={Payment} />
              <Route path="/product/:id" component={Product} />
              <Route path="/auth/google/callback" component={AuthRedirect} />
            </Switch>
          </Router>
          {modalShown &&
            ReactDom.createPortal(
              <div onClick={closeModal} className="overlay">
                <div className={"modal-card-contact"}>
                  {modalShown === "signup" && <SignUpModal />}
                  {modalShown === "signin" && <SignInModal />}
                  {modalShown === "password" && <PasswordModal />}
                </div>
              </div>,
              document.getElementById("portal")
            )}
        </BrowserRouter>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
