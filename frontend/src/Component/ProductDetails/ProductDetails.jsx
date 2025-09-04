import React, { useContext } from "react";
import "./ProductDetails.css";
import Star from "../../Assets/star_icon.png";
import { size } from "../../constant";
import { ShopContainer } from "../../context/ShopContext";

export const ProductDetails = (props) => {
  const { addToCart } = useContext(ShopContainer);
  const { product } = props;

  if (!product) {
    return <div>Product details not available</div>;
  }

  return (
    <div className="productdeatils">
      <div className="productDetails-left">
        <div className="product-imge-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productDetails-img">
          <img
            src={product.image}
            className="deatils-image-main"
            alt={product.name}
          />
        </div>
      </div>
      <div className="productDetails-right">
        <h1>{product.name}</h1>
        <div className="product-details-star">
          {[1, 2, 3, 4].map((item, i) => (
            <img src={Star} alt={`star-${i}`} key={i} />
          ))}
          <span>102</span>
        </div>
        <div className="product-display-right-price">
          <div className="product-display-right-old-price">
            ${product.old_price}
          </div>
          <div className="product-display-right-new-price">
            ${product.new_price}
          </div>
        </div>
        <div className="product-display-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          perferendis quisquam eius, ex consequatur odio pariatur, quae
        </div>
        <div className="product-display-right-size">
          <h1>Select Size</h1>
          <div className="product-display-right-sizes">
            {size.map((items, i) => {
              return <div key={i}>{items}</div>;
            })}
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="product-display-right-category">
          <span>
            Category:<span>Women , T-shirt , Crop Top</span>
          </span>
        </p>
        <p className="product-display-right-category">
          <span>
            Tags:<span>Modern , Latest</span>
          </span>
        </p>
      </div>
    </div>
  );
};
