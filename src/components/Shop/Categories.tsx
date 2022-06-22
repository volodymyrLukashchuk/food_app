import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { HiMinus } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../features/extraData";

import { getCategoriesSelector } from "../../features/redux/bazar/bazarSelector";

import {
  getAllProducts,
  getCategories,
  getProducts,
} from "../../features/redux/bazar/bazarThunkActions";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Category, ChildCategory } from "../../features/redux/bazar/bazarSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesSelector);
  const [activeCategoriesIds, setActiveCategoriesIds] = useState<Array<number>>(
    []
  );
  const [activeChildCategoriesIds, setActiveChildCategoriesIds] = useState<
    Array<number>
  >([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    if (activeCategoriesIds.includes(categoryId)) {
      setActiveCategoriesIds(
        activeCategoriesIds.filter((id) => categoryId !== id)
      );
    } else {
      setActiveCategoriesIds([categoryId]);
      setActiveChildCategoriesIds([]);
    }
  };

  useEffect(() => {
    const activeCategories = activeCategoriesIds.map(
      (c) => categories.find((category) => category.id === c)!
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

  const handleChildClick = (categoryId: number) => {
    if (activeChildCategoriesIds.includes(categoryId)) {
      setActiveChildCategoriesIds(
        activeChildCategoriesIds.filter((id) => categoryId !== id)
      );
    } else {
      setActiveChildCategoriesIds([categoryId]);
    }
  };

  const renderMainCategories = (category: Category) => {
    const handleMainCategory = () => handleCategoryClick(category.id);

    return (
      <p
        className={activeCategoriesIds.includes(category.id) ? "active" : ""}
        onClick={handleMainCategory}
      >
        <FontAwesomeIcon
          className="category-icons"
          key={icons.find((i) => i.id === category.id)?.id}
          icon={icons.find((i) => i.id === category.id)?.src as IconProp}
        />

        {category.title}
      </p>
    );
  };

  const renderChildCategories = (item: ChildCategory) => {
    const handleChildCategory = () => handleChildClick(item.id);

    return (
      <div key={item.id} className="child-list">
        <p
          className={activeChildCategoriesIds.includes(item.id) ? "active" : ""}
          onClick={handleChildCategory}
        >
          <HiMinus /> {item.title}
        </p>
      </div>
    );
  };

  return (
    <div className="categories-left-bar">
      {categories.map((category) => (
        <ul key={category.id} className="category-list">
          <li>
            {renderMainCategories(category)}
            {activeCategoriesIds.includes(category.id) && (
              <div>
                {category.childCategories.map((item) => {
                  return renderChildCategories(item);
                })}
              </div>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Categories;
