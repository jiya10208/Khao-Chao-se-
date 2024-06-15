import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItems: (item) => {},
  removeItem: (id) => {},

  clearCart: () => {},
});
function cartReducer(state, action) {
  if (action.type === "Add_Item") {
    //  check if already exist
    const existingCartItemIndex = state.items.findIndex(
      (el) => el.id === action.item.id
    );
    const updatedItems = [...state.items];

    //  if the element already exist increase the quantity
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    //  if doesnt exist then add to it
    else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    //... update the state to add a meal item
    if (action.type === "CLEAR_CART") {
      return { ...state, items: [] };
    }

    return { ...state, items: updatedItems };
  }

  //    for removing an item from the list

  if (action.type === "Remove_Item") {
    //  find the index of the item
    const existingCartItemIndex = state.items.findIndex(
      (el) => el.id === action.id
    );
    //  existing item
    const existingItem = state.items[existingCartItemIndex];

    const existingItemQuantity = existingItem.quantity;

    //  if the quantity is greater than one then we want to reduce the quantity. else we will delete the item.

    const updatedItems = [...state.items];
    if (existingItemQuantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.splice(existingCartItemIndex, 1);
    }

    //... update the state to add a meal item
    return { ...state, items: updatedItems };
  }
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItems(item) {
    dispatchCartAction({ type: "Add_Item", item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "Remove_Item", id: id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItems,
    removeItem,
    clearCart,
  };
  console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
