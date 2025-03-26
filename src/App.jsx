import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import { useAuthContext } from './context/AuthContext';
import Login from './pages/Login/login';
import SignUp from './pages/SignUp/SignUp';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import VerifyOTP from './pages/verifyOtp/verifyGmailOtp';
import Courses from './Components/Courses';
import Notes from './Components/Notes';
import { useEffect, useState } from 'react';
import Sessions from './Components/Sessions';
import VerifyGmail from './pages/verifyOtp/verifyGmailOtp';  // Make sure this is correctly imported

function App() {
  const { authUser } = useAuthContext();

  

  return (
    <div className='top-0 left-0'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={authUser === null ? <Navigate to="/login" /> : <Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/Verify-Gmail' element={<VerifyGmail />} />
        <Route path='/verifyOTP' element={<VerifyOTP />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/courses' element={authUser === null ? <Navigate to="/login" /> : <Courses />} />
        <Route path='/notes' element={authUser === null ? <Navigate to="/login" /> : <Notes />} />
        <Route path='/sessions' element={authUser === null ? <Navigate to="/login" /> : <Sessions />} />
      </Routes>
    </div>
  );
}

export default App;
