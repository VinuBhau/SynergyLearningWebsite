
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import gmailIcon from '/gmail-removebg-preview 1.svg';
import keyIcon from '/keyicon.svg';
import { useAuthContext } from "../../context/AuthContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingVal,setLoadingVal] = useState(0)

  // const { loading, login } = useLogin();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {

    setLoadingVal(1)
    e.preventDefault();
    try {

			console.log(username+" "+password)

			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
        credentials:"include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			console.log(res.data)

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

      setTimeout(()=>{
        setLoadingVal(0)
      },500)

			
			toast.success('Logged In Successfully!')
      navigate("/");

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);

		} catch (error) {
			toast.error(error.message);
      setLoadingVal(0)
		} 
    
  };

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-[#090707] px-4">
       {loadingVal ?
          <div className="fixed top-5 transform z-50  p-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideDown">
            <div className="text-lg text-white font-medium">Loading</div>
            <div className="flex items-center justify-center space-x-2">
              <PulseLoader color="#36d7b7" size={10} margin={2} />
            </div>
          </div>
          : null}



      <div className="w-full max-w-md z-10 bg-[#030109] text-white flex flex-col gap-10 justify-center items-center rounded-2xl shadow-lg p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        
        <div className="flex flex-col gap-2 justify-center items-center ">
            <img src={SynergyIcon} height={117} width={117}/>
            
            <h2 className="text-xl w-[400px] font-bold text-center mb-6">
              Welcome to <span className="text-[#0B02FF]">Synergy Learning</span>{" "}
              
            </h2>

            <h2 className="text-base w-[400px] font-normal text-center mb-6">
              Keep Learning and growing with Synergy
            </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7 items-center justify-center">
          

          <div className="flex flex-col gap-5">
            <label className="text-sm font-medium text-gray-300 mb-1">Email</label>
            
            <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
              {/* Left Icon Div */}
              <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                <img src= {gmailIcon} className="w-7 h-7" />
              </div>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter your Gmail"
                className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>


          {/* Password Input */}
          <div className="flex flex-col gap-5">
            <label className="text-sm font-medium text-gray-300 mb-1">Password</label>
            
            <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
              {/* Left Icon Div */}
              <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
                <img src= {keyIcon} className="w-7 h-7" />
              </div>

              {/* Input Field */}
              <input
                type="password"
                placeholder="Enter your Password"
                className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>


          {/* Forgot Password & Signup Links */}
          <div className="self-start text-sm">
            
            <Link
              to="/forgot-password"
              className="text-[#0A1CB1] font-semibold"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-[#0B02FF]  font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center"
          >
            Login
          </button>

          <Link
              to="/signup"
              className="text-white "
            >
              Don't have an account? <span className="text-[#0A1CB1] font-semibold" >Sign Up</span> 
            </Link>
        </form>

       


        <Toaster />
      </div>
    </div>
  );
};

export default Login;

