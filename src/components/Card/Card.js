import React from "react";
import SingleCard from "./SingleCard";

import "../Shop/Shop.css";

const Card = ({ products }) => {
  return (
    <div className="container">
      {products.map((product) => (
        <SingleCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Card;
