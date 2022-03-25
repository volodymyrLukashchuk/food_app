import React from "react";
import "../Shop/Shop.css";
import SingleCard from "./SingleCard";

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
