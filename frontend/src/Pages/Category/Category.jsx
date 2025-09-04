import React, { useContext } from "react";
import { ShopContainer } from "../../context/ShopContext";  // Correct import
import "./Category.css";

import drop_down from "../../Assets/dropdown_icon.png";
import { Items } from "../../Component";

export const Category = (props) => {
  const { all_product } = useContext(ShopContainer);

  return (
    <div className="shop-category">
      <img src={props.banner} alt="category-banner" className="shopCategory_banner" />
      <div className="shop-category-header">
        <p>
          <span>showing 1 - 12</span>
          out of 36 products
        </p>
        <div className="shopCategory-sort">
          sort by <img src={drop_down} alt="dropdown-icon" />
        </div>
      </div>
      <div className="shopCategory-product">
        {all_product.map((item, i) => {
          return (
            props.category === item.category && (
              <Items
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            )
          );
        })}
      </div>
      <div className="shopCategoryloadmore">
        Explore
      </div>
    </div>
  );
};
