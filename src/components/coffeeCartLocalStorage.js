const getItem = () => {
  const storedItems = localStorage.getItem("coffeeCart");
  if (storedItems) {
    return JSON.parse(storedItems);
  }
  return [];
};

const addItemToLocalStorage = _id => {
  const cart = getItem();
  cart.push(_id);
  saveCartToLocalStorage(cart);
};
const saveCartToLocalStorage = cart => {
  const cartStringified = JSON.stringify(cart);
  localStorage.setItem("coffeeCart", cartStringified);
};
const deleteItemFromLocalStorage = _id => {
  const cart = getItem();
  // const _id = _id;
  const updatedCart = cart.filter(eachItem => eachItem !== _id);
  saveCartToLocalStorage(updatedCart);
};
export {
  getItem,
  saveCartToLocalStorage,
  addItemToLocalStorage,
  deleteItemFromLocalStorage,
};
