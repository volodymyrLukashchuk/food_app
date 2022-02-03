import React, { useMemo, useState } from "react";
import "./Checkout.css";
import Header from "../Header/Header";
import visa from "../../assets/visa.svg";
import editSVG from "../../assets/edit.svg";
import closeSVG from "../../assets/close.svg";
import AddressForm from "../AddressForm/AddressForm";
import NumberForm from "../AddressForm/NumberForm";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewNumberForm, setShowNewNumberForm] = useState(false);
  const [showOrder, setShowOrder] = useState(true);
  const [active, setActive] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [timeActive, setTimeActive] = useState(null);

  const [addresses, setAddresses] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [allAddresses, setAllAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [when, setWhen] = useState("");

  const [number, setNumber] = useState("");
  const [numberTitle, setNumberTitle] = useState("");
  const [allNumbers, setAllNumbers] = useState([]);

  const cartItems = useSelector((state) => state.cart.items);
  const product = useSelector((state) => state.bazar.allProducts);

  const cartData = useMemo(
    () =>
      cartItems.map((item) => ({
        itemData: product.find((product) => product.id === item.id),
        ...item,
      })),
    [cartItems, product]
  );

  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (total, item) => total + item.itemData.price * item.quantity,
        0
      ),
    [cartData]
  );

  const discount = useMemo(
    () =>
      cartData.reduce(
        (total, item) => item.itemData.finalPrice * item.quantity,
        0
      ),
    [cartData]
  );

  const formatter = new Intl.NumberFormat("en");
  const history = useHistory();

  const addressHandler = () => {
    setShowNewAddressForm(!showNewAddressForm);
    setShowOrder(!showOrder);
  };

  const numberHandler = () => {
    setShowNewNumberForm(!showNewNumberForm);
    setShowOrder(!showOrder);
  };

  let data = JSON.parse(localStorage.getItem("user-info"));

  let email = data.email;

  const checkoutHandler = async () => {
    const items = cartItems.map((item) => item.id);

    let data = { address, phone, products: items, when, email };

    let req = await fetch("https://pickbazar.batarin.dev/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    localStorage.setItem("user-info", JSON.stringify(res));

    history.push("/payment", data);
    console.log(res);
  };

  const addressPickHandler = (add) => {
    setAddress(add.addre$$);
    setActive(add.id);
  };

  const numberPickHandler = (num) => {
    setPhone(num.num);
    setIsActive(num.id);
  };

  const timePickHandler = (time) => {
    setTimeActive(time.id);
    setWhen(time.description);
  };

  const deleteAddress = (add) => {
    setAllAddresses(allAddresses.filter((item) => item.id !== add));
  };

  const deleteNumber = (num) => {
    setAllNumbers(allNumbers.filter((item) => item.id !== num));
  };

  const timeMid = [
    {
      id: 1,
      title: "Express Delivery",
      description: "90 min express delivery",
    },
    {
      id: 2,
      title: "8am-11am",
      description: "8:00 AM - 11:00 AM",
    },
    {
      id: 3,
      title: "11am-2pm",
      description: "11:00 AM - 2:00 PM",
    },
  ];

  const timeBot = [
    {
      id: 4,
      title: "2pm-5pm",
      description: "2:00 PM - 5:00 PM",
    },
    {
      id: 5,
      title: "5pm-8pm",
      description: "5:00 PM - 8:00 PM",
    },
    {
      id: 6,
      title: "8pm-11pm",
      description: "8:00 PM - 11:00 PM",
    },
  ];

  return (
    <div className="checkout">
      <Header />

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
                    onClick={() => addressPickHandler(add)}
                    key={add.title}
                    className={
                      active === add.id
                        ? "address-bottom-box actives"
                        : "address-bottom-box"
                    }
                  >
                    <div className="box-top">
                      <p>{add.title}</p>
                      <div className="address-icons">
                        {/* <img src={editSVG} alt="" /> */}
                        <img
                          onClick={() => deleteAddress(add.id)}
                          src={closeSVG}
                          alt=""
                        />
                      </div>
                    </div>
                    <p>{add.addre$$}</p>
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
                    onClick={() => timePickHandler(time)}
                    key={time.id}
                    className={
                      timeActive === time.id ? "mid-boxz actives" : "mid-box"
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
                    onClick={() => timePickHandler(time)}
                    key={time.id}
                    className={
                      timeActive === time.id ? "mid-boxz actives" : "mid-box"
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
                    onClick={() => numberPickHandler(num)}
                    key={num.id}
                    className={
                      isActive === num.id ? "mid-boxes actives" : "mid-box"
                    }
                  >
                    <div className="num-icons-div">
                      <p>{num.title}</p>
                      <div className="address-icons">
                        {/* <img src={editSVG} alt="" /> */}
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
                setAddressTitle={setAddressTitle}
                addressTitle={addressTitle}
                addresses={addresses}
                setAddresses={setAddresses}
                showNewAddressForm={showNewAddressForm}
                setShowNewAddressForm={setShowNewAddressForm}
                showOrder={showOrder}
                setShowOrder={setShowOrder}
              />
            )}
            {showNewNumberForm && (
              <NumberForm
                number={number}
                setNumber={setNumber}
                numberTitle={numberTitle}
                setNumberTitle={setNumberTitle}
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
