import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('user')
  const [email, setEmail] = useState(() => localStorage.getItem('email'))

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const res = await axios.get(
          "https://liaplus.onrender.com/api/users/checkuserrole",
          { params: { email } }
        )
        if (res.status === 200) {
          setRole(res.data.role)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (email) {
      setIsLoggedIn(true)
      getUserRole()
    } else {
      setIsLoggedIn(false)
      setRole('user')
    }
  }, [email])

  const handleLogout = () => {
    localStorage.removeItem('email')
    setEmail(null)
  }

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md md:pl-12 md:pr-12">
      {role === 'admin' && (
        <nav className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">
            <Link to="/">
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Blog</h2>
            </Link>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/create">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl font-bold">Create new</button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-2xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl font-bold">Login</button>
              </Link>
            )}
          </div>
        </nav>
      )}

      {role === 'user' && (
        <nav className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">
            <Link to="/">
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Blog</h2>
            </Link>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-2xl"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl font-bold">Login</button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}

export default Navbar
