import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoBagRemove } from "react-icons/io5";
import { toast } from "react-toastify";

import { cartActions } from "../../features/redux/cart/cartSlice";
import {
  getSingleProduct,
  getCard,
  getAllProducts,
} from "../../features/redux/bazar/bazarThunkActions";
import { cardSelector } from "../../features/redux/bazar/bazarSelector";
import { userSelector } from "../../features/redux/user/userSelector";

import "./Product.css";
import Card from "../Card/Card";
import { RootState } from "../../features/redux/store";
import { Pics, IProduct } from "../../features/redux/bazar/bazarSlice";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const singleProduct = useSelector<RootState, IProduct | undefined>((state) =>
    state.bazar.allProducts.find((p) => p.id === +id)
  );

  const [mainPic, setMainPic] = useState<null | string>(null);

  const card = useSelector(cardSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(getCard());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!singleProduct) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id, singleProduct]);

  const addToCartHandler = (item: number) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  const handleAddItemToCart = (singleProduct: IProduct) => {
    addToCartHandler(singleProduct.id);
    if (user) {
      addToCartHandler(singleProduct.id);
    } else {
      toast.error("You are not Logged In");
    }
  };

  const clearMainPic = () => {
    setMainPic(null);
  };

  const renderMainPic = (pic: Pics) => {
    const changeMainPic = () =>
      setMainPic(`https://pickbazar.batarin.dev${pic.url}`);

    return (
      <img
        key={pic.url}
        src={`https://pickbazar.batarin.dev${pic.url}`}
        alt=""
        onMouseEnter={changeMainPic}
        onMouseLeave={clearMainPic}
      />
    );
  };

  if (!singleProduct) return null;

  return (
    <div>
      <div className="product-page">
        <div className="product-description">
          <div className="description-left">
            <div className="main-pic">
              <img
                src={
                  mainPic ||
                  `https://pickbazar.batarin.dev${singleProduct.photos[0].url}`
                }
                alt=""
              />
            </div>
            <div className="bottom-pic">
              {singleProduct.photos.map((pic) => {
                return renderMainPic(pic);
              })}
            </div>
          </div>
          <div className="description-right">
            <div className="description-right-top">
              <h3>{singleProduct.name}</h3>
              <span>${singleProduct.price}</span>
            </div>
            <div className="quantity">{singleProduct.size}</div>
            <div className="description-right-mid">
              {singleProduct.description}
            </div>
            <div className="description-right-bottom">
              <div className="bottom-btn">
                <button onClick={() => handleAddItemToCart}>
                  <i>
                    <IoBagRemove />
                  </i>
                  Cart
                </button>
              </div>
              <div className="description-category">
                <span>{singleProduct.category.title}</span>
                <span>{singleProduct.category.parentCategory.title}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card products={card} />
        </div>
      </div>
    </div>
  );
};

export default Product;
