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
  /**
   * Не оставляй пустое место больше 1 пустой строки. А в конце и начале функции этого делать тоже не желательно
   */

  
  const addressFormSubmit = (data) => {
    setShowOrder(!showOrder);
    setShowNewAddressForm(!showNewAddressForm);

    /**
     * Не делай пожалуйста такие конструкции if (...) return;
     * Читаемость кода несколько ухудшается, соответственно в ревью можно изи пропустить такую строчку.
     * Советую почитать книгу "Чистый код" автора Роберт Мартин
     */
    if (allAddresses.length > 2) return;
    const id = Math.random();
    const title = data.addressTitle;
    /**
     * А почему addre$$ ? Это тоже в каком-то плане читаемость ухудшает
     */
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

  /**
   * Подумай как можно упростить. У тебя "new-address-form" получается есть всегда, но при этом зависит почему-то от 
   * ошибок. И active тоже по сути есть всегда.
   */
  const addressStyle = clsx({
    "new-address-form": errors,
    "new-address-form active": true,
  });

  return (
    <div className={addressStyle}>
      <h3>Add New Address</h3>
      <form onSubmit={handleSubmit(addressFormSubmit)}>
        {/**
         * Тут можно было бы переиспольщовать инпуты из формы логина
         */}
        <input
          {...register("addressTitle", { required: true })}
          type="text"
          placeholder="Enter title"
        />
        {errors?.addressTitle && (
          <p className="address-error">Title is Required!</p>
        )}

        <div className="placeholder-input">
          {/**
           * Лучше использовать textarea
           */}
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
