import React, { useContext } from "react";
import {
  clearStorage,
  deleteFromCart,
  getDataFromDB,
} from "../Utilities/fakeDB";
import { Link, useLoaderData } from "react-router-dom";
import CartItem from "./Cards/CartItem";
import { CartContext } from "../App";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  let total = 0;
  if (cart.length > 0) {
    for (const product of cart) {
      total = total + product.price * product.quantity;
    }
  }

  const handleCartRemoval = (id) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);
    deleteFromCart(id);
    toast.error("Product Removed  😒 ");
  };

  const handleStorageRemoval = () => {
    clearStorage();
    setCart([]);
    toast.error("All Products Removed  😒 ");
  };

  const orderHandler = () => {
    if (cart.length > 0) {
      setCart([]);
      clearStorage();
      return toast.success("Order Placed 👍");
    }
  };

  console.log(cart);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 justify-start items-center text-gray-900 pt-3">
      <div className="flex flex-col max-w-xl p-4 sm:p-8 space-y-2 mt-3">
        <h2 className="text-2xl font-bold">
          {cart.length ? "Review Cart Items" : "Cart Is Empty"}
        </h2>
        <ul className="flex flex-col divide-y-2 divide-gray-600">
          {cart.map((cartProduct) => (
            <CartItem
              key={cartProduct.id}
              product={cartProduct}
              handleCartRemoval={handleCartRemoval}
            ></CartItem>
          ))}
        </ul>
        {cart.length > 0 ? (
          <p className="text-lg font-semibold text-right">
            Total:
            <span className="ml-2">${total}</span>
            <span className="block">excluding tax</span>
          </p>
        ) : (
          " "
        )}
        <div className="flex justify-end space-x-2">
          {cart.length > 0 ? (
            <>
              <button onClick={handleStorageRemoval} className="btn-outlined">
                Clear Cart
              </button>
              <button onClick={orderHandler} className="btn-primary">
                Place Order
              </button>
            </>
          ) : (
            <Link to={"/"} className="btn-outlined">
              Back To Shop
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
