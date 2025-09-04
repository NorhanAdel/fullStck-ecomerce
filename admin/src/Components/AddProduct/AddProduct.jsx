import React, { useState } from "react";
import "./AddProduct.css";
import upload_aera from "../../Assets/upload_area.svg";

export const AddProduct = () => {
  const [Image, setImage] = useState(null);
  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    category: "Women",
    new_price: "",
    old_price: "",
  });

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const add_product = async () => {
    console.log(productDetails);
    let responseData;
    let formData = new FormData();
    formData.append("product", Image);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      responseData = await response.json();

      if (responseData.success) {
        let product = { ...productDetails, image: responseData.image_url };

        const addProductResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          alert("Product is added");
        } else {
          alert("Failed to add product");
        }

        console.log(product);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-field">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter Your Text"
        />
      </div>
      <div className="add-product-price">
        <div className="add-product-field">
          <p>Old Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Typing here..."
          />
        </div>
        <div className="add-product-field">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Typing here..."
          />
        </div>
      </div>
      <div className="add-product-field">
        <p>Product Category</p>
        <select
          className="add-product-selecter"
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="Women"> Women</option>
          <option value="Kids"> Kids</option>
          <option value="Men"> Men</option>
        </select>
      </div>
      <div className="add-product-field">
        <label htmlFor="file-input">
          <img
            src={Image ? URL.createObjectURL(Image) : upload_aera}
            alt="upload_aera"
            className="add-product-thumbnails"
            onClick={() => document.getElementById("file-input").click()}
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          hidden
          onChange={ImageHandler}
        />
      </div>
      <button className="add-product-btn" onClick={add_product}>
        ADD
      </button>
    </div>
  );
};
