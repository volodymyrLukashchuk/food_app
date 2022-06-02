import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { Products } from "../../features/redux/bazar/bazarSlice";

interface IProps {
  product: Products;
}

const SingleCard: React.FC<IProps> = ({ product }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <div key={product.id} className="card">
      <Link to={id ? `${product.id}` : `product/${product.id}`}>
        <div className="discount">
          {product.discount ? (
            <span>{product.discount.amount}%</span>
          ) : (
            <p className="discount-blank">.</p>
          )}
        </div>
        <div className="card-img">
          <img
            src={`https://pickbazar.batarin.dev${product.photos[0].url}`}
            alt=""
          />
        </div>
      </Link>
      <div className="card-mid">
        <h3>{product.name}</h3>
        <p>{product.size}</p>
      </div>
      <div className="discount-price">
        {product.discount ? (
          <span>
            {product.price - (product.price * product.discount.amount) / 100}
          </span>
        ) : (
          <p className="discount-blank">.</p>
        )}
      </div>
      <div className="card-bottom">
        <p>${product.price}</p>
        <AddToCartButton singleProduct={product} product={product} />
      </div>
    </div>
  );
};

export default SingleCard;
