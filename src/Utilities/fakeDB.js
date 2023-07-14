// Add data to local storage
const addToDB = (id) => {
  let shoppingCart = {};
  //   Get previous data from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  //   add quantity
  const quantity = shoppingCart[id];
  if (quantity) {
    const newQty = quantity + 1;
    shoppingCart[id] = newQty;
  } else {
    shoppingCart[id] = 1;
  }

  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const getDataFromDB = () => {
  let shoppingCart = {};
  //   Get previous data from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
};

const deleteFromCart = (id) => {
  const cartData = localStorage.getItem("shopping-cart");
  if (cartData) {
    const presentCart = JSON.parse(cartData);
    if (id in presentCart) {
      delete presentCart[id];
      localStorage.setItem("shopping-cart", JSON.stringify(presentCart));
    }
  }
};

const clearStorage = () => {
  localStorage.clear();
};

export { addToDB, getDataFromDB, deleteFromCart, clearStorage };
