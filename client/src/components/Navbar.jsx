import React, { useContext, useState } from "react";
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
              <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold cursor-pointer"
                onClick={toggleSidebar}
              >
                {email?.[0]?.toUpperCase()}
              </span>
            </>

          )
        }

        {
          isSidebarOpen &&
          (
            <>
              {/* Backdrop */}
              <div
                className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ease-in-out ${isSidebarOpen ? "opacity-30 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar */}

              <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 z-50 transform transition-transform duration-700 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                    Your Account
                  </h2>

                  <button
                    className="text-gray-500 hover:text-gray-700 text-2xl font-light"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close sidebar"
                  >
                    &times;
                  </button>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <h3 className="text-lg font-medium text-gray-900 break-words">{email}</h3>
                </div>

                <hr className="border-gray-300 mb-6" />

                <div className="flex flex-col justify-end h-[60%]">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>

              </div>
            </>

          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
