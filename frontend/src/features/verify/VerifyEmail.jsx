import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { verifyUser, setError, clearError } from './verifySlice'
import { useNavigate } from 'react-router'
import Loader from '../../UX/Loader'

const VerifyEmail = () => {
   const { message, status, error } = useSelector(state=> state.verify)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [token, setToken] = useState('')

   const handleSubmit = (e)=>{
      e.preventDefault()

      if(!token){
         dispatch(setError("Provide the verification code"))
         setTimeout(()=>{
            dispatch(clearError())
         },3000)
         return       
      }

      if(token.length < 6){
         dispatch(setError("Code should be atleast 6 digits"))
         setTimeout(()=>{
            dispatch(clearError())
         },3000)
         return
      }

      dispatch(verifyUser({token:token}))

   }

   useEffect(()=>{
      if(status === 'succeeded' && message){
         setTimeout(()=>{
            navigate('/login')
         },2000) 
      }
   },[status, message, navigate, dispatch])

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-md">

      {/* Header */}
      <div className="text-center mb-8">
         <h1 className="text-3xl font-bold mb-2">
            Enter your code
         </h1>
         <p className="text-gray-600">
            Enter your verification code to verify your email.
         </p>
      </div>

      {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm"
        >
         {/* Token */}
         <input 
            className='w-full p-2 focus:outline-none focus:bg-green-50 focus:rounded-xl lg:text-2xl text-center font-bold tracking-widest border rounded-xl border-gray-200'
            type='text'
            name="token"
            value={token}
            placeholder='Code'
            onChange={(e)=> setToken(e.target.value)}
            aria-label='token'
         />

         {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* Message */}
          {message && (
            <p className="text-green-900 text-sm mb-3 text-center">
              {message}
            </p>
          )}

         {/* Button */}
         <button
            className="w-full bg-neutral-800 hover:bg-green-800 text-white font-medium py-3 rounded-xl cursor-pointer h-13 mt-2"
            type="submit"
         >
            {status === 'loading' ? <Loader/> : 'Verify Email'}
         </button>
        </form>
      </div>
   </div>
  )
}

export default VerifyEmail
