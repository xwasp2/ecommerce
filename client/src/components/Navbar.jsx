import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const decodeUsername = () => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.username;
      }
      catch (err) {
        console.error("Invalid token", err);
      }
    }
  };

  const email = decodeUsername();

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
    };
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">🛍️ My Store</Link>

      <div className="flex items-center gap-4">

        <div className="relative">
          <Link to="/cart" className="text-lg" aria-label="View Cart">
            🛒
          </Link>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </div>
        {token &&
          (
            <>
              <span className="text-sm text-gray-300">
                {email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>

          )
        }


      </div>


    </nav>
  );
};

export default Navbar;
