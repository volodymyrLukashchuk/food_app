import React from "react";
import "../Shop/Shop.css";
import { IoBagRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import { cartActions } from "../../features/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ products }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  return (
    <div className="container">
      {products.map((product) => (
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
                {product.price -
                  (product.price * product.discount.amount) / 100}
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
      ))}
    </div>
  );
};

export default Card;
