import React, { useEffect, useState } from "react";
import "./Shop.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  getCategories,
  getLastProducts,
  getProducts,
} from "../../features/redux/bazarSlice";
import { HiMinus } from "react-icons/hi";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../features/extraData";
import {
  categoriesSelector,
  productsSelector,
} from "../../features/redux/selector";

const Shop = () => {
  const [activeCategoriesIds, setActiveCategoriesIds] = useState([]);
  const [activeChildCategoriesIds, setActiveChildCategoriesIds] = useState([]);

  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const products = useSelector(productsSelector);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  const HandleCategoryClick = (categoryId) => {
    if (activeCategoriesIds.includes(categoryId)) {
      setActiveCategoriesIds(
        activeCategoriesIds.filter((id) => categoryId !== id)
      );
    } else {
      setActiveCategoriesIds([...activeCategoriesIds, categoryId]);
    }
  };

  useEffect(() => {
    const activeCategories = activeCategoriesIds.map((c) =>
      categories.find((category) => category.id === c)
    );
    const activeCategoriesWithoutChild = activeCategories.filter(
      (categoryData) => {
        return categoryData.childCategories.every(
          (c) => !activeChildCategoriesIds.includes(c.id)
        );
      }
    );
    const additionalChildren = activeCategoriesWithoutChild
      .flatMap((category) => category.childCategories)
      .map((childCategory) => childCategory.id);

    dispatch(getProducts([...activeChildCategoriesIds, ...additionalChildren]));
  }, [activeCategoriesIds, categories, activeChildCategoriesIds, dispatch]);

  const handleChildClick = (categoryId) => {
    if (activeChildCategoriesIds.includes(categoryId)) {
      setActiveChildCategoriesIds(
        activeChildCategoriesIds.filter((id) => categoryId !== id)
      );
    } else {
      setActiveChildCategoriesIds([...activeChildCategoriesIds, categoryId]);
    }
  };

  const getLastProductsHandler = () => {
    dispatch(getLastProducts());
  };

  return (
    <div className="shop">
      <div className="categories-left-bar">
        {categories.map((category) => (
          <ul key={category.id} className="category-list">
            <li>
              <p
                className={
                  activeCategoriesIds.includes(category.id) ? "active" : ""
                }
                onClick={() => HandleCategoryClick(category.id)}
              >
                <FontAwesomeIcon
                  className="category-icons"
                  key={icons.find((i) => i.id === category.id).id}
                  icon={icons.find((i) => i.id === category.id).src}
                />

                {category.title}
              </p>
              {activeCategoriesIds.includes(category.id) && (
                <div>
                  {category.childCategories.map((item) => {
                    return (
                      <div key={item.id} className="child-list">
                        <p
                          className={
                            activeChildCategoriesIds.includes(item.id)
                              ? "active"
                              : ""
                          }
                          onClick={() => handleChildClick(item.id)}
                        >
                          <HiMinus /> {item.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          </ul>
        ))}
      </div>
      <div>
        <div>
          <Card products={products} />
        </div>
        <div className="load-button">
          <button onClick={getLastProductsHandler}>Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
