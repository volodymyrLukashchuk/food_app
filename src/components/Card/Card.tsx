import React from "react";
import SingleCard from "./SingleCard";

import "../Shop/Shop.css";
import { IProduct } from "../../features/redux/bazar/bazarSlice";

interface IProps {
  products: IProduct[];
}

const Card: React.FC<IProps> = ({ products }) => {
  return (
    <div className="container">
      {products instanceof Array
        ? products.map((product: IProduct) => (
            <SingleCard key={product.id} product={product} />
          ))
        : null}
    </div>
  );
};

export default Card;
