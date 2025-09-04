import React from 'react'
import "./Sidebar.css"
import list_product from "../../Assets/Product_list_icon.svg"
import product_cart from "../../Assets/Product_Cart.svg"
import { Link } from "react-router-dom";
export const  Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <div className="sidebar-item">
            <img src={product_cart} alt="product" />
            <p>Add Product</p>
          </div>
        </div>
      </Link>
      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <div className="sidebar-item">
            <img src={list_product} alt="product" />
            <p>Product List</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
