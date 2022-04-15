import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoBagRemove } from "react-icons/io5";

import { cartActions } from "../../features/redux/cart/cartSlice";
import {
  getSingleProduct,
  getCard,
  getAllProducts,
} from "../../features/redux/bazar/bazarThunkActions";
import { cardSelector } from "../../features/redux/bazar/bazarSelector";

import "./Product.css";
import Card from "../Card/Card";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) =>
    state.bazar.allProducts.find((p) => p.id === +id)
  );

  const card = useSelector(cardSelector);

  useEffect(() => {
    dispatch(getCard());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!singleProduct) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id, singleProduct]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  const addToCart = () => {
    addToCartHandler(singleProduct.id);
  };

  if (!singleProduct) return null;

  return (
    <div>
      <div className="product-page">
        <div className="product-description">
          <div className="description-left">
            <div className="main-pic">
              <img
                src={`https://pickbazar.batarin.dev${singleProduct.photos[0].url}`}
                alt=""
              />
            </div>
            <div className="bottom-pic">
              {singleProduct.photos.map((pic) => {
                return (
                  <img
                    key={pic.url}
                    src={`https://pickbazar.batarin.dev${pic.url}`}
                    alt=""
                  />
                );
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
                <button onClick={addToCart}>
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
