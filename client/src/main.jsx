import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css"; // Import the index.css file here
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';


// Initialize the root of the app
createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
    <ToastContainer /> {/* Toast container to show notifications */}
  </CartProvider>
);
