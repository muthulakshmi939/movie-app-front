
import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material'

import {
  Movie,
  Visibility,
  Favorite,
  Star,
  Add,
  CalendarMonth,
  TrendingUp,
  PlayCircle,
  MoreVert
} from '@mui/icons-material'

import { Link } from 'react-router-dom'

function Dashboard() {

  const stats = [
    {
      title: 'Total Movies',
      value: 45,
      icon: <Movie />,
      color: '#a78bfa',
      change: '+5 this month'
    },
    {
      title: 'Watched Movies',
      value: 32,
      icon: <Visibility />,
      color: '#38bdf8',
      change: '71% completed'
    },
    {
      title: 'My Watchlist',
      value: 13,
      icon: <Favorite />,
      color: '#fb7185',
      change: 'Ready to watch'
    },
    {
      title: 'Average Rating',
      value: '4.5',
      icon: <Star />,
      color: '#fbbf24',
      change: 'Out of 5 stars'
    }
  ]

  const recentMovies = [
    {
      title: 'Interstellar',
      genre: 'Sci-Fi',
      rating: '4.8',
      date: 'Nov 03, 2026',
      image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },
    {
      title: 'Inception',
      genre: 'Action',
      rating: '4.5',
      date: 'Nov 02, 2026',
      image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    },
    {
      title: 'The Dark Knight',
      genre: 'Crime',
      rating: '5.0',
      date: 'Oct 30, 2026',
      image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    }
  ]

  const genres = [
    { name: 'Action', count: 12, percentage: 75, color: '#a78bfa' },
    { name: 'Drama', count: 8, percentage: 55, color: '#38bdf8' },
    { name: 'Sci-Fi', count: 10, percentage: 65, color: '#fb7185' },
    { name: 'Comedy', count: 5, percentage: 35, color: '#fbbf24' }
  ]

  return (
    <Box sx={{
      bgcolor: '#0b0b1a',
      minHeight: '100vh',
      color: 'white',
      p: { xs: 1, sm: 2 }
    }}>

      {/* HEADER */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>

          <Typography color="#aaa" mt={1}>
            Welcome back! Here's your movie activity overview.
          </Typography>
        </Box>

      </Stack>

      {/* STAT CARDS */}
      <Grid container spacing={3} mb={4}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} lg={3} key={item.title}>
            <Card sx={{
              bgcolor: '#19192f',
              color: 'white',
              border: '1px solid #30294c',
              borderRadius: 3,
              height: '100%'
            }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography color="#aaa" variant="body2">
                      {item.title}
                    </Typography>

                    <Typography variant="h4" fontWeight="bold" mt={1}>
                      {item.value}
                    </Typography>
                  </Box>

                  <Avatar sx={{
                    bgcolor: `${item.color}20`,
                    color: item.color,
                    width: 50,
                    height: 50
                  }}>
                    {item.icon}
                  </Avatar>
                </Stack>

                <Typography
                  variant="caption"
                  sx={{ color: item.color, display: 'block', mt: 2 }}
                >
                  <TrendingUp sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                  {item.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* QUICK ACTIONS */}
      <Card sx={{
        bgcolor: '#19192f',
        color: 'white',
        borderRadius: 3,
        border: '1px solid #30294c',
        mb: 4
      }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Quick Actions
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={2}>
            <Button
              component={Link}
              to="/add-movie"
              variant="outlined"
              startIcon={<Add />}
              sx={{ color: '#b69aff', borderColor: '#8b5cf6' }}
            >
              Add New Movie
            </Button>

            <Button
              component={Link}
              to="/movies"
              variant="outlined"
              startIcon={<Movie />}
              sx={{ color: '#b69aff', borderColor: '#8b5cf6' }}
            >
              View Movies
            </Button>

            <Button
              component={Link}
              to="/watchlist"
              variant="outlined"
              startIcon={<Favorite />}
              sx={{ color: '#b69aff', borderColor: '#8b5cf6' }}
            >
              My Watchlist
            </Button>

            <Button
              component={Link}
              to="/calendar"
              variant="outlined"
              startIcon={<CalendarMonth />}
              sx={{ color: '#b69aff', borderColor: '#8b5cf6' }}
            >
              Calendar
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* RECENT MOVIES AND GENRES */}
      <Grid container spacing={3}>

        
        {/* GENRE DISTRIBUTION */}
        <Grid item xs={12} lg={4}>
          <Card sx={{
            bgcolor: '#19192f',
            color: 'white',
            borderRadius: 3,
            border: '1px solid #30294c',
            height: '100%',
            ml:'50'
          }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Genre Distribution
              </Typography>

              {genres.map((genre) => (
                <Box key={genre.name} mb={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography variant="body2">
                      {genre.name}
                    </Typography>

                    <Typography variant="body2" color="#aaa">
                      {genre.count} movies
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={genre.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: '#30294c',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: genre.color,
                        borderRadius: 5
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* BOTTOM BANNER */}
      <Card sx={{
        mt: 4,
        bgcolor: '#241641',
        color: 'white',
        borderRadius: 3
      }}>
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Your Next Movie Awaits!
              </Typography>

              <Typography color="#c4b5fd" mt={1}>
                Explore your watchlist and discover something new.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/watchlist"
              variant="contained"
              startIcon={<PlayCircle />}
              sx={{
                bgcolor: '#8b5cf6',
                '&:hover': { bgcolor: '#7040db' }
              }}
            >
              Explore Watchlist
            </Button>
          </Stack>
        </CardContent>
      </Card>

    </Box>
  )
}

export default Dashboard
