import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { IAdd, IAddress } from "../../features/redux/cart/cartSlice";

const AddressForm: React.FC<IAddress> = ({
  allAddresses,
  setAllAddresses,
  setShowNewAddressForm,
  showNewAddressForm,
  showOrder,
  setShowOrder,
}) => {
  const addressFormSubmit = (data: IAdd) => {
    setShowOrder(!showOrder);
    setShowNewAddressForm(!showNewAddressForm);

    if (allAddresses.length > 2) return;
    const id = uuidv4();
    const title = data.addressTitle;
    const address = data.addresses;
    const newAddress = { id, title, address };

    setAllAddresses([...allAddresses, newAddress]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdd>();

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
