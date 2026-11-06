import React, { useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Rating,
    Paper,
    Stack,
    Alert
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { addMovieAPI } from '../services/apiServices'

function AddMovie() {

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

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setMovie({
            ...movie,
            [name]: value
        })
    }

    const handleRating = (event, newValue) => {
        setMovie({
            ...movie,
            rating: newValue || 0
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (!movie.title || !movie.genre || !movie.year) {
            setError('Please fill all required fields')
            return
        }

        try {
            setLoading(true)

            const newMovie = {
                ...movie,
                year: Number(movie.year),
                rating: Number(movie.rating)
            }

            const response = await addMovieAPI(newMovie)

            console.log('Movie added:', response.data)

            setSuccess('Movie added successfully!')

            setTimeout(() => {
                navigate('/movies')
            }, 1000)

        } catch (err) {
            console.error('Error adding movie:', err)
            setError('Unable to add movie. Check JSON Server.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ maxWidth: 750, mx: 'auto' }}>

            <Typography variant="h4" fontWeight="bold" mb={1}>
                Add New Movie
            </Typography>

            <Typography color="gray" mb={3}>
                Add your favourite movie to your collection.
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    bgcolor: 'hsl(262, 53%, 52%)',
                    color: 'blue',
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

                        <TextField
                            label="Movie Title"
                            name="title"
                            value={movie.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

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
                            ].map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Release Year"
                            name="year"
                            type="number"
                            value={movie.year}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Poster Image URL"
                            name="image"
                            value={movie.image}
                            onChange={handleChange}
                            fullWidth
                        />

                        {movie.image && (
                            <Box>
                                <Typography mb={1}>
                                    Poster Preview
                                </Typography>

                                <Box
                                    component="img"
                                    src={movie.image}
                                    alt="Movie poster preview"
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

                        <TextField
                            label="Your Review"
                            name="review"
                            value={movie.review}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                bgcolor: '#8b5cf6',
                                py: 1.5,
                                '&:hover': {
                                    bgcolor: '#7c3aed'
                                }
                            }}
                        >
                            {loading ? 'Saving...' : 'Save Movie'}
                        </Button>

                    </Stack>

                </Box>

            </Paper>

        </Box>
    )
}

export default AddMovie