import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, logoutUser, logout } from "../auth/authSlice"
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, status, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleClick = () => {
    dispatch(logout())
    dispatch(logoutUser())
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="bg-green-900 text-white px-6 py-4 flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          onClick={handleClick}
          className="text-sm font-medium bg-green-700 p-2 rounded-xl cursor-pointer hover:bg-green-500"
        >
          Logout
        </button>
      </header>
      {status === 'loading'
        ?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
            {[1,2,3,4,5,6].map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-xl animate-pulse">
                <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        :<main className="flex-1 px-6 py-6 pb-20">
          {user 
          ? <>
              <h2 className="text-lg font-semibold mb-4">
                Welcome {user.firstName}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(user).map(([key, value]) => {
                       let displayValue = value
                       if(typeof value === 'boolean') displayValue = value ? "Yes" : "No" 

                       return(
                        <div
                        key={key}
                        className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                          <p className="text-sm text-gray-500 mb-2">{key}</p>
                          <p className="text-base font-semibold text-gray-800 break-words">
                            {displayValue}
                          </p>
                        </div>
                       )
                    }
                      

                      
                    )}
              </div>
            </>
          :  (
                <p>No user data</p>
             )
          }

        </main>
      }

      <footer className="bg-white text-center py-3 text-sm text-gray-500 border-t fixed bottom-0 right-0 left-0 mt-20">
        Authentication Service · v0.1
      </footer>
    </div>
  )
}

export default Dashboard
 

