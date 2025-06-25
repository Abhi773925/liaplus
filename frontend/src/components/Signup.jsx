import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!["user", "admin"].includes(formData.role)) newErrors.role = "Please select a valid role.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://liaplus.onrender.com/api/users/createuser",
        formData
      );
      if (response.status === 200) {
        alert("User created successfully!");
        setFormData({ name: "", email: "", role: "", password: "" });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Email already exists. Please use a different one.");
      } else {
        alert(error?.response?.data?.message || "Error creating user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg focus:outline-none ${errors.role ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`}
            required
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              loading ? "bg-blue-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-200`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
