import React, { createContext, useState, useContext } from "react";

// 1. Create the CartContext
export const CartContext = createContext();

// 2. Create the useCart hook to use the context
export const useCart = () => useContext(CartContext);

// 3. Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 4. Function to add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 5. Function to remove item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 6. Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
