import { Navbar } from "./Component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Login, Product, Shop } from "./Pages";
import { Cart } from "./Pages/Login/Cart/Cart";
import { Footer } from "./Container";
import Men_banner from "./Assets/banner_mens.png";
import Women_banner from "./Assets/banner_women.png";
import Kids_banner from "./Assets/banner_kids.png"; // Ensure correct variable name

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/product" element={<Product />} />
          <Route
            path="/men"
            element={<Category banner={Men_banner} category="men" />}
          />
          <Route
            path="/women"
            element={<Category banner={Women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<Category banner={Kids_banner} category="kid" />} // Ensure correct category
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
