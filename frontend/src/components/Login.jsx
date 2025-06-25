import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [formdata, setformdata] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handlechange = (event) => {
    const { name, value } = event.target
    setformdata((prev) => ({ ...prev, [name]: value }))
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/loginuser",
        formdata
      )
      if (response.status === 200) {
        localStorage.setItem('email', formdata.email)
        alert("Login Successful")
        navigate('/')
      } else {
        alert("Login failed. Please try again.")
      }
    } catch (error) {
      alert("Invalid credentials")
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 border border-gray-200 rounded-xl shadow-lg space-y-4">
        <h2 className="text-center text-2xl font-semibold text-blue-600 mb-4">Welcome Back</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email:</label>
            <input
              type='email'
              name='email'
              onChange={handlechange}
              value={formdata.email}
              placeholder='Email here'
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password:</label>
            <input
              type='password'
              name='password'
              onChange={handlechange}
              value={formdata.password}
              placeholder='Password here'
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type='submit'
            className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Don’t have an account?</p>
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
