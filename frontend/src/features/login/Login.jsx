import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { loginUser, clearError } from "../auth/authSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Loader from '../../UX/Loader'

const Login = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { status, isAuthenticated, error } = useSelector((state) => state.auth)
   const [showPassword, setShowPassword] = useState(false)
   const [formInput, setFormInput] = useState(
   {
      email: "",
      password: ""
   })

   const handleChange = (e)=>{
      const { name, value } = e.target
      setFormInput({...formInput, [name]:value})
   }

   const handleSubmit = (e) =>{
      e.preventDefault()

      if(!formInput.email || !formInput.password){
         dispatch(setError("Provide login credentials"))
         setTimeout(()=>{
          dispatch(clearError())
         },3000)
         return
      }
      dispatch(loginUser(formInput))

      if(status === 'succeeded' && isAuthenticated){
        navigate('/dashboard', { replace: true })
      }
   }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Log into your account
          </h1>
          <p className="text-gray-600">
            Access your dashboard securely
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
            value={formInput.email}
            placeholder="Email address"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="flex items-center border rounded-xl mb-3 pr-3">
            <input
              className="w-full p-3 focus:outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formInput.password}
              placeholder="Password"
              onChange={handleChange}
            />

            <span
              className="text-sm text-green-900 cursor-pointer font-bold"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            className="w-full bg-neutral-800 hover:bg-green-800 text-white font-medium py-3 rounded-xl cursor-pointer h-13"
            type="submit"
          >
            {status === 'loading' ? <Loader/> : 'Sign in'}
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 space-y-2">

          <p>
            Don't have an account?{" "}
            <Link className="text-green-900 font-medium" to="/signup">
              Signup
            </Link>
          </p>

          <p>
            Forgot password?{" "}
            <Link className="text-green-900 font-medium" to="/forgot-password">
              Reset password
            </Link>
          </p>

        </div>

      </div>
    </div>
  )
}

export default Login
