import React from "react";
import SingleCard from "./SingleCard";

import "../Shop/Shop.css";
import { Products } from "../../features/redux/bazar/bazarSlice";

const Card: React.FC<{ products: Products[] }> = ({ products }) => {
  return (
    <div className="container">
      {products instanceof Array
        ? products.map((product: Products) => (
            <SingleCard key={product.id} product={product} />
          ))
        : null}
    </div>
  );
};

export default Card;
