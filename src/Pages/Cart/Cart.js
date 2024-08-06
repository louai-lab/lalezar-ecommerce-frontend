import React, { useContext } from "react";
import CardItem from "../../Components/CardItem/CardItem.js";
import CardCheckout from "../../Components/CardCheckout/CardCheckout.js";
import Style from "./Cart.module.css";
import { useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext.js";
import { ToastContainer, toast } from "react-toastify";
import { useLanguage } from "../../Utils/LanguageContext.js";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { language } = useLanguage();

  const calculateTotalPrice = (items) => {
    let totalPriceAll = 0;
    items.forEach((item) => {
      const totalPriceProduct = parseFloat(item.totalPrice);
      if (!isNaN(totalPriceProduct)) {
        totalPriceAll += totalPriceProduct;
      }
    });
    return totalPriceAll;
  };

  const { decreaseCartItemCount } = useContext(CartContext);

  useEffect(() => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(currentItems);

    const totalPriceAll2 = calculateTotalPrice(currentItems);
    setTotalPrice(totalPriceAll2);
  }, [cartItems]);

  const handleDeleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    toast.success(
      language === "en"
        ? `Items removed from your cart`
        : `تمت إزالتها من سلة التسوق الخاصة بك`
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    const totalPriceAll2 = calculateTotalPrice(updatedItems);
    setTotalPrice(totalPriceAll2);
    decreaseCartItemCount();
    setCartItems(cartItems - 1);
  };

  return (
    <div className={Style.main}>
      <ToastContainer />
      <div className={Style.pageWrapper}>
        <div className={Style.cardContainer}>
          {cartItems &&
            cartItems.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                name={item.name}
                name_AR={item.name_AR}
                quantity={item.quantity}
                slug={item.slug}
                // color={item.color}
                image={item.image}
                price={item.price}
                onDelete={() => handleDeleteItem(item.id)}
                totalPrice={totalPrice}
                cartItems={cartItems}
                setTotalPrice={setTotalPrice}
                calculateTotalPrice={calculateTotalPrice}
              />
            ))}
        </div>
        <div className={Style.checkoutContainer}>
          <CardCheckout
            setCartItems={setCartItems}
            cartItems={cartItems}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}
