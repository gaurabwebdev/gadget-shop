import { getDataFromDB } from "../Utilities/fakeDB";

export const selectedProduct = async () => {
  const res = await fetch("products.json");
  const data = await res.json();

  const savedCart = getDataFromDB();
  let cartProducts = [];
  if (savedCart) {
    for (const pId in savedCart) {
      const isExist = data.find((p) => p.id === pId);
      if (isExist) {
        isExist.quantity = savedCart[pId];
        cartProducts.push(isExist);
      }
    }
  }
  return { cartProducts, data };
};
