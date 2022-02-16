import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

const AddressForm = ({
  allAddresses,
  setAllAddresses,
  setShowNewAddressForm,
  showNewAddressForm,
  showOrder,
  setShowOrder,
}) => {

  
  const addressFormSubmit = (data) => {
    setShowOrder(!showOrder);
    setShowNewAddressForm(!showNewAddressForm);

    if (allAddresses.length > 2) return;
    const id = Math.random();
    const title = data.addressTitle;
    const addre$$ = data.addresses;
    const active = false;
    const newAddress = { id, title, addre$$, active };

    setAllAddresses([...allAddresses, newAddress]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addressStyle = clsx({
    "new-address-form": errors,
    "new-address-form active": true,
  });

  return (
    <div className={addressStyle}>
      <h3>Add New Address</h3>
      <form onSubmit={handleSubmit(addressFormSubmit)}>
        <input
          {...register("addressTitle", { required: true })}
          type="text"
          placeholder="Enter title"
        />
        {errors?.addressTitle && (
          <p className="address-error">Title is Required!</p>
        )}

        <div className="placeholder-input">
          <input
            {...register("addresses")}
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
