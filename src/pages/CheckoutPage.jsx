import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";  // Import the hook

const CheckoutPage = () => {
  const { cart, clearCart } = useCart(); // Access cart state and actions
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission and order processing
    setTimeout(() => {
      console.log("Order submitted:", formData);
      console.log("Cart Items:", cart);

      // Clear the cart after order submission
      clearCart();

      // Redirect to order confirmation page
      navigate("/order-confirmation");
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Complete Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
