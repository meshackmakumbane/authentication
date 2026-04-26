import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [techStack, setTechStack] = useState([
        'Nodejs', 'Express', 'MongoDB', 'JWT Auth', 'Rest API', 'React', 'Tailwind CSS', 'Redux Toolkit'
     ])

  const highlights = [
    "JWT Authentication (Access Tokens)",
    "HTTP-only Cookie Security",
    "Protected Routes (Frontend + Backend)",
    "Password Hashing (bcrypt)",
    "Centralized State (Redux Toolkit)",
    "REST API Design (Auth Endpoints)"
  ]

  const features = [
    {
      title: "Authentication Flow",
      desc: "Signup → hashed password → login → token issued → session maintained via cookies",
    },
    {
      title: "Route Protection",
      desc: "Frontend and backend routes verify authentication before granting access",
    },
    {
      title: "Session Handling",
      desc: "JWT stored in HTTP-only cookies to prevent XSS access",
    },
    {
      title: "State Management",
      desc: "Redux Toolkit manages user state and authentication status globally",
    }
  ]

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Full-Stack Authentication System
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Production-style authentication built with React, Node.js, and JWT — demonstrating secure session handling, protected routes, and scalable architecture.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to='/signup' className="bg-green-900 text-white px-5 py-2 rounded-lg">
            Live Demo
          </Link>
          <Link to='/endpoints' className="border border-green-900 px-5 py-2 rounded-lg hover:bg-green-900 hover:text-white">
            API Endpoints
          </Link>
          <a 
            href='https://github.com/meshackmakumbane/authentication' 
            target='_blank' 
            className="border border-green-900 px-5 py-2 rounded-lg hover:bg-green-900 hover:text-white"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* What this demonstrates */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What this project demonstrates
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <div key={index} className="border p-4 rounded-xl">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="text-center">
        <p className="mb-4 text-lg">
            Modern Authentication System
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 my-10">
          {techStack.map(item =>(
              <span key={item} className="bg-green-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 hover:cursor-pointer">{item}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="mb-4 text-lg">
          Explore the implementation, test authentication flows, or review the codebase.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to='/signup' className="bg-green-900 text-white px-5 py-2 rounded-lg">
            Try Demo
          </Link>
          <Link to='/login' className="border border-green-900 px-5 py-2 rounded-lg hover:bg-green-900 hover:text-white">
            Login
          </Link>
          <a 
            href='https://github.com/meshackmakumbane/authentication' 
            target='_blank' 
            className="border border-green-900 px-5 py-2 rounded-lg hover:bg-green-900 hover:text-white"
          >
            View Code
          </a>
        </div>
      </section>

    </div>
  )
}

export default Home
