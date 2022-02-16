import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";

const NumberForm = ({
  allNumbers,
  setAllNumbers,
  showOrder,
  setShowOrder,
  showNewNumberForm,
  setShowNewNumberForm,
}) => {
  const addressFormSubmit = (data) => {
    setShowNewNumberForm(!showNewNumberForm);
    setShowOrder(!showOrder);

    if (allNumbers.length > 2) return;
    const id = Math.random();
    const num = data.number;
    const title = data.numberTitle;
    const active = false;
    const newNumber = { id, title, num, active };

    setAllNumbers([...allNumbers, newNumber]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const numberStyle = clsx({
    "new-address-form": errors,
    "new-address-form active": true,
  });

  return (
    <div className={numberStyle}>
      <h3>Add New Number</h3>
      <form onSubmit={handleSubmit(addressFormSubmit)}>
        <input
          {...register("numberTitle", { required: true })}
          type="text"
          placeholder="Enter title"
        />
        {errors?.numberTitle && (
          <p className="address-error">Title is Required!</p>
        )}
        <input
          {...register("number")}
          type="text"
          placeholder="Enter a phone number"
        />
        <button>Save Number</button>
      </form>
    </div>
  );
};

export default NumberForm;
