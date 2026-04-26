import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router'
import Signup from './features/signup/Signup'
import Login from './features/login/Login'
import ForgotPassword from './features/reset-password/ForgotPassword'
import ResetPassword from './features/reset-password/ResetPassword'
import VerifyEmail from './features/verify/VerifyEmail'
import Dashboard from './features/dashboard/Dashboard'
import Home from './Home'
import Endpoints from './Endpoints'
import ProtectedRoute from './ProtectRoute'
import { useSelector } from 'react-redux'



const App = () => {
  const {isAuthenticated, user} = useSelector(state=>state.user)

  const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

  const RedirectRoute = ({children})=>{
    if(isAuthenticated){
      return <Navigate to='/dashbooard' replace/>
    }
    return children
  }

  const titles = {
    "/": "Authentication",
    "/signup": "Signup",
    "/login": "Login",
    "/forgot-password": "Forgot Password",
    "/reset-password" : "Reset Password",
    "/dashboard" : "Dashboard",
    "/verify": "Verify"
  }

  document.title = `${titles[location.pathname]}  |  Authentication` || "Authentication App"
  
  return (
  <Routes>
    <Route path="/" element={<Home />} />

    {/* Reroute user to dashboard if they're authenticated 
     if they try to access login or signup */}

    <Route path='/signup' element={
      <RedirectRoute>
        <Signup />
      </RedirectRoute>
    } />
    <Route path='/login' element={
      <RedirectRoute>
        <Login />
      </RedirectRoute>
    } />

    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/reset-password/:token' element={<ResetPassword />} />
    <Route path='/verify' element={<VerifyEmail />} />
    <Route path='/endpoints' element={<Endpoints />} />

    {/* Dashboard - Protected Route */}

    <Route path='/dashboard' element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />

    {/* Catch all undefined routes */}
    <Route path='*' element={<Home/>} />

  </Routes>
  )
}

export default App
