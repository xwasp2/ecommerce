import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p>Your order has been successfully placed.</p>
      <p>We will send you an email confirmation with shipping details soon.</p>

      <Link to="/" className="mt-6 inline-block bg-blue-500 text-white p-2 rounded-md">
        Go back to Home
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
