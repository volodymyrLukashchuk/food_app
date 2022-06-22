import React from "react";
import Card from "../Card/Card";

import { useSelector, useDispatch } from "react-redux";
import { getLastProducts } from "../../features/redux/bazar/bazarThunkActions";
import { getProductsSelector } from "../../features/redux/bazar/bazarSelector";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProductsSelector);

  const getLastProductsHandler = () => {
    dispatch(getLastProducts());
  };

  return (
    <div>
      <div>
        <Card products={products} />
      </div>
      <div className="load-button">
        {products.length !== 0 && products.length < 30 ? (
          <button onClick={getLastProductsHandler}>Load More</button>
        ) : null}
      </div>
    </div>
  );
};

export default Products;
