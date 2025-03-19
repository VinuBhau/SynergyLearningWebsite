
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAuthContext } from "../../context/AuthContext";
import SynergyIcon from '/SynergyLogo-removebg-preview 1.svg';
import gmailIcon from '/gmail-removebg-preview 1.svg';
import keyIcon from '/keyicon.svg';
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

			

			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
        credentials:"include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});


			

      if (res.status === 200) {

        setTimeout(()=>{
          setLoadingVal(0)
        },500)
        
        const data = await res.json();
        
        // Store the token in the context and in cookies
        setAuthUser(data.token); // Store the token in the context
  
        // Optionally, store it in cookies for persistence across sessions
        document.cookie = `jwt=${data.token}; path=/; max-age=3600; Secure; HttpOnly; SameSite=Strict`;
  
        toast.success('Logged In Successfully!');
        navigate("/"); // Navigate to the home page after login
      }

      if(res.status === 400){
        setLoadingVal(0)
        toast.error("Invalid username or password");
      } 
			
    
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



      <div className="w-full max-w-md z-10 bg-[#030109] text-white flex flex-col gap-7 justify-center items-center rounded-2xl shadow-lg p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        
        <div className="flex flex-col gap-2 justify-center items-center ">
            <img src={SynergyIcon} height={117} width={117}/>
            
            <h2 className="text-2xl w-[250px] font-bold text-center mb-6">
              Welcome back to <span className="text-[#023dff] text-3xl">Synergy Learning</span>{" "}
              
            </h2>

            <h2 className="text-lg w-[400px] font-semibold text-center mb-6">
              Keep Learning and growing with Synergy
            </h2>


        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 items-center justify-center">
          

          <div className="flex flex-col gap-5">
            {/* <label className="text-sm font-medium text-gray-300 mb-1">Email</label> */}

            <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-5">
            {/* <label className="text-sm font-medium text-gray-300 mb-1">Password</label> */}

            <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>


          {/* Forgot Password & Signup Links */}
          <div className="self-start text-base">
            
            <Link
              to="/forgot-password"
              className="text-[#023dff]  font-bold"
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
              Don't have an account? <span className="text-[#023dff] font-bold" > Sign Up</span> 
            </Link>
        </form>

       


        <Toaster />
      </div>
    </div>
  );
};

export default Login;

