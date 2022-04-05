import React from "react";
import { useDispatch } from "react-redux";
import { IoBagRemove } from "react-icons/io5";
import { Link } from "react-router-dom";

import { cartActions } from "../../features/redux/cart/cartSlice";

const SingleCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  return (
    <div key={product.id} className="card">
      <Link to={`product/${product.id}`}>
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
        <div>
          <button onClick={() => addToCartHandler(product.id)}>
            <span>
              <IoBagRemove />
            </span>
            Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
