import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify"; // Import toast for notifications

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  // State to hold product data
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data from the public/data/products.json file
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the product that matches the id
        const foundProduct = data.find((p) => p.id === Number(id));
        setProduct(foundProduct); // Set the product in state
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]); // This effect runs when the `id` changes

  // If the product is not found or still loading
  if (!product) {
    return <h2 className="text-center text-red-500">Product not found</h2>;
  }

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-1/2 md:w-1/3 h-auto object-cover rounded-lg"
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-600 mt-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Rating:</strong> {product.rating} / 5
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Stock:</strong> {product.stock} available
            </p>
            <p className="text-2xl font-semibold mt-4">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
