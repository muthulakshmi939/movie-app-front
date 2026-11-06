
import React, { useEffect, useState } from 'react'

import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Rating,
    Paper,
    Stack,
    Alert,
    CircularProgress
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useNavigate, useParams } from 'react-router-dom'

import {
    getMovieAPI,
    updateMovieAPI
} from '../services/apiServices'

function EditMovie() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        year: '',
        image: '',
        rating: 0,
        status: 'Watched',
        watchDate: '',
        review: ''
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Fetch existing movie details
    const fetchMovie = async () => {

        try {
            setLoading(true)
            setError('')

            const response = await getMovieAPI(id)

            setMovie({
                title: response.data.title || '',
                genre: response.data.genre || '',
                year: response.data.year || '',
                image: response.data.image || '',
                rating: Number(response.data.rating) || 0,
                status: response.data.status || 'Watched',
                watchDate: response.data.watchDate || '',
                review: response.data.review || ''
            })

        } catch (err) {
            console.error('Error fetching movie:', err)
            setError('Unable to load movie details.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id])

    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target

        setMovie(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle rating
    const handleRating = (event, newValue) => {

        setMovie(prev => ({
            ...prev,
            rating: newValue || 0
        }))
    }

    // Update movie
    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')
        setSuccess('')

        if (!movie.title || !movie.genre || !movie.year) {
            setError('Please fill all required fields.')
            return
        }

        try {

            setSaving(true)

            const updatedMovie = {
                ...movie,
                year: Number(movie.year),
                rating: Number(movie.rating)
            }

            const response = await updateMovieAPI(id, updatedMovie)

            console.log('Movie updated:', response.data)

            setSuccess('Movie updated successfully!')

            setTimeout(() => {
                navigate('/movies')
            }, 1000)

        } catch (err) {

            console.error('Error updating movie:', err)
            setError('Unable to update movie. Please check JSON Server.')

        } finally {
            setSaving(false)
        }
    }

    // Loading
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

    return (

        <Box sx={{ maxWidth: 750, mx: 'auto' }}>

            {/* Header */}

            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                mb={3}
            >

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/movies')}
                    sx={{ color: '#a78bfa' }}
                >
                    Back
                </Button>

                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Edit Movie
                    </Typography>

                    <Typography color="gray">
                        Update your movie details
                    </Typography>
                </Box>

            </Stack>

            <Paper
                sx={{
                    p: { xs: 2, sm: 4 },
                    bgcolor: '#a78bfa',
                    color: 'white',
                    borderRadius: 3
                }}
            >

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>

                    <Stack spacing={3}>

                        {/* Movie Title */}

                        <TextField
                            label="Movie Title"
                            name="title"
                            value={movie.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {/* Genre */}

                        <TextField
                            select
                            label="Genre"
                            name="genre"
                            value={movie.genre}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {[
                                'Action',
                                'Comedy',
                                'Romance',
                                'Horror',
                                'Thriller',
                                'Drama',
                                'Sci-Fi',
                                'Animation'
                            ].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Release Year */}

                        <TextField
                            label="Release Year"
                            name="year"
                            type="number"
                            value={movie.year}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {/* Poster URL */}

                        <TextField
                            label="Poster Image URL"
                            name="image"
                            value={movie.image}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Poster Preview */}

                        {movie.image && (
                            <Box>

                                <Typography mb={1}>
                                    Poster Preview
                                </Typography>

                                <Box
                                    component="img"
                                    src={movie.image}
                                    alt={movie.title}
                                    sx={{
                                        width: 150,
                                        height: 200,
                                        objectFit: 'cover',
                                        borderRadius: 2
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none'
                                    }}
                                />

                            </Box>
                        )}

                        {/* Rating */}

                        <Box>

                            <Typography mb={1}>
                                Your Rating
                            </Typography>

                            <Rating
                                value={Number(movie.rating)}
                                onChange={handleRating}
                                precision={0.5}
                                size="large"
                            />

                        </Box>

                        {/* Status */}

                        <TextField
                            select
                            label="Movie Status"
                            name="status"
                            value={movie.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Watched">
                                Watched
                            </MenuItem>

                            <MenuItem value="Watchlist">
                                Watchlist
                            </MenuItem>
                        </TextField>

                        {/* Watch Date */}

                        <TextField
                            label="Watch Date"
                            name="watchDate"
                            type="date"
                            value={movie.watchDate}
                            onChange={handleChange}
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />

                        {/* Review */}

                        <TextField
                            label="Your Review"
                            name="review"
                            value={movie.review}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                        />

                        {/* Buttons */}

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                        >

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={saving}
                                fullWidth
                                sx={{
                                    bgcolor: '#8b5cf6',
                                    py: 1.5,
                                    '&:hover': {
                                        bgcolor: '#7c3aed'
                                    }
                                }}
                            >
                                {saving ? 'Updating...' : 'Update Movie'}
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => navigate('/movies')}
                                sx={{
                                    color: 'white',
                                    borderColor: 'gray',
                                    py: 1.5
                                }}
                            >
                                Cancel
                            </Button>

                        </Stack>

                    </Stack>

                </Box>

            </Paper>

        </Box>
    )
}

export default EditMovie
