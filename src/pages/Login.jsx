
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (item) => item.email === email && item.password === password
    )

    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user))
      alert('Login successful!')
      navigate('/dashboard')
    } else {
      alert('Invalid email or password')
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-logo">🎬</div>

        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">
          Login to your Movie Review account
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>
    </div>
  )
}

export default Login
