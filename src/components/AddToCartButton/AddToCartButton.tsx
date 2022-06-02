import React from "react";
import { IoBagRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/redux/user/userSelector";
import { useLocation } from "react-router-dom";
import { cartActions } from "../../features/redux/cart/cartSlice";
import { toast } from "react-toastify";
import { Products } from "../../features/redux/bazar/bazarSlice";

interface IProps {
  product: Products;
  singleProduct: Products;
}

const AddToCartButton: React.FC<IProps> = ({ product, singleProduct }) => {
  const { pathname } = useLocation();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const addToCartHandler = (item: number) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  const addToCart = () => {
    if (user) {
      addToCartHandler(
        pathname === `/product/${product.id}` ? singleProduct.id : product.id
      );
    } else {
      toast.error("You are not Logged In");
    }
  };

  return (
    <div>
      <button onClick={addToCart}>
        <span>
          <IoBagRemove />
        </span>
        Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
