import React from "react";
import ReactDom from "react-dom";

import { Switch, Route } from "react-router-dom";

import Coupon from "../Coupon/Coupon";
import PasswordModal from "../Modal/ResetPasswordModal";
import SignInModal from "../Modal/SignInModal";
import SignUpModal from "../Modal/SignUpModal";
import Shop from "../Shop/Shop";

import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="inner-text">
          <h2>Groceries Delivered in 90 Minute</h2>
          <span>
            Get your healthy foods & snacks delivered at your doorsteps all day
            everyday
          </span>
        </div>
      </div>
      <Coupon />
      <Shop />

      {ReactDom.createPortal(
        <Switch>
          <Route path="/login" component={SignInModal} />
          <Route path="/signup" component={SignUpModal} />
          <Route path="/password" component={PasswordModal} />
        </Switch>,
        document.getElementById("portal")
      )}
    </>
  );
};

export default Home;
