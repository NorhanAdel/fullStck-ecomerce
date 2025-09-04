import React, { useContext } from "react";
import { cart } from "../../constant"; 
import remove_icon from "../../Assets/cart_cross_icon.png";
import { ShopContainer } from "../../context/ShopContext";  
import "./CartItem.css";

export const CartItem = () => {
  const { all_product, cartItem, removeToCart, getTotalCartAmount } =
    useContext(ShopContainer);

  return (
    <div className="cartItem">
      <div className="cartItemFormate-main">
        {cart.map((item, i) => {
          return <p key={i}>{item}</p>;
        })}
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="cartItemFormat cartItemFormate-main" key={e.id}>
                <img
                  src={e.image}
                  className="cartItem-product-item"
                  alt={e.name}
                />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="cartitem-quality">{cartItem[e.id]}</button>
                <p>{e.new_price * cartItem[e.id]}</p>
                <img
                  src={remove_icon}
                  className="cart-icon-remove"
                  alt="remove"
                  onClick={() => {
                    removeToCart(e.id);
                  }}
                />
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="cart-item-down">
        <div className="cart-item-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart-item-total-item">
              <p>Subtitle</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-item-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-item-total-item">
              <p>Total</p>
              <p>${0}</p>
            </div>
          </div>

          <button>PROCCED TO CHECKOUT</button>
        </div>

        <div className="cart-item-promocode">
          <p>if you have promo code , enter code</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
