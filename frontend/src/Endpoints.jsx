import React from 'react'
import { Link } from 'react-router-dom'

const Endpoints = () => {
   const contentApi = [
      {
         id:1,
         method: 'POST',
         endpoint: "/signup",
         desc: "Create user account + send verify email"
      },
      {
         id:2,
         method: 'POST',
         endpoint: "/verify-email",
         desc: "Verify email"
      },
      {
         id:3,
         method: 'POST',
         endpoint: "/login",
         desc: "logs in the user and generate a token with jwt and create a cookie with the jwt"
      },
      {
         id:4,
         method: 'POST',
         endpoint: "/logout",
         desc: "logs out the user and clears the cookie"
      },
      {
         id:5,
         method: 'POST',
         endpoint: "/forgot-password",
         desc: "Receives an email and send a password reset email link"
      },
      {
         id:6,
         method: 'POST',
         endpoint: "/reset-password/:token",
         desc: "Receives a token from link and and new password from body and send email of confirmation for password change"
      },
      {
         id:7,
         method: 'GET',
         endpoint: "/dashboard",
         desc: "Retrieves the user info, upon confirming that the user is authenticated with token"
      }
   ]


  return (
    <div className="min-h-screen mb-5">
      <section className="mx-auto text-center mb-16 bg-green-900 p-3 text-white">
         <h1 className="text-4xl font-bold mb-4">
            Endpoints
         </h1>
      </section>   
      {/* Endpoints */}
      <div>
         {contentApi.map(item =>(
            <div key={item.id} className='flex items-center gap-2 p-4 rounded-xl bg-gray-50 m-2'>
               <h1 className='font-bold text-green-900'>Method: {item.method}</h1>
               <p>Endpoint: <span className='text-gray-900 font-medium'>{item.endpoint}</span></p>
               <span>{item.desc}</span>
            </div>
         ))}
      </div>

      {/* CTA */}
      <section className="text-center">
         <p className="mb-4">
            Try it out, create an account, log in, and test protected routes with real authentication flow.
         </p>

         <div className="flex justify-center gap-4">
            <Link to='/signup' className="bg-green-900 text-white px-5 py-2 rounded-lg">
            Try Demo
            </Link>
            <Link to='https://github.com/meshackmakumbane' target='_blank' className="border border-green-900 px-5 py-2 rounded-lg">
            View Code
            </Link>
         </div>
      </section>
    </div>
  )
}

export default Endpoints
