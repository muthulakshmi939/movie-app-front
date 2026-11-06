
import React, { useEffect, useState } from 'react'

import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Rating,
    Chip,
    Stack,
    CircularProgress
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'

import { useNavigate, useParams } from 'react-router-dom'

import { getMovieAPI } from '../services/apiServices'

function MovieDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Fetch selected movie
    const fetchMovie = async () => {

        try {
            setLoading(true)
            setError('')

            const response = await getMovieAPI(id)

            setMovie(response.data)

        } catch (err) {
            console.error('Error fetching movie:', err)
            setError('Movie details not found.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id])

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <CircularProgress color="secondary" />
                <Typography mt={2}>
                    Loading movie details...
                </Typography>
            </Box>
        )
    }

    if (error || !movie) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>

                <Typography color="error" variant="h6">
                    {error || 'Movie not found'}
                </Typography>

                <Button
                    onClick={() => navigate('/movies')}
                    startIcon={<ArrowBackIcon />}
                    sx={{ mt: 2 }}
                >
                    Back to Movies
                </Button>

            </Box>
        )
    }

    return (

        <Box>

            {/* Header */}

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/movies')}
                    sx={{ color: '#a78bfa' }}
                >
                    Back to Movies
                </Button>

                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/edit/${movie.id}`)}
                    sx={{
                        bgcolor: '#8b5cf6',
                        '&:hover': {
                            bgcolor: '#7c3aed'
                        }
                    }}
                >
                    Edit Movie
                </Button>

            </Stack>

            {/* Movie Details */}

            <Paper
                sx={{
                    bgcolor: '#19192f',
                    color: 'white',
                    p: { xs: 2, md: 4 },
                    borderRadius: 3
                }}
            >

                <Grid container spacing={4}>

                    {/* Movie Poster */}

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Box
                            component="img"
                            src={
                                movie.image ||
                                'https://placehold.co/500x700?text=No+Poster'
                            }
                            alt={movie.title}
                            sx={{
                                width: '100%',
                                maxHeight: 500,
                                objectFit: 'cover',
                                borderRadius: 3
                            }}
                        />

                    </Grid>

                    {/* Movie Information */}

                    <Grid size={{ xs: 12, md: 8 }}>

                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            mb={2}
                        >
                            {movie.title}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                            mb={3}
                        >

                            <Chip
                                label={movie.genre}
                                color="secondary"
                            />

                            <Chip
                                label={movie.year}
                                variant="outlined"
                                sx={{ color: 'white', borderColor: 'gray' }}
                            />

                            <Chip
                                label={movie.status}
                                color={
                                    movie.status === 'Watched'
                                        ? 'success'
                                        : 'secondary'
                                }
                            />

                        </Stack>

                        {/* Rating */}

                        <Box mb={3}>

                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                mb={1}
                            >
                                Your Rating
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <Rating
                                    value={Number(movie.rating) || 0}
                                    precision={0.5}
                                    readOnly
                                    size="large"
                                />

                                <Typography color="gray">
                                    {Number(movie.rating) || 0}/5
                                </Typography>

                            </Stack>

                        </Box>

                        {/* Watch Date */}

                        <Box mb={3}>

                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                mb={1}
                            >
                                Watch Date
                            </Typography>

                            <Typography color="gray">
                                {movie.watchDate || 'Not specified'}
                            </Typography>

                        </Box>

                        {/* Review */}

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={1}
                            >
                                Your Review
                            </Typography>

                            <Paper
                                sx={{
                                    bgcolor: '#252542',
                                    p: 3,
                                    borderRadius: 2,
                                    color: '#ddd'
                                }}
                            >

                                <Typography
                                    sx={{
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: 1.8
                                    }}
                                >
                                    {movie.review || 'No review added for this movie.'}
                                </Typography>

                            </Paper>

                        </Box>

                    </Grid>

                </Grid>

            </Paper>

        </Box>
    )
}

export default MovieDetails
