
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find(
      (user) => user.email === email
    )

    if (existingUser) {
      alert('Email already registered!')
      return
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    }

    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))

    alert('Registration successful!')

    navigate('/login')
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-logo">🎬</div>

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Join Movie Review and share your movie experiences
        </p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Create Account
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>
    </div>
  )
}

export default Register
