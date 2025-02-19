
import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { BsFillCalendarDateFill } from 'react-icons/bs';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: null
    });

    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dateOfBirth: date
        });
    };

    const validate = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }


        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        } else if (formData.dateOfBirth >= new Date()) {
            errors.dateOfBirth = 'Date of birth cannot be in the future';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setAuthError('');

        try {
            const response = await axios.post('https://userd-backend.vercel.app/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setAuthError(error.response.data.message || 'Error registering user. Please try again.');
            } else {
                setAuthError('Server error. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-500 to-cyan-500">
            <div className="bg-gray-800 pb-8 px-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4 bg-cyan-500 text-white py-2 px-6 rounded hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 inline-block">
                        SIGN UP
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
                                type="text"
                                id="name"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <div className="relative flex items-center bg-gray-700 rounded">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <div className="pl-12 h-full w-px bg-gray-600"></div>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="relative mb-4">
                        <BsFillCalendarDateFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                        <DatePicker
                            selected={formData.dateOfBirth}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Date of Birth"
                            className="block w-full pl-12 p-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
                    </button>
                    <p className="text-gray-500 text-center mt-4">
                        Already have an account? <a href="/" className="text-cyan-300 hover:underline">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
