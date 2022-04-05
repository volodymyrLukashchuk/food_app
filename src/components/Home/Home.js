import React from "react";
import { useSelector } from "react-redux";

import Coupon from "../Coupon/Coupon";
import Shop from "../Shop/Shop";
import SideNav from "../Sidenav/SideNav";

import "./Home.css";

const Home = () => {
  const user = useSelector((state) => state.user.userData);

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
      {user ? <SideNav /> : null}
    </>
  );
};

export default Home;
