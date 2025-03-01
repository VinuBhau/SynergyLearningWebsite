import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import keyIcon from '/keyicon.svg';


const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      var email = localStorage.getItem("email");

      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok || data.output) {
        toast.success("Verified OTP successfully! Redirecting...");
        setTimeout(() => navigate("/reset-password"), 2000);
      } else {
        setMessage(data.error || "Invalid OTP.");
      }
    } catch (error) {
      setMessage("Failed to verify OTP. " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090707]">
      <div className="bg-[#030109] flex flex-col gap-5 border border-gray-700 h-[600px]  shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-md text-center transform transition-all ">
        
        <img src={SynergyIcon} height={117} width={117} className="self-center"/>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Verify your OTP
        </h1>
        
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 self-center">
                          <label className="text-sm font-medium self-start text-gray-300 mb-1">OTP</label>

                          <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                            {/* Left Icon Div */}
                            <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                              <img src= {keyIcon} className="w-7 h-7" />
                            </div>

                            {/* Input Field */}
                            <input
                              type="password"
                              placeholder="Enter OTP"
                              className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </div>
            
            </div>

            <button
                className="w-80 self-center bg-[#0A1CB9]  font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center"
              onClick={handleVerifyOtp}>
                Receive OTP
            </button>

            <Link
              to="/SignUp"
              className="text-[#0A1CB1] font-semibold"
            >
              Back to Verify Gmail
            </Link>
        </div>


        {message && (
          <p className="mt-4 text-red-500 text-sm font-semibold">{message}</p>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default VerifyOtp;
