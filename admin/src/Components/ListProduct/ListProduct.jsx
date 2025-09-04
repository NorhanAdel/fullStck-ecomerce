import React, { useEffect, useState } from "react";
import { productList } from "../../Constant";
import "./ListProduct.css";
import crose_icon from "../../Assets/cross_icon.png";

export const ListProduct = () => {
  const [allproduct, setAllproduct] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/getallproduct");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllproduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  const remove_products = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        {productList.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div className="product-list-allproduct">
        <hr />
        {allproduct.map((product, index) => (
          <>
            <div
              key={index}
              className="listproduct-format-main list-product-format"
            >
              <img
                src={product.image}
                alt={product.name}
                className="productlist-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  remove_products(product.id);
                }}
                src={crose_icon}
                alt="Remove"
                className="list-product-remove-icon"
              />
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};
