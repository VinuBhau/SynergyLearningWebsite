
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import keyIcon from '/keyicon.svg';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("email");
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to reset password.");
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("An error occurred.");
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090707] px-4">
      <div className="w-full max-w-md bg-[#030109] flex flex-col gap-7 justify-center items-center text-white h-[600px] rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        

        <div className="flex flex-col gap-2 justify-center items-center">
            <img src={SynergyIcon}   height={117} width={117}/>

            <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        </div>

         {/* Password Field */}
        <div className="flex flex-col justify-center items-center gap-5">
          <label className="text-sm font-medium   text-gray-300 mb-1">Password</label>
          
          <div className="flex items-center  w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
            {/* Left Icon Div */}
            <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
              <img src= {keyIcon} className="w-7 h-7" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter your New Password"
              className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Send Reset Link Button */}
                <button
                    className="w-80 bg-[#0B02FF] self-center font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center"
                  onClick={handleResetPassword}>
                    Reset Password
                  </button>
        
                {/* Error Message */}
                {message && <p className="text-center text-red-400 mt-4">{message}</p>}
        
                {/* Links Section */}
                <div className="flex justify-center mt-6">
                  <Link
                    to="/forgot-password"
                    className="text-[#0A1CB1] font-semibold"
                  >
                    Back to Verify Gmail
                  </Link>
                </div>
      </div>

      <Toaster />
    </div>
  );
};

export default ResetPassword;

