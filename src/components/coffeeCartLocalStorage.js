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
const deleteOneItemFromLocalStorage = _id => {
  const cart = getItem();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] === _id) {
      cart.splice(i, 1);
      console.log("nc: ", cart);
      saveCartToLocalStorage(cart);
      break;
    }
  }
};

const getTotalCartValue = () => {
  const val = localStorage.getItem("totalValue");
  console.log("vv :",val)
  if (val) {
    return parseInt(val);
  }
  return 0;
};
const addValueToLocalStorage = val => {
  let cartVal = getTotalCartValue();
  cartVal = parseInt(cartVal) + parseInt(val);
  saveTotalValue(cartVal);
};

const saveTotalValue = cartVal => {
  let valStringified = JSON.stringify(cartVal);
  localStorage.setItem("totalValue", valStringified);
};

const deleteValueFromTotalCart = val => {
  let totalVal = getTotalCartValue();
  if (totalVal - val >= 0) {
    totalVal -= val;
    saveTotalValue(totalVal);
  }
};

export {
  getItem,
  saveCartToLocalStorage,
  addItemToLocalStorage,
  deleteItemFromLocalStorage,
  deleteOneItemFromLocalStorage,
  addValueToLocalStorage,
  saveTotalValue,
  deleteValueFromTotalCart,
  getTotalCartValue
};
