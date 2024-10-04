"use client"
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleSendOtp = async () => {
        // Send OTP to the email address
        console.log('Sending OTP to:', email);
        setIsOtpSent(true);
    };

    const handleVerifyOtp = async () => {
        // Verify the OTP
        console.log('Verifying OTP:', otp);
        setIsVerified(true);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isVerified) {
            // Handle registration logic here
            console.log('Email:', email);
            console.log('Password:', password);
        } else {
            console.log('Please verify your email first.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={handleSendOtp} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        Send OTP
                    </button>
                </div>
                {isOtpSent && (
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="button" onClick={handleVerifyOtp} className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
                            Verify OTP
                        </button>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;