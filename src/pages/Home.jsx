import React from "react";
import { Link } from "react-router-dom";

// Sample product data
const products = [
  { id: 1, name: "Ball", price: 299, image: "/images/ball.jpeg" },
  { id: 2, name: "Bat", price: 499, image: "/images/bat.jpeg" },
  { id: 3, name: "Gloves", price: 699, image: "/images/gloves.jpeg" },
];

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="block mt-3 bg-blue-500 text-white p-2 text-center rounded-md"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
