import React from "react";
import Coupon from "../Coupon/Coupon";
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
    </>
  );
};

export default Home;
