import React, { useState } from 'react'
import { Link } from 'react-router'
import { sendPasswordLink, setError, clearError } from './forgotPasswordSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../UX/Loader'

const ForgotPassword = () => {
   const { message, status, error} = useSelector(state=> state.forgotPassword)
   const dispatch = useDispatch()
   const [email, setEmail] = useState('')

   const handleSubmit = (e) =>{
      e.preventDefault()

      if(!email){
        return dispatch(setError("Provide your email"))
      }

      dispatch(sendPasswordLink({email:email}))

   }
  return (
     <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Forgot your password?
          </h1>
          <p className="text-gray-600">
            Enter your email and we’ll send you a reset link
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm"
        >

          {/* Email */}
          <input
            className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:border-green-900"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* Message */}
          {message && (
            <p className="text-green-900 text-sm mb-3 text-center font-bold">
              {message}
            </p>
          )}

          {/* Button */}
          <button
            className="w-full bg-neutral-900 hover:bg-green-800 text-white font-medium py-3 rounded-xl cursor-pointer h-13"
            type="submit"
          >
            {status === 'loading' ? <Loader /> : 'Send reset link'}
          </button>
          {/* Back to Login */}
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-green-900 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ForgotPassword
