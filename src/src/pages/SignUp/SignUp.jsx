


import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import GenderCheckbox from "./GenderCheckBox";
import gmailIcon from '/gmail-removebg-preview 1.svg';
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import keyIcon from '/keyicon.svg';
import userIcon from '/user.svg';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  
  const [gmailVerified, setGmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [gmailValue, setGmailValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [genOtp, setGenOtp] = useState("");

  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const verifyOtp = () => {
    if (otpValue === genOtp) {
      toast.success("OTP Verified");
      setOtpVerified(true);
    } else {
      toast.error("Invalid OTP");
      setOtpVerified(false);
      setGmailVerified(false);
    }
  };

  const verifyGmail = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/Verify-Gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GmailValue: gmailValue }),
      });

      const data = await response.json();
      if (data.otp) {
        setGenOtp(data.otp);
        toast.success("OTP sent successfully!");
        setGmailVerified(true);
      } else {
        toast.error(data.error || "Invalid OTP.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. " + error.message);
    }
  };


  const handleSubmit = async (e) => {


    
    e.preventDefault();
    try {

      var fullName = inputs.fullName
      var username = inputs.username
      var password = inputs.password
      var confirmPassword = inputs.confirmPassword
      var gender = inputs.gender


			const res = await fetch("http://localhost:5000/api/auth/signup", {
				method: "POST",
        credentials:"include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

      setAuthUser(data.token);
      navigate("/");
			toast.success('Signed Up Successfully !')
		} catch (error) {

			toast.error(error.message);
		} 

    

  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090707]">
    

        <form onSubmit={handleSubmit} className=" h-96 flex justify-center items-center  ">


              {!gmailVerified ? (

              <div className="w-full justify-center items-center h-[600px] flex flex-col gap-5 max-w-lg  bg-[#030109] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
                      
              <img src={SynergyIcon} height={117} width={117}/>

                
                <div className="flex flex-col  gap-10 justify-center items-center">
                  <h2 className="text-3xl font-bold text-center mb-6">
                    Verify Gmail
                  </h2>
                    <div className="flex flex-col gap-5">
                              
                              
                              <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                                {/* Left Icon Div */}
                                <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                </svg>
                                </div>

                                {/* Input Field */}
                                <input
                                  type="text"
                                  placeholder="Enter your Gmail"
                                  className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                                  value={gmailValue}
                                  onChange={(e) => setGmailValue(e.target.value)}
                                />
                              </div>
                    </div>
                  
                  <button
                    onClick={verifyGmail}
                    className="w-80 bg-[#0A1CB9]   font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white mt-3"
                  >
                    Verify Gmail
                  </button>

                  <div className="self-center text-sm">

                <Link
                  to="/login"
                  className="text-[#0A1CB1] text-base font-bold"
                >
                  Back to Login
                </Link>
                </div>
              </div>
              </div>
              ) : !otpVerified ? (
              <div className="w-full justify-center items-center h-[600px] flex flex-col gap-5 max-w-lg  bg-[#090707] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">

                <img src={SynergyIcon} height={117} width={117}/>
                <div className="flex flex-col  gap-10 justify-center items-center">
                  <h2 className="text-3xl font-bold text-center mb-6">
                    Verify your OTP
                  </h2>
                    <div className="flex flex-col gap-5">
                              <label className="text-sm font-medium text-gray-300 mb-1">OTP</label>
                              
                              <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                                {/* Left Icon Div */}
                                <div className="bg-[#0F0C0C] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                                  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                </svg>
                                </div>

                                {/* Input Field */}
                                <input
                                  type="text"
                                  placeholder="Enter your OTP"
                                  className="flex-1 p-3 bg-[#0F0C0C] text-white outline-none  rounded-r-3xl"
                                  value={otpValue}
                                  onChange={(e) => setOtpValue(e.target.value)}
                                />
                              </div>
                            </div>

                  <button
                    onClick={verifyOtp}
                    className="w-80 bg-[#0A1CB9]   font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white mt-3"
                  >
                    Confirm OTP
                  </button>

                  <div className="self-center text-sm">
                
                <Link
                  to="/login"
                  className="text-[#0A1CB1] font-semibold"
                >
                  Back to Login
                </Link>
                </div>
              </div>
              </div>
              ) :(

            <div className="w-full justify-center items-center h-[750px] flex flex-col gap-5 max-w-lg  bg-[#030109] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
            
                <img src={SynergyIcon} height={117} width={117}/>


                <div className="flex flex-col gap-10 ">

                  <h1 className="text-lg text-white text-center font-semibold">Sign Up</h1>

                  <div className="flex flex-col gap-3">

                            
                            <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                              {/* Left Icon Div */}
                              <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                                <img src= {userIcon} className="w-7 h-7" />
                              </div>

                              {/* Input Field */}
                              <input
                                type="text"
                                placeholder="Enter your Username"
                                className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                                value={inputs.fullName}
                                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                              />
                            </div>
                  </div>

                  <div className="flex flex-col gap-3">

                            
                            <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                              {/* Left Icon Div */}
                              <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                              </svg>
                              </div>
                
                              {/* Input Field */}
                              <input
                                type="text"
                                placeholder="Enter your Gmail"
                                className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                                value={inputs.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                              />
                            </div>
                  </div>
                

                  <div className="flex flex-col gap-3">
                            
                            
                            <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                              {/* Left Icon Div */}
                              <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                              </svg>
                              </div>
                
                              {/* Input Field */}
                              <input
                                type="password"
                                placeholder="Enter your Password"
                                className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                              />
                            </div>
                  </div>
                  

                  <div className="flex flex-col gap-3">
                            
                            
                            <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
                              {/* Left Icon Div */}
                              <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                              </svg>
                              </div>

                              {/* Input Field */}
                              <input
                                type="password"
                                placeholder="Enter Confirm Password"
                                className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                                value={inputs.confirmPassword}
                                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                              />
                            </div>
                  </div>

                  <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                  

                  <button
                className="w-full bg-[#0A1CB9]  font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center"
              >
                Sign Up
              </button>

              <div className="flex justify-between mb-5 self-center items-center text-sm ">
                    <Link to="/login" className="text-[#0A1CB9] font-semibold  transition">
                      Already have an account?
                    </Link>
              </div>

                </div>
              </div>
          )}
        </form>

        <Toaster />
      </div>
    // </div>
  );
};

export default SignUp;

// {!gmailVerified ? (

//   <div className="w-full justify-center items-center h-[600px] flex flex-col gap-5 max-w-lg  bg-[#090707] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
          
//   <img src={SynergyIcon} height={117} width={117}/>

    
//     <div className="flex flex-col  gap-10 justify-center items-center">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         Verify Gmail
//       </h2>
//         <div className="flex flex-col gap-5">
//                   <label className="text-sm font-medium text-gray-300 mb-1">Email</label>
                  
//                   <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
//                     {/* Left Icon Div */}
//                     <div className="bg-[#0F0C0C] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
//                       <img src= {gmailIcon} className="w-7 h-7" />
//                     </div>
      
//                     {/* Input Field */}
//                     <input
//                       type="text"
//                       placeholder="Enter your Gmail"
//                       className="flex-1 p-3 bg-[#0F0C0C] text-white outline-none  rounded-r-3xl"
//                       value={gmailValue}
//                       onChange={(e) => setGmailValue(e.target.value)}
//                     />
//                   </div>
//         </div>
      
//       <button
//         onClick={verifyGmail}
//         className="w-80 bg-[#0A1CB9]   font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white mt-3"
//       >
//         Verify Gmail
//       </button>

//       <div className="self-center text-sm">
    
//     <Link
//       to="/login"
//       className="text-[#0A1CB1] font-semibold"
//     >
//       Back to Login
//     </Link>
//     </div>
//   </div>
//  </div>
//   ) : !otpVerified ? (
//   <div className="w-full justify-center items-center h-[600px] flex flex-col gap-5 max-w-lg  bg-[#090707] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">

//     <img src={SynergyIcon} height={117} width={117}/>
//     <div className="flex flex-col  gap-10 justify-center items-center">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         Verify your OTP
//       </h2>
//         <div className="flex flex-col gap-5">
//                   <label className="text-sm font-medium text-gray-300 mb-1">OTP</label>
                  
//                   <div className="flex  items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
//                     {/* Left Icon Div */}
//                     <div className="bg-[#0F0C0C] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
//                       <img src= {keyIcon} className="w-7 h-7" />
//                     </div>

//                     {/* Input Field */}
//                     <input
//                       type="text"
//                       placeholder="Enter your OTP"
//                       className="flex-1 p-3 bg-[#0F0C0C] text-white outline-none  rounded-r-3xl"
//                       value={otpValue}
//                       onChange={(e) => setOtpValue(e.target.value)}
//                     />
//                   </div>
//                 </div>
      
//       <button
//         onClick={verifyOtp}
//         className="w-80 bg-[#0A1CB9]   font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white mt-3"
//       >
//         Confirm OTP
//       </button>

//       <div className="self-center text-sm">
    
//     <Link
//       to="/login"
//       className="text-[#0A1CB1] font-semibold"
//     >
//       Back to Login
//     </Link>
//     </div>
//   </div>
// </div>
//   ) :