
import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Stack
} from '@mui/material'

import {
  MovieFilter,
  PlayArrow,
  Star,
  Favorite,
  CalendarMonth,
  RateReview,
  VideoLibrary
} from '@mui/icons-material'

import { Link } from 'react-router-dom'

function Home() {

  const movies = [
    {
      title: 'Interstellar',
      genre: 'Sci-Fi | Adventure',
      rating: 4.5,
      image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },
    {
      title: 'Inception',
      genre: 'Action | Sci-Fi',
      rating: 4.5,
      image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    },
    {
      title: 'The Dark Knight',
      genre: 'Action | Drama',
      rating: 5,
      image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    },
    {
      title: 'Avatar',
      genre: 'Fantasy | Adventure',
      rating: 4,
      image: 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg'
    }
  ]

  const features = [
    {
      icon: <VideoLibrary sx={{ fontSize: 40, color: '#a78bfa' }} />,
      title: 'Manage Movies',
      description: 'Add, edit and delete your favourite movies.'
    },
    {
      icon: <Star sx={{ fontSize: 40, color: '#a78bfa' }} />,
      title: 'Rate & Review',
      description: 'Share your ratings and personal movie reviews.'
    },
    {
      icon: <Favorite sx={{ fontSize: 40, color: '#a78bfa' }} />,
      title: 'Watchlist',
      description: 'Save movies that you want to watch later.'
    },
    {
      icon: <CalendarMonth sx={{ fontSize: 40, color: '#a78bfa' }} />,
      title: 'Movie Calendar',
      description: 'Track your movie watching history.'
    }
  ]

  return (
    <Box sx={{
      bgcolor: '#0b0b1a',
      color: 'white',
      minHeight: '100vh'
    }}>

      {/* HERO SECTION */}
      <Box sx={{
        background: 'radial-gradient(circle at 80% 40%, #34205d, #0b0b1a 60%)',
        py: { xs: 6, md: 10 }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">

            <Grid item xs={12} md={7}>
              <Typography
                sx={{ color: '#b69aff', letterSpacing: 2, mb: 2 }}
              >
                🎬 YOUR PERSONAL MOVIE SPACE
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 38, md: 58 },
                  lineHeight: 1.2
                }}
              >
                Every Movie Has
                <Box component="span" sx={{ color: '#a78bfa' }}>
                  {' '}A Story.
                </Box>
                <br />
                What's Yours?
              </Typography>

              <Typography sx={{
                color: '#b5b5c9',
                mt: 3,
                maxWidth: 520,
                lineHeight: 1.8
              }}>
                Discover movies, share your thoughts, rate your
                favourites and keep track of every movie you watch.
              </Typography>

              <Stack direction="row" spacing={2} mt={4} flexWrap="wrap">
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  endIcon={<PlayArrow />}
                  sx={{
                    bgcolor: '#8b5cf6',
                    px: 3,
                    py: 1.5,
                    '&:hover': { bgcolor: '#7040db' }
                  }}
                >
                  Get Started
                </Button>

                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: '#a78bfa',
                    px: 3,
                    py: 1.5
                  }}
                >
                  Explore Movies
                </Button>
              </Stack>

              <Grid container spacing={3} mt={3}>
                {[
                  ['1000+', 'Movies to explore'],
                  ['4.8/5', 'User experience'],
                  ['100%', 'Your movie journey']
                ].map(([number, label]) => (
                  <Grid item xs={4} key={label}>
                    <Typography variant="h5" color="#b69aff" fontWeight="bold">
                      {number}
                    </Typography>
                    <Typography variant="caption" color="#aaa">
                      {label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{
                position: 'relative',
                textAlign: 'center'
              }}>
                <Box
                  component="img"
                  src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                  alt="Featured movie"
                  sx={{
                    width: '75%',
                    maxWidth: 330,
                    height: 420,
                    objectFit: 'cover',
                    borderRadius: 4,
                    boxShadow: '0 15px 50px #000'
                  }}
                />

                <Box sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: { xs: '5%', md: '0%' },
                  bgcolor: '#24213a',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #665092'
                }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Star sx={{ color: '#ffc857' }} />
                    <Typography fontWeight="bold">8.5 / 10</Typography>
                  </Stack>
                  <Typography variant="caption" color="#aaa">
                    Featured Movie
                  </Typography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* FEATURED MOVIES */}
      <Container maxWidth="lg" sx={{ py: 8 }}>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography color="#b69aff" variant="overline">
              MOVIE COLLECTION
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              Featured Movies
            </Typography>
            <Typography color="#aaa" mt={1}>
              Explore some popular movies.
            </Typography>
          </Box>

          <Button component={Link} to="/login" sx={{ color: '#b69aff' }}>
            View All →
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.title}>
              <Card sx={{
                bgcolor: '#19192f',
                color: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 10px 30px #0008'
                }
              }}>
                <CardMedia
                  component="img"
                  height="280"
                  image={movie.image}
                  alt={movie.title}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {movie.title}
                  </Typography>

                  <Typography variant="body2" color="#aaa" mb={1}>
                    {movie.genre}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating value={movie.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="#ffc857">
                      {movie.rating * 2}/10
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURES */}
      <Box sx={{ bgcolor: '#101024', py: 8 }}>
        <Container maxWidth="lg">

          <Typography color="#b69aff" variant="overline">
            WHAT YOU CAN DO
          </Typography>

          <Typography variant="h4" fontWeight="bold" mb={1}>
            Your Movie Experience
          </Typography>

          <Typography color="#aaa" mb={4}>
            Everything you need to manage your movie journey.
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Card sx={{
                  bgcolor: '#1b1b35',
                  color: 'white',
                  p: 2,
                  height: '100%',
                  border: '1px solid #30294c',
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: '#a78bfa',
                    transform: 'translateY(-5px)'
                  },
                  transition: '0.3s'
                }}>
                  <CardContent>
                    {feature.icon}
                    <Typography variant="h6" fontWeight="bold" mt={2}>
                      {feature.title}
                    </Typography>
                    <Typography color="#aaa" variant="body2" mt={1}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Container>
      </Box>

      {/* CALL TO ACTION */}
      <Container maxWidth="md" sx={{ py: 9, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          Ready to Start Your Movie Journey?
        </Typography>

        <Typography color="#aaa" my={2}>
          Create your personal movie collection today.
        </Typography>

        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{
            bgcolor: '#8b5cf6',
            px: 4,
            py: 1.5,
            mt: 2,
            '&:hover': { bgcolor: '#7040db' }
          }}
        >
          Create Account
        </Button>
      </Container>

      {/* FOOTER */}
      <Box sx={{
        bgcolor: '#080813',
        textAlign: 'center',
        py: 4
      }}>
        {/* <Typography variant="h6" color="#b69aff" fontWeight="bold">
          <MovieFilter sx={{ verticalAlign: 'middle', mr: 1 }} />
          CineTrack
        </Typography>

        <Typography color="#aaa" variant="body2" mt={1}>
          Your movies. Your ratings. Your stories.
        </Typography>

        <Typography color="#777" variant="caption">
          © 2026 CineTrack. All rights reserved.
        </Typography> */}
      </Box>

    </Box>
  )
}

export default Home
