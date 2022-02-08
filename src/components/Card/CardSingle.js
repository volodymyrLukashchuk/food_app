import React, { useEffect } from "react";
import "../Shop/Shop.css";
import { IoBagRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import { cartActions } from "../../features/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../../features/redux/bazarSlice";

/** TODO: неиспользуемая пропса */
const CardSingle = ({ singleProduct }) => {
  const dispatch = useDispatch();
  /** TODO: покопай в сторону либки reselect, и выноси все селекторы в отдельный файл
   * И в целом наверно стоит переименовать все из card в singleProduct. Не совсем понятно чего конкретно карточка это
   */
  const card = useSelector((state) => state.bazar.card);

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  return (
    <div className="containers">
      {/** TODO: Хм, а если у тебя это Single компонент, почему тогда выводится в массиве? */}
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

export default CardSingle;
