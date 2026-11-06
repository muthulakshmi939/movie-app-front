
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MovieList from './pages/MovieList'
import AddMovie from './pages/AddMovie'
import WatchList from './pages/WatchList'
import Calender from './pages/Calender'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import EditMovie from './pages/EditMovie'
import Download from './pages/Download'

function App() {

  const location = useLocation()

  // Show Navbar only on Home page
  const showNavbar = ['/', '/home'].includes(location.pathname)

  // Show Sidebar only on application pages
  const showSidebar = [
    '/dashboard',
    '/add-movie',
    '/movies',
    '/watchlist',
    '/calendar'
  ].includes(location.pathname)

  return (
    <>
      {/* Navbar */}
      {showNavbar && <Navbar />}

      <div style={{ display: 'flex' }}>

        {/* Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Main Content */}
        <div style={{
          flex: 1,
          padding: showSidebar ? '25px' : '0',
          background: '#0b0b1a',
          minHeight: '100vh',
          color: 'white'
        }}>

          <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Movie Management */}
            <Route path="/movies" element={<MovieList />} />
            <Route path="/add-movie" element={<AddMovie />} />

            {/* Watchlist */}
            <Route path="/watchlist" element={<WatchList />} />

            {/* Calendar */}
            <Route path="/calendar" element={<Calender />} />

            <Route path="/view/:id" element={<MovieDetails/>} />
<Route path="/edit/:id" element={<EditMovie />} />

<Route path="/downloads" element={<Download />} />

          </Routes>

        </div>
      </div>
    </>
  )
}

export default App
