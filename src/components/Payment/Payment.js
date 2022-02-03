import React from "react";
import { useLocation } from "react-router";
import "./Payment.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const product = useSelector((state) => state.bazar.allProducts);

  const data = useLocation();

  const cartData = useMemo(
    () =>
      cartItems.map((item) => ({
        itemData: product.find((product) => product.id === item.id),
        ...item,
      })),
    [cartItems, product]
  );

  const discount = useMemo(
    () =>
      cartData.reduce(
        (total, item) => item.itemData.finalPrice * item.quantity,
        0
      ),
    [cartData]
  );

  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (total, item) => total + item.itemData.price * item.quantity,
        0
      ),
    [cartData]
  );

  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();

  return (
    <div className="payment">
      <Header />
      <div className="payment-form">
        <div className="forms">
          <div className="form-top">
            <div className="form-header">
              <h3>Order Received</h3>
              <p>Thank you. Your order has been received</p>
            </div>
            <div className="flex">
              <div>
                <h5>Order Number</h5>
                <p>11</p>
              </div>
              <div>
                <h5>Date</h5>
                <p>{today.toLocaleDateString("en-US", options)}</p>
              </div>
              <div>
                <h5>Total</h5>
                <p>${totalPrice - discount + 3 + 10}</p>
              </div>
              <div>
                <h5>Payment Method</h5>
                <p>Cash on delivery</p>
              </div>
            </div>
            <div className="form-mid">
              <h3>Order Details</h3>
              <div className="details-mid">
                <div className="lefts">
                  <h5>Order Number:</h5>
                  <h5>Order Time:</h5>
                  <h5>Delivery Time:</h5>
                  <h5>Delivery Location:</h5>
                </div>
                <div className="rights">
                  <p>{today.toLocaleDateString("en-US", options)}</p>
                  <p>
                    {today.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                    &nbsp;
                    {today.toLocaleDateString("en-US")}
                  </p>
                  <p>{data.state.when}</p>
                  <p>{data.state.address}</p>
                </div>
              </div>
            </div>
            <div className="form-mid">
              <h3>Order Details</h3>
              <div className="details-mid">
                <div className="lefts">
                  <h5>Sub Total:</h5>
                  <h5>Payment Method:</h5>
                  <h5>Cash on delivery:</h5>
                  <h5>Total:</h5>
                </div>
                <div className="rights">
                  <p>${totalPrice - discount + 3}</p>
                  <p>Cash On Delivery</p>
                  <p>10</p>
                  <p>${totalPrice - discount + 3 + 10}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
