import { useContext } from "react";
import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  function handleShowCart() {
    showCart();
  }
  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="😋" />
        <h1>Khao Chao se</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          {" "}
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
