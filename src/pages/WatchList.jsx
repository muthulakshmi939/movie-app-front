
import React, { useEffect, useState } from 'react'

import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    TextField,
    Stack,
    Chip,
    Rating,
    CircularProgress,
    InputAdornment,
    Pagination
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MovieIcon from '@mui/icons-material/Movie'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { useNavigate } from 'react-router-dom'

import {
    getAllMoviesAPI,
    deleteMovieAPI,
    updateMovieAPI
} from '../services/apiServices'

function WatchList() {

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Pagination state
    const [page, setPage] = useState(1)

    const recordsPerPage = 6

    const navigate = useNavigate()

    // Fetch movies from JSON Server
    const fetchMovies = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await getAllMoviesAPI()

            const watchlistMovies = response.data.filter(
                movie => movie.status === 'Watchlist'
            )

            setMovies(watchlistMovies)

        } catch (err) {
            console.error('Error fetching movies:', err)
            setError('Unable to load watchlist. Check JSON Server.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    // Search movies
    const filteredMovies = movies.filter(movie =>
        movie.title?.toLowerCase().includes(search.toLowerCase())
    )

    // Pagination calculation
    const totalPages = Math.ceil(
        filteredMovies.length / recordsPerPage
    )

    const indexOfLastRecord = page * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

    const currentRecords = filteredMovies.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    )

    // Delete movie
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this movie?'
        )

        if (!confirmDelete) return

        try {
            await deleteMovieAPI(id)

            setMovies(prev =>
                prev.filter(movie => movie.id !== id)
            )

        } catch (err) {
            console.error(err)
            alert('Unable to delete movie')
        }
    }

    // Mark as watched
    const handleWatched = async (movie) => {

        try {
            const updatedMovie = {
                ...movie,
                status: 'Watched'
            }

            await updateMovieAPI(movie.id, updatedMovie)

            setMovies(prev =>
                prev.filter(item => item.id !== movie.id)
            )

        } catch (err) {
            console.error(err)
            alert('Unable to update movie status')
        }
    }

    return (

        <Box sx={{ color: 'white' }}>

            {/* Header */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', sm: 'center' }}
                spacing={2}
                mb={4}
            >

                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        My Watchlist
                    </Typography>

                    <Typography color="#aaa" mt={1}>
                        Movies you are planning to watch
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<MovieIcon />}
                    onClick={() => navigate('/add-movie')}
                    sx={{
                        bgcolor: '#8b5cf6',
                        '&:hover': {
                            bgcolor: '#7c3aed'
                        }
                    }}
                >
                    Add Movie
                </Button>

            </Stack>

            {/* Search */}
            <TextField
                fullWidth
                placeholder="Search movies..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
                sx={{
                    mb: 4,
                    maxWidth: 500,
                    '& .MuiOutlinedInput-root': {
                        color: 'white',
                        bgcolor: '#19192f',
                        borderRadius: 2,
                        '& fieldset': {
                            borderColor: '#33334d'
                        }
                    }
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#aaa' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />

            {/* Loading */}
            {loading && (
                <Box textAlign="center" py={6}>
                    <CircularProgress sx={{ color: '#8b5cf6' }} />
                </Box>
            )}

            {/* Error */}
            {!loading && error && (
                <Box textAlign="center" py={5}>

                    <Typography color="error" mb={2}>
                        {error}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={fetchMovies}
                    >
                        Retry
                    </Button>

                </Box>
            )}

            {/* Empty Watchlist */}
            {!loading && !error && filteredMovies.length === 0 && (

                <Box
                    textAlign="center"
                    py={8}
                    sx={{
                        bgcolor: '#19192f',
                        borderRadius: 3
                    }}
                >

                    <MovieIcon
                        sx={{
                            fontSize: 65,
                            color: '#8b5cf6'
                        }}
                    />

                    <Typography variant="h6" mt={2}>
                        {search
                            ? 'No movies found'
                            : 'Your watchlist is empty'}
                    </Typography>

                    <Typography color="#aaa" mt={1}>
                        {search
                            ? 'Try another movie title.'
                            : 'Add movies that you want to watch later.'}
                    </Typography>

                    {!search && (
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                bgcolor: '#8b5cf6'
                            }}
                            onClick={() => navigate('/add-movie')}
                        >
                            Add Your First Movie
                        </Button>
                    )}

                </Box>
            )}

            {/* Movie Cards */}
            {!loading && !error && currentRecords.length > 0 && (

                <>

                    <Grid container spacing={3}>

                        {currentRecords.map(movie => (

                            <Grid
                                key={movie.id}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            >

                                <Card
                                    sx={{
                                        bgcolor: '#19192f',
                                        color: 'white',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        height: '100%',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 8px 25px #8b5cf655'
                                        }
                                    }}
                                >

                                    {/* Movie Poster */}
                                    <CardMedia
                                        component="img"
                                        height="280"
                                        image={
                                            movie.image ||
                                            'https://placehold.co/500x700?text=No+Poster'
                                        }
                                        alt={movie.title}
                                        sx={{
                                            objectFit: 'cover'
                                        }}
                                    />

                                    <CardContent>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            noWrap
                                        >
                                            {movie.title}
                                        </Typography>

                                        <Typography
                                            color="#aaa"
                                            variant="body2"
                                            mt={1}
                                        >
                                            {movie.genre} • {movie.year}
                                        </Typography>

                                        {/* Rating */}
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            mt={2}
                                        >

                                            <Rating
                                                value={Number(movie.rating) || 0}
                                                precision={0.5}
                                                readOnly
                                                size="small"
                                            />

                                            <Typography
                                                variant="body2"
                                                color="#aaa"
                                            >
                                                {movie.rating || 0}/5
                                            </Typography>

                                        </Stack>

                                        {/* Status */}
                                        <Box mt={2}>
                                            <Chip
                                                label="Watchlist"
                                                size="small"
                                                sx={{
                                                    bgcolor: '#8b5cf633',
                                                    color: '#c4b5fd'
                                                }}
                                            />
                                        </Box>

                                        {/* Mark as Watched */}
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<CheckCircleIcon />}
                                            onClick={() => handleWatched(movie)}
                                            sx={{
                                                mt: 3,
                                                bgcolor: '#16a34a',
                                                '&:hover': {
                                                    bgcolor: '#15803d'
                                                }
                                            }}
                                        >
                                            Mark as Watched
                                        </Button>

                                        {/* View and Edit */}
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            mt={2}
                                        >

                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                startIcon={<VisibilityIcon />}
                                                onClick={() =>
                                                    navigate(`/view/${movie.id}`)
                                                }
                                                sx={{ color: 'white' }}
                                            >
                                                View
                                            </Button>

                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                startIcon={<EditIcon />}
                                                onClick={() =>
                                                    navigate(`/edit/${movie.id}`)
                                                }
                                                sx={{ color: '#c4b5fd' }}
                                            >
                                                Edit
                                            </Button>

                                        </Stack>

                                        {/* Delete */}
                                        <Button
                                            fullWidth
                                            color="error"
                                            variant="outlined"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(movie.id)}
                                            sx={{ mt: 2 }}
                                        >
                                            Delete
                                        </Button>

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))}

                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mt={5}
                        >

                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                                color="secondary"
                                shape="rounded"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: 'white'
                                    },
                                    '& .Mui-selected': {
                                        bgcolor: '#8b5cf6 !important',
                                        color: 'white'
                                    }
                                }}
                            />

                        </Box>

                    )}

                    {/* Records information */}
                    <Typography
                        textAlign="center"
                        color="#aaa"
                        mt={2}
                    >
                        Showing {indexOfFirstRecord + 1} - {
                            Math.min(indexOfLastRecord, filteredMovies.length)
                        } of {filteredMovies.length} movies
                    </Typography>

                </>

            )}

        </Box>
    )
}

export default WatchList
