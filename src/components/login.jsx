
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redax/authslice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email format';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            if (res.data) {
                dispatch(setUser(res.data));
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/dashboard');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setAuthError('User not found. Please register first.');
            } else {
                console.error(err);
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-teal-500 to-cyan-500">
            <div className="bg-gray-800 pb-8 px-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4 bg-cyan-500 text-white py-2 px-6 rounded hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 inline-block">
                        SIGN IN
                    </h2>

                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        <img
                            src="https://www.shutterstock.com/image-vector/default-male-avatar-profile-icon-260nw-2312552191.jpg"
                            alt="Profile Icon"
                            className="object-cover h-full w-full"
                        />
                    </div>
                </div>
                {authError && <p className="text-red-500 text-center mb-4">{authError}</p>}
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="relative flex items-center bg-gray-700 rounded">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <div className="pl-12 h-full w-px bg-gray-600"></div>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <div className="relative flex items-center bg-gray-700 rounded">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <div className="pl-12 h-full w-px bg-gray-600"></div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-gray-300 text-sm">
                            <input type="checkbox" className="mr-2 accent-cyan-400" /> Remember me
                        </label>
                        <a href="#" className="text-sm text-cyan-300 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                        LOGIN
                    </button>


                    <p className="text-gray-500 text-center mt-4">
                        Don't have an account? <a href="/register" className="text-cyan-300">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
