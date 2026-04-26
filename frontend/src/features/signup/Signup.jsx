import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { signupUser, setError, clearError } from './signupSlice'
import { useNavigate } from 'react-router'
import Loader from '../../UX/Loader'

const Signup = () => {
   const { message, status, error } = useSelector(state=> state.signup)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)
   const [formValues, setFormValues] = useState(
      {
         firstName: "", 
         lastName: "",
         email:"",
         password:"",
         confirmPassword:""
      })
   
   const handleChange = (e)=>{
      const { name, value } = e.target
      setFormValues(prev =>({
         ...prev,
         [name]: value
      }))

      setTimeout(()=>{
         dispatch(clearError())
      },3000)
   }

   const handleSubmit = (e)=>{
      e.preventDefault()

      const checkEmail = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
 
      if(!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.password || !formValues.confirmPassword){
          return dispatch(setError("All fields must be filled"))       
      }
         
      if(!checkEmail.test(formValues.email)){
         return dispatch(setError("Invalid email"))
      }
      
      if(!checkPassword.test(formValues.password)){
         return dispatch(setError("Need uppercase, lowercase, number and symbol @$!%*?&"))
      }
      
      if(formValues.password.length < 8){
         return dispatch(setError("Password must be at least 8 characters"))
      }

      if(formValues.password !== formValues.confirmPassword){
         return dispatch(setError("Password do not match!"))
      }
         dispatch(signupUser(formValues))
   }

   useEffect(()=>{
      if(status === 'succeeded' && message){
        setTimeout(()=>{
          navigate('/verify')
        },2000)
      }
   },[status, message, dispatch, navigate])

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Start using the authentication system
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm"
        >

          {/* First Name */}
          <input
            className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:border-green-900"
            type="text"
            name="firstName"
            value={formValues.firstName}
            placeholder="First name"
            onChange={handleChange}
          />

          {/* Last Name */}
          <input
            className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:border-green-900"
            type="text"
            name="lastName"
            value={formValues.lastName}
            placeholder="Last name"
            onChange={handleChange}
          />

          {/* Email */}
          <input
            className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:border-green-900 focus:bg-transparent"
            type="email"
            name="email"
            value={formValues.email}
            placeholder="Email address"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="flex items-center border rounded-xl mb-3 pr-3">
            <input
              className="w-full p-3 focus:outline-none focus:bg-transparent focus:border-green-900"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={handleChange}
            />

            <span
              className="text-sm text-green-900 cursor-pointer font-medium"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password */}
            <input
              className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:border-green-900"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formValues.confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
            />
          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-500 text-sm mb-3 text-center font-bold">
              {message}
            </p>
          )}

          {/* Button */}
          <button
            className="w-full bg-green-900 hover:bg-green-800 text-white font-medium py-3 rounded-xl cursor-pointer h-13"
            type="submit"
          >
            {status === "loading" ? <Loader /> : "Sign up"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link className="text-green-900 font-medium" to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Signup
