import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const url = "http://localhost:3000/orders";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { progress, hideCheckOut } = useContext(UserProgressContext);
  const { items, clearCart } = useContext(CartContext);

  const {
    data,
    loading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(url, requestConfig);

  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleClose() {
    hideCheckOut();
  }
  function handleFinish() {
    hideCheckOut();
    clearCart();
    clearData();
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      {" "}
      <Button type="button" textOnly onClick={handleClose}>
        {" "}
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending)
    actions = <span className="center">sending the order data..</span>;

  if (data && data.length != 0 && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>your order was submitted successfully</p>
        <p>We will get back to you</p>
        <Button type="button" textOnly onClick={handleFinish}>
          {" "}
          Close
        </Button>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total Amount:{currencyFormatter.format(totalAmount * 70)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />{" "}
        <Input label="Street" type="text" id="street" />{" "}
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />{" "}
          <Input label="City" type="text" id="city" />{" "}
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
