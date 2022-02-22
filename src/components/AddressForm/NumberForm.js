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
  /**
   * Не оставляй пустое место больше 1 пустой строки. А в конце и начале функции этого делать тоже не желательно
   */

  
  const addressFormSubmit = (data) => {
    setShowNewNumberForm(!showNewNumberForm);
    setShowOrder(!showOrder);

    /**
     * Не делай пожалуйста такие конструкции if (...) return;
     * Читаемость кода несколько ухудшается, соответственно в ревью можно изи пропустить такую строчку.
     * Советую почитать книгу "Чистый код" автора Роберт Мартин
     */
    if (allNumbers.length > 2) return;
    const id = Math.random();
    /**
     * К num или number добавь слово phone, будет более понятно что за number тут конкретно
     */
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

  /**
   * Аналогично подумай над оптимизацией
   */
  const numberStyle = clsx({
    "new-address-form": errors,
    "new-address-form active": true,
  });

  return (
    <div className={numberStyle}>
      <h3>Add New Number</h3>
      <form onSubmit={handleSubmit(addressFormSubmit)}>
        {/**
         * Инпут переиспользуй
         */}
        <input
          {...register("numberTitle", { required: true })}
          type="text"
          placeholder="Enter title"
        />
        {errors?.numberTitle && (
          <p className="address-error">Title is Required!</p>
        )}
        {/**
         * Инпут переиспользуй
         */}
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
