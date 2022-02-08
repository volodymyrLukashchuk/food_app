import React, { useState } from "react";
/** TODO: лучше делить стили конкретно по компонентам, не стоит импортить стили от другого компонента. */
import "../Checkout/Checkout.css";


const AddressForm = ({
  allAddresses,
  setAllAddresses,
  addressTitle,
  setAddressTitle,
  addresses,
  setAddresses,
  setShowNewAddressForm,
  showNewAddressForm,
  showOrder,
  setShowOrder,
}) => {
  const [addressError, setAddressError] = useState("Title is required!");
  const [showError, setShowError] = useState(false);

  const addressFormSubmit = (e) => {
    e.preventDefault();

    /** TODO: Лишний код лучше не оставлять */
    // if (!address) {
    //   setAddressError("Address is required");
    //   setShowError(!showError);
    //   return;
    // }

    if (!addressTitle) {
      setShowError(!showError);
      setAddressError("Title is required");
      return;
    } else {
      setShowOrder(!showOrder);
      setShowNewAddressForm(!showNewAddressForm);
      setAddresses("");
      setAddressTitle("");
    }
    if (allAddresses.length > 2) return;
    addAddress();
  };

  const addAddress = () => {
    const title = addressTitle;
    const addre$$ = addresses;
    const active = false;
    const newAddress = { title, addre$$, active };

    setAllAddresses([...allAddresses, newAddress]);
  };

  return (
    /** TODO: покопай в сторону либы clsx */
    <div className={showError ? "new-address-form" : "new-address-form active"}>
      <h3>Add New Address</h3>
      {/** TODO: переделай пожалуйста форму на библиотеку react-hook-form */}
      <form onSubmit={addressFormSubmit}>
        <input
          value={addressTitle}
          onChange={(e) => setAddressTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
        />
        {showError && <p className="address-error">{addressError}</p>}
        <div className="placeholder-input">
          <input
            value={addresses}
            onChange={(e) => setAddresses(e.target.value)}
            type="text"
            placeholder="Enter address"
          />
        </div>
        <button>Save Address</button>
      </form>
    </div>
  );
};

export default AddressForm;
