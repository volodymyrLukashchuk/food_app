import React, { useEffect } from "react";
import "./Product.css";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../features/redux/bazarSlice";
import { useParams } from "react-router";
import { IoBagRemove } from "react-icons/io5";
import { cartActions } from "../../features/redux/cartSlice";
import CardSingle from "../Card/CardSingle";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) =>
    state.bazar.allProducts.find((p) => p.id === +id)
  );

  useEffect(() => {
    if (!singleProduct) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id, singleProduct]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemsToCart(item));
  };

  if (!singleProduct) return null;

  return (
    <div>
      <Header />
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
                <button onClick={() => addToCartHandler(singleProduct.id)}>
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
        <div className="container">
          <CardSingle singleProduct={singleProduct} />
        </div>
      </div>
    </div>
  );
};

export default Product;
