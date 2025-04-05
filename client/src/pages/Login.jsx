import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    if (token) {
        return <Navigate to="/" />;
    }
    
    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        try {
            console.log('inside try');
            const response = await axios.post('http://localhost:5000/login', { "email": email, "password": password });
            localStorage.setItem("token", response.data.token);
            setError('');
            navigate('/');
        }
        catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        };

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <input
                    className="border rounded p-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="border rounded p-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600">
                    Login
                </button>
                {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
            </form>
        </div>
    );

};

export default Login;