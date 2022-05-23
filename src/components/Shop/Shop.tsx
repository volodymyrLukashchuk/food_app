import React from "react";

import Categories from "./Categories";
import Products from "./Products";

import "./Shop.css";

const Shop: React.FC = () => {
  return (
    <div className="shop">
      <Categories />
      <Products />
    </div>
  );
};

export default Shop;
