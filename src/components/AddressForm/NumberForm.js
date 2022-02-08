import React, { useState } from "react";
import "../Checkout/Checkout.css";

/** TODO: С этой формой аналогично */
const NumberForm = ({
  number,
  setNumber,
  numberTitle,
  setNumberTitle,
  allNumbers,
  setAllNumbers,
  showOrder,
  setShowOrder,
  showNewNumberForm,
  setShowNewNumberForm,
}) => {
  const [addressError, setAddressError] = useState("Title is required!");

  const [showError, setShowError] = useState(false);

  const addressFormSubmit = (e) => {
    e.preventDefault();

    if (!number) {
      setAddressError("Number is required!");
      setShowError(!showError);
      return;
    }

    if (!numberTitle) {
      setAddressError("Title is required!");
      setShowError(!showError);
      return;
    } else {
      setShowNewNumberForm(!showNewNumberForm);
      setShowOrder(!showOrder);
      setNumberTitle("");
      setNumber("");
    }

    if (allNumbers.length > 2) return;

    addNumber();
  };

  const addNumber = () => {
    const id = Math.random();
    const num = number;
    const title = numberTitle;
    const active = false;
    const newNumber = { id, title, num, active };

    setAllNumbers([...allNumbers, newNumber]);
  };

  return (
    <div className={showError ? "new-address-form" : "new-address-form active"}>
      <h3>Add New Number</h3>
      <form onSubmit={addressFormSubmit}>
        <input
          value={numberTitle}
          onChange={(e) => setNumberTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
        />
        {showError && <p className="address-error">{addressError}</p>}
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          placeholder="Enter a phone number"
        />
        <button>Save Number</button>
      </form>
    </div>
  );
};

export default NumberForm;
