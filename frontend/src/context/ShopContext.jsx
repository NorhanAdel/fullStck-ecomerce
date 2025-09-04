import { createContext , useState , useEffect } from "react";
  import all_product from "../Assets/all_product"; // Ensure this is an array

export const ShopContainer = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <300+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContext = ({ children }) => {
  const [cartItem, setCartItem] = useState(getDefaultCart);
 const [all_products, setAll_product] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getallproduct")
      .then((res) => res.json())
      .then((data) => {
        setAll_product(data);
      });
  },[]);
  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItem);
    if (localStorage.getItem('auth-token')){
      fetch("http://localhost/4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({itemId: itemId})
      }).then((res)=>res.json()).then((data)=>console.log(data));
    }
  };

  const removeToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
 if (localStorage.getItem('auth-token')){
      fetch("http://localhost/4000/removecart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }




  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let info = all_product.find((product) => product.id === Number(item));
        if (info) {
          totalAmount += info.new_price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };
  const getTotalItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const ContextValue = {
    getTotalItem,
    getTotalCartAmount,
    all_product,
    cartItem,
    addToCart,
    removeToCart,
  };

  return (
    <ShopContainer.Provider value={ContextValue}>
      {children}
    </ShopContainer.Provider>
  );
};

export default ShopContext;
