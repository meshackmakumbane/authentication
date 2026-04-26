import React, { useState } from 'react'
import Loader from '../../UX/Loader'
import { resetPassword, setError, clearError } from './resetPasswordSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  const { token } = useParams()
   const { message, status, error } = useSelector(state=> state.resetPassword)
   const dispatch = useDispatch()

   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)

   const handleSubmit = (e)=>{
      e.preventDefault()
      const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
 
      if(!password ){
         return dispatch(setError("All fields must be filled"))     
      }

      if(!checkPassword.test(password)){
         return (setError("Need uppercase, lowercase, number and symbol @$!%*?&"))
      }

      if(password.length < 8){
         return dispatch(setError("Password must be at least 8 characters"))
      }

      if(password !== confirmPassword){
         return dispatch(setError("Password do not match!"))

      }

      dispatch(resetPassword({token, password}))
   }

  return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Create a new secure password for your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm"
        >

          {/* Password */}
          <div className="flex items-center border rounded-xl mb-3 pr-3">
            <input
              className="w-full p-3 focus:outline-none focus:bg-transparent"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="New password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="text-sm text-green-900 cursor-pointer font-bold"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password */}
          <input
            className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:border-green-900"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* Error */}
          {message && (
            <p className="text-green-900 text-sm mb-3 text-center">
              {message}
            </p>
          )}

          {/* Button */}
          <button
            className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-3 rounded-xl cursor-pointer h-13"
            type="submit"
          >
            {status === 'loading' ? <Loader /> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
