
import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material'

import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#19192f',
        boxShadow: '0 3px 15px rgba(124,58,237,0.2)'
      }}
    >
      <Toolbar>

        {/* Logo */}
        <MovieFilterIcon
          sx={{ color: '#a78bfa', fontSize: 35, mr: 1 }}
        />

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          Movie<span style={{ color: '#a78bfa' }}>Review</span>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>

          <Button
            component={Link}
            to="/"
            sx={{ color: 'white' }}
          >
            Home
          </Button>

          
          <Button
            
            sx={{ color: 'white' }}
          >
            Movies
          </Button>

          

          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg,#7c3aed,#a855f7)',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#9333ea'
              }
            }}
          >
            Login
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
