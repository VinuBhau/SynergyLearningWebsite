// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuthContext = () => {
// 	return useContext(AuthContext);
// };



// import { createContext, useContext, useState, useEffect } from "react";

// // Create context
// export const AuthContext = createContext();

// // Hook to use the AuthContext
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// // Utility function to get cookie by name
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// };

// export const AuthContextProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null);

//   // Check if token is present in cookies on initial load
//   useEffect(() => {
//     const jwtToken = getCookie("jwt"); // Check for JWT token in cookies
//     if (jwtToken) {
//       setAuthUser(jwtToken); // If token exists, store it in the context
//     }
//   }, []);

//   return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
// };


import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Utility function to get cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
	const fetchToken = async () => {
	  try {
		const res = await axios.get("http://localhost:5000/api/getToken", {
		  withCredentials: true,
		});
		
		
		setAuthUser(res.data.token); // Set the token to your auth context or state
  
	  } catch (error) {
		console.error("Error fetching token:", error);
	  }
	};
  
	fetchToken(); // Call the async function

  }, []); // Empty dependency array ensures this runs once when the component mounts (on page reload)

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
