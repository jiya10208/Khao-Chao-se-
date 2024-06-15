import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, removeItem, addItems } = useContext(CartContext);
  const { progress, hideCart, showCheckOut } = useContext(UserProgressContext);
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleHideCart() {
    hideCart();
  }
  function handleShowCheckout() {
    showCheckOut();
  }

  return (
    <Modal
      onClose={progress === "cart" ? handleHideCart : ""}
      className="cart"
      open={progress === "cart"}
    >
      <h1>Your Cart</h1>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            price={item.price}
            name={item.name}
            quantity={item.quantity}
            onIncrease={() => addItems(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal * 70)}</p>
      <p className="modal-action">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        {items.length > 0 ? (
          <Button onClick={handleShowCheckout}> Go to the Checkouts</Button>
        ) : (
          ""
        )}
      </p>
    </Modal>
  );
}
