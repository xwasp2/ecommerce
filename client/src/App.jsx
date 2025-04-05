import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // Order confirmation page
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <CartProvider> {/* Wrap everything inside CartProvider */}
      <Router>
        <div className="w-full min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="w-full max-w-7xl mx-auto p-6 flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
