import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import gmailIcon from '/gmail-removebg-preview 1.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok || data.output) {
        toast.success("OTP sent successfully! Check your mail.");
        localStorage.setItem("email", email);

        // Redirect to verify-otp page after delay
        setTimeout(() => navigate("/verifyOTP"), 1500);
      } else {
        setMessage(data.error || "Something went wrong.");
        toast.error(data.error || "Failed to send reset link.");
      }
    } catch (error) {
      setMessage("Failed to send password reset link.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090707] px-4">
      <div className="w-full max-w-lg bg-[#030109] h-[600px] justify-center items-center flex flex-col gap-10 text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700">
        
        <div className="flex flex-col justify-center items-center gap-2 ">
            <img src={SynergyIcon}  height={117} width={117}/>

            <h2 className="text-2xl font-semibold text-center mb-8 tracking-wide">
              Forgot Password?
            </h2>
        </div>

        {/* Gmail Field */}
        <div className="flex flex-col justify-center items-center gap-5">
          <label className="text-sm font-medium self-start  text-gray-300 mb-1">Gmail</label>
          
          <div className="flex items-center self-start  w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
            {/* Left Icon Div */}
            <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
              <img src= {gmailIcon} className="w-7 h-7" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter your Gmail"
              className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>


        {/* Send Reset Link Button */}
        <button
            className="w-80 bg-[#0B02FF] self-center font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center"
          onClick={handleForgotPassword}>
            Reset Password
          </button>

        {/* Error Message */}
        {message && <p className="text-center text-red-400 mt-4">{message}</p>}

        {/* Links Section */}
        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="text-[#0A1CB1] font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      <Toaster position="top-center" />
    </div>
  );
};

export default ForgotPassword;
