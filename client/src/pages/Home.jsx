import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    //filtering products based on categories
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }


    //filtering products based on priceRange
    if (priceRange !== 'All') {
      const [minPrice, maxPrice] = priceRange.split("-");
      filtered = filtered.filter((product) => product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice));
    }

    //filtering products based on searchQuery
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(filtered);

  }, [searchQuery, products, selectedCategory, priceRange]);

  return (
    <div className="container mx-auto p-6">
      {/*Search and Filter section*/}
      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        {/*Search Bar*/}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3"
        />

        {/*Category filter*/}
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All Categories</option>
            <option value="Sports Equipment">Sports</option>
            <option value="Fitness">Fitness</option>
          </select>

          {/*Price filter */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All Prices</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-1500">₹1000 - ₹1500</option>
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
        {filteredProducts.map((product) => (
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
