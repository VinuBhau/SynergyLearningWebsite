
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import { useAuthContext } from './context/AuthContext'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/SignUp'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/resetPassword/ResetPassword'
import VerifyOTP from './pages/verifyOtp/verifyGmailOtp'
import Courses from './Components/Courses'
import Notes from './Components/Notes'
import { useState } from 'react'


function App() {

  const { authUser } = useAuthContext()

  const [SubjectNumber,setSubjectNumber] = useState(0);
  const [Sem,setSem] = useState(0);


  return (
    
    <div className='top-0 left-0 '  >
      <Routes>
        <Route path = '/login' element = {<Login/>}/>
        <Route path='/' element = { authUser == null? <Login/> : <Home/>} />
        <Route path = '/signup' element = {<SignUp/>}/>
        <Route path = '/reset-password' element = {<ResetPassword/>}/>
        <Route path='/Verify-Gmail' element = { <verifyGmail/>} /> 
        <Route path='/verifyOTP' element = { <VerifyOTP/>} />
        <Route path='/forgot-password' element = { <ForgotPassword/>} />
        <Route path='/courses' element = { authUser == null? <Login/> : <Courses  />} />
        <Route path='/notes' element = { authUser == null? <Login/> : <Notes   />} />


      </Routes>
    </div>
  )
}

export default App
