import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const verifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Get the email passed from signup

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("No email provided. Please sign up again.");
      return navigate("/signup");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://liaplus.onrender.com/api/users/verify-otp",
        { email, otp }
      );

      if (res.status === 200) {
        alert("OTP verified successfully! You can now log in.");
        navigate("/login"); // Go to login page after successful verification
      }
    } catch (error) {
      alert(error?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Verify OTP</h2>
        <p className="text-center mb-4 text-gray-600">
          An OTP was sent to <span className="font-medium">{email}</span>. Please enter it below.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-200`}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Didn’t receive OTP?</p>
          <button
            onClick={() => alert("Resend OTP functionality not yet implemented")}
            className="text-blue-600 font-medium hover:underline"
          >
            Resend OTP
          </button>
        </div>

        <div className="text-center mt-6">
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Back to Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default verifyOtp;
