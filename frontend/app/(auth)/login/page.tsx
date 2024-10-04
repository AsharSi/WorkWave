"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 p-6 bg-white shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        <label className="mb-4">
          <span className="block text-gray-700">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <label className="mb-6">
          <span className="block text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </label>
        <button
          type="submit"
          className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 mb-4"
        >
          Login
        </button>
        <button
          type="button"
          className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
