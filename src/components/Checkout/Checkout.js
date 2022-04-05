import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { postCheckout } from "../../features/redux/bazar/bazarThunkActions";
import { timeMid, timeBot } from "../../features/extraData";
import {
  cartDataSelector,
  cartItemsSelector,
  discountSelector,
  totalPriceSelector,
} from "../../features/redux/selector";

import visa from "../../assets/visa.svg";
import closeSVG from "../../assets/close.svg";
import AddressForm from "../AddressForm/AddressForm";
import NumberForm from "../AddressForm/NumberForm";

import "./Checkout.css";

const Checkout = () => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewNumberForm, setShowNewNumberForm] = useState(false);
  const [showOrder, setShowOrder] = useState(true);
  const [allAddresses, setAllAddresses] = useState([]);
  const [allNumbers, setAllNumbers] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.userData);

  const cartData = useSelector(cartDataSelector);
  const totalPrice = useSelector(totalPriceSelector);
  const discount = useSelector(discountSelector);
  const cartItems = useSelector(cartItemsSelector);

  const formatter = new Intl.NumberFormat("en");

  const addressHandler = () => {
    setShowNewAddressForm(!showNewAddressForm);
    setShowOrder(!showOrder);
  };

  const numberHandler = () => {
    setShowNewNumberForm(!showNewNumberForm);
    setShowOrder(!showOrder);
  };

  const checkoutHandler = async () => {
    const items = cartItems.map((item) => item.id);

    let data = {
      address: selectedAddress.address,
      phone: selectedNumber.num,
      products: items,
      when: selectedTime.description,
      email: user.email,
    };
    dispatch(postCheckout(data));
    history.push("/payment", data);
  };

  const deleteAddress = (add) => {
    setAllAddresses(allAddresses.filter((item) => item.id !== add));
  };

  const deleteNumber = (num) => {
    setAllNumbers(allNumbers.filter((item) => item.id !== num));
  };

  const { control, setValue } = useForm({
    defaultValues: { address: null, number: null, time: null },
  });

  const selectedAddress = useWatch({ control, name: "address" });
  const selectedNumber = useWatch({ control, name: "number" });
  const selectedTime = useWatch({ control, name: "time" });

  return (
    <div className="checkout">
      <div className="checkout-form">
        <div className="delivery-info">
          <div className="left">
            <div className="address">
              <div className="top">
                <div className="top-left">
                  <span>1</span>
                  <p>Delivery Address</p>
                </div>
                <div className="top-right">
                  <p onClick={addressHandler}>+ Add Address</p>
                </div>
              </div>
              <div className="address-bottom">
                {allAddresses.map((add) => (
                  <div
                    onClick={() => {
                      setValue("address", add);
                    }}
                    key={add.id}
                    className={
                      selectedAddress?.id === add.id
                        ? "address-bottom-box actives"
                        : "address-bottom-box"
                    }
                  >
                    <div className="box-top">
                      <p>{add.title}</p>
                      <div className="address-icons">
                        <img
                          onClick={() => deleteAddress(add.id)}
                          src={closeSVG}
                          alt=""
                        />
                      </div>
                    </div>
                    <p>{add.address}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="address schedule">
              <div className="top">
                <div className="top-left">
                  <span>2</span>
                  <p>Delivery Schedule</p>
                </div>
              </div>
              <div className="delivery-mid">
                {timeMid.map((time) => (
                  <div
                    onClick={() => setValue("time", time)}
                    key={time.id}
                    className={
                      selectedTime?.id === time.id
                        ? "mid-boxz actives"
                        : "mid-box"
                    }
                  >
                    <p>{time.title}</p>
                    <span>{time.description}</span>
                  </div>
                ))}
              </div>
              <div className="delivery-bottom">
                {timeBot.map((time) => (
                  <div
                    onClick={() => setValue("time", time)}
                    key={time.id}
                    className={
                      selectedTime?.id === time.id
                        ? "mid-boxz actives"
                        : "mid-box"
                    }
                  >
                    <p>{time.title}</p>
                    <span>{time.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="address number">
              <div className="top">
                <div className="top-left">
                  <span>3</span>
                  <p>Contact Number</p>
                </div>
                <div className="top-right">
                  <p onClick={numberHandler}>+ Add Number</p>
                </div>
              </div>
              <div className="contact-bottom">
                {allNumbers.map((num) => (
                  <div
                    onClick={() => setValue("number", num)}
                    key={num.id}
                    className={
                      selectedNumber?.id === num.id
                        ? "mid-boxes actives"
                        : "mid-box"
                    }
                  >
                    <div className="num-icons-div">
                      <p>{num.title}</p>
                      <div className="address-icons">
                        <img
                          onClick={() => deleteNumber(num.id)}
                          src={closeSVG}
                          alt=""
                        />
                      </div>
                    </div>
                    <span>{num.num}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="address payment">
              <div className="top">
                <div className="top-left">
                  <span>4</span>
                  <p>Payment Option</p>
                </div>
                <div className="top-right">
                  <p>+ Add Card</p>
                </div>
              </div>
              <div className="payment-mid">
                <div className="visa">
                  <img src={visa} alt="" />
                  <p>Card Number</p>
                  <span>
                    **** &nbsp; **** &nbsp; **** &nbsp; <strong>4242</strong>
                  </span>
                  <h4>John Doe</h4>
                </div>
                <div className="visa">
                  {" "}
                  <img src={visa} alt="" />
                  <p>Card Number</p>
                  <span>
                    **** &nbsp; **** &nbsp; **** &nbsp; <strong>4242</strong>
                  </span>
                  <h4>John Doe</h4>
                </div>
                <div className="visa">
                  {" "}
                  <img src={visa} alt="" />
                  <p>Card Number</p>
                  <span>
                    **** &nbsp; **** &nbsp; **** &nbsp; <strong>4242</strong>
                  </span>
                  <h4>John Doe</h4>
                </div>
              </div>
              <div className="payment-mid-text">
                <p>
                  By making this purchase you agree to our
                  <span> terms and conditions</span>
                </p>
              </div>
              <div className="payment-button">
                <button onClick={checkoutHandler}>Proceed to Checkout</button>
              </div>
            </div>
          </div>

          <div className="right">
            {showOrder && (
              <div className="order-form">
                <div className="top">
                  <p>Your Order</p>
                </div>
                {cartData.map((data) => (
                  <div key={data.id} className="items-form">
                    <div className="form">
                      <div className="item">
                        <p>
                          <strong>{data.quantity}</strong>&nbsp;&nbsp;&nbsp; x
                          &nbsp;&nbsp;&nbsp; {data.itemData.name} |{" "}
                          {data.itemData.size}
                        </p>
                      </div>
                      <div className="price">
                        <p>${formatter.format(data.itemData.price)}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}

                <div className="bottoms">
                  <div className="item">
                    <p>Subtotal</p>
                    <p>Delivery fee</p>
                    <p>Discount</p>
                    <hr />
                    <strong>
                      Total<span> (Incl. VAT)</span>
                    </strong>
                  </div>
                  <div className="prices">
                    <p>${totalPrice}</p>
                    <p>$3.00</p>
                    <p>${discount}</p>
                    <hr />
                    <p>${totalPrice + 3.0 - discount}</p>
                  </div>
                </div>
              </div>
            )}
            {showNewAddressForm && (
              <AddressForm
                setAllAddresses={setAllAddresses}
                allAddresses={allAddresses}
                showNewAddressForm={showNewAddressForm}
                setShowNewAddressForm={setShowNewAddressForm}
                showOrder={showOrder}
                setShowOrder={setShowOrder}
              />
            )}
            {showNewNumberForm && (
              <NumberForm
                allNumbers={allNumbers}
                setAllNumbers={setAllNumbers}
                showNewNumberForm={showNewNumberForm}
                setShowNewNumberForm={setShowNewNumberForm}
                showOrder={showOrder}
                setShowOrder={setShowOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
