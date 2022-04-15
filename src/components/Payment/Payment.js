import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import {
  discountSelector,
  totalPriceSelector,
} from "../../features/redux/selector";

import "./Payment.css";

const Payment = () => {
  const data = useLocation();

  console.log(data);

  const totalPrice = useSelector(totalPriceSelector);
  const discount = useSelector(discountSelector);

  const renderPaymentPage = () => {
    return (
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
                <p>{DateTime.now().toFormat("MMMM dd, yyyy")}</p>
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
                  <p>{DateTime.now().toFormat("MMMM dd, yyyy")}</p>
                  <p>
                    {DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)}
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
    );
  };

  return <div className="payment">{renderPaymentPage()}</div>;
};

export default Payment;
