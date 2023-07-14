import React, { createContext, useContext, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLoaderData } from "react-router-dom";

export const ProductContext = createContext([]);
export const CartContext = createContext([]);
const App = () => {
  const { cartProducts, data } = useLoaderData();
  const [cart, setCart] = useState(cartProducts);
  const cartAlert = sessionStorage.getItem("alert");
  if (cart.length > 0 && cartAlert !== "true") {
    // setIsOpen(true);
    sessionStorage.setItem("alert", true);
  }
  return (
    <ProductContext.Provider value={data}>
      <CartContext.Provider value={[cart, setCart]}>
        <Header></Header>
        <div className="min-h-[calc(100vh-137px)]">
          <Outlet />
        </div>
        <Footer></Footer>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default App;
