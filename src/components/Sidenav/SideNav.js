import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import cart from "../../assets/cart.svg";
import cart1 from "../../assets/cart1.svg";
import mainCart from "../../assets/cart-main.svg";
import { cartActions } from "../../features/redux/cart/cartSlice";
import {
  cartItemsSelector,
  cartDataSelector,
  totalPriceSelector,
  totalQuantitySelector,
} from "../../features/redux/selector";

import "./SideNav.css";
import "../Home/Home.css";
import "../Header/Header.css";

const SideNav = () => {
  const [sideNav, setSideNav] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const cartItems = useSelector(cartItemsSelector);
  const cartData = useSelector(cartDataSelector);
  const totalPrice = useSelector(totalPriceSelector);
  const totalQuantity = useSelector(totalQuantitySelector);

  const formatter = new Intl.NumberFormat("en");

  const addItemHandler = (item) => {
    dispatch(cartActions.increaseItemQuantity(item));
  };

  const deleteItemHandler = (item) => {
    dispatch(cartActions.removeItemsFromCart(item));
  };

  const subtractItemHandler = (item) => {
    dispatch(cartActions.decreaseItemQuantity(item));
  };

  const checkoutHandler = () => {
    if (cartData.length > 0) {
      history.push("/checkout");
    } else {
      return;
    }
  };

  return (
    <div>
      <div onClick={() => setSideNav(!sideNav)} className="cart">
        <span>
          <span>
            <img src={cart} alt="" />
          </span>
          {totalQuantity} Item(s)
        </span>
        <button>${formatter.format(totalPrice)}</button>
      </div>
      <div className="cart-column">
        <div className={!sideNav ? "sidenav" : "sidenav active"}>
          <div>
            <div className="top">
              <div>
                <span>
                  <span>
                    <img src={cart1} alt="" />
                  </span>
                  {totalQuantity} Item(s)
                </span>
              </div>
              <div className="close-icon">
                <IoMdClose onClick={() => setSideNav(!sideNav)} />
              </div>
            </div>
            {cartData.map((item) => (
              <div key={item.id} className="cart-products">
                <div className="cart-left">
                  <div className="left-button">
                    <div>
                      <span onClick={() => addItemHandler(item.id)}>+</span>
                    </div>
                    <p>{item.quantity}</p>
                    <div>
                      <span onClick={() => subtractItemHandler(item.id)}>
                        -
                      </span>
                    </div>
                  </div>
                  <div className="left-logo">
                    <img
                      src={`https://pickbazar.batarin.dev${item.itemData.photos[0].url}`}
                      alt=""
                    />
                  </div>
                  <div className="left-price">
                    <div className="name-price">
                      <p>{item.itemData.name}</p>
                    </div>
                    <p className="mid-price">${item.itemData.price}</p>
                    <div className="quantity-left">
                      <span>
                        {item.quantity} x {item.itemData.size}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cart-right">
                  <p>${item.itemData.price} </p>
                  <i>
                    <IoMdClose
                      onClick={() => deleteItemHandler(item.id)}
                      className="closed-icon"
                    />
                  </i>
                </div>
              </div>
            ))}
            {cartItems.length > 0 ? (
              ""
            ) : (
              <div className="middle">
                <div className="cart-icon">
                  <img src={mainCart} alt="" />
                </div>
                <div>
                  <p>No Products found</p>
                </div>
              </div>
            )}
          </div>
          <div className="bottom">
            <button onClick={checkoutHandler}>
              <span className="text">Checkout</span>
              <span className="price">${formatter.format(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
