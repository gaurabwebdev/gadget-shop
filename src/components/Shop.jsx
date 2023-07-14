import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCart from "./Cards/ProductCard";
import { addToDB } from "../Utilities/fakeDB";
import { CartContext, ProductContext } from "../App";
import { toast } from "react-hot-toast";

const Shop = () => {
  const data = useContext(ProductContext);
  const [cart, setCart] = useContext(CartContext);
  const handleAddToCart = (product) => {
    let newCart = [];
    const exist = cart.find((cartP) => cartP.id === product.id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      const restProducts = cart.filter((cartP) => cartP.id !== product.id);
      exist.quantity = exist.quantity + 1;
      newCart = [...restProducts, exist];
    }
    setCart(newCart);
    addToDB(product.id);
    toast.success("Product Added  👍 ");
  };
  return (
    <div className="product-container">
      {data.map((product, i) => (
        <ProductCart
          key={i}
          product={product}
          handleAddToCart={handleAddToCart}
        ></ProductCart>
      ))}
    </div>
  );
};

export default Shop;
