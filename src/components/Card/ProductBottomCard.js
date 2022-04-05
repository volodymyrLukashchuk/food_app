import React, { useEffect } from "react";
import { IoBagRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../features/redux/cart/cartSlice";
import { getCard } from "../../features/redux/bazar/bazarThunkActions";
import { cardSelector } from "../../features/redux/bazar/bazarSelector";

const ProductBottomCard = () => {
  const dispatch = useDispatch();
  const card = useSelector(cardSelector);

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  return (
    <div className="containers">
      {card.map((card) => (
        <div key={card.id} className="card">
          <Link to={`${card.id}`}>
            <div className="discount">
              {card.discount ? (
                <span>{card.discount.amount}%</span>
              ) : (
                <p className="discount-blank">.</p>
              )}
            </div>
            <div className="card-img">
              <img
                src={`https://pickbazar.batarin.dev${card.photos[0].url}`}
                alt=""
              />
            </div>
          </Link>
          <div className="card-mid">
            <h3>{card.name}</h3>
            <p>{card.size}</p>
          </div>
          <div className="discount-price">
            {card.discount ? (
              <span>
                {card.price - (card.price * card.discount.amount) / 100}
              </span>
            ) : (
              <p className="discount-blank">.</p>
            )}
          </div>
          <div className="card-bottom">
            <p>${card.price}</p>
            <div>
              <button onClick={() => addToCartHandler(card.id)}>
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

export default ProductBottomCard;
