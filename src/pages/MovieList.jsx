
import React, { useEffect, useState } from 'react'

import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    
    TextField,
    MenuItem,
    Rating,
    Stack,
    Chip,
    IconButton,
    Pagination,
    InputAdornment,
    CircularProgress
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'

import { useNavigate } from 'react-router-dom'


import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Button } from '@mui/material'

import downloadReviewsPDF from './DownloadReview'

import {
    getAllMoviesAPI,
    addDownloadsAPI
} from '../services/apiServices'

function MovieList() {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [genre, setGenre] = useState('All')
    const [rating, setRating] = useState('All')

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [page, setPage] = useState(1)

    const moviesPerPage = 6

    // Fetch all movies from JSON Server
    const fetchMovies = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await getAllMoviesAPI()

            setMovies(response.data)

        } catch (err) {
            console.error('Error fetching movies:', err)
            setError('Unable to load movies. Please check JSON Server.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    // Delete movie
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this movie?'
        )

        if (!confirmDelete) return

        try {
            await deleteMovieAPI(id)

            setMovies(prev =>
                prev.filter(movie => String(movie.id) !== String(id))
            )

        } catch (err) {
            console.error('Delete error:', err)
            alert('Unable to delete movie')
        }
    }

    // Search and filter movies
    const filteredMovies = movies.filter((movie) => {

        const matchesSearch = movie.title
            ?.toLowerCase()
            .includes(search.toLowerCase())

        const matchesGenre =
            genre === 'All' ||
            movie.genre?.toLowerCase() === genre.toLowerCase()

        const matchesRating =
            rating === 'All' ||
            Number(movie.rating) >= Number(rating)

        return matchesSearch && matchesGenre && matchesRating
    })

    // Pagination
    const totalPages = Math.ceil(
        filteredMovies.length / moviesPerPage
    )

    const startIndex = (page - 1) * moviesPerPage

    const displayedMovies = filteredMovies.slice(
        startIndex,
        startIndex + moviesPerPage
    )

    // Search handler
    const handleSearch = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }

    // Genre handler
    const handleGenre = (e) => {
        setGenre(e.target.value)
        setPage(1)
    }

    // Rating handler
    const handleRating = (e) => {
        setRating(e.target.value)
        setPage(1)
    }
//download pdf
const handleDownloadPDF = async () => {
    try {

        const response = await getAllMoviesAPI()

        const downloadData = downloadReviewsPDF(response.data)

        if (!downloadData) return

        await addDownloadsAPI(downloadData)

        alert('PDF downloaded successfully!')

    } catch (error) {

        console.error('Download Error:', error)

        alert('Something went wrong!')

    }
}
    return (

        <Box sx={{ width: '100%' }}>

            {/* Header */}

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                mb={4}
            >

                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        My Movies
                    </Typography>

                    <Typography color="gray">
                        Explore your movie collection
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
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

            {/* Search and Filters */}

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                mb={4}
            >

                <TextField
                    placeholder="Search movies..."
                    value={search}
                    onChange={handleSearch}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: '#444'
                            }
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'gray' }} />
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <TextField
                    select
                    label="Genre"
                    value={genre}
                    onChange={handleGenre}
                    sx={{
                        minWidth: 160,
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: '#444'
                            }
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray'
                        }
                    }}
                >
                    <MenuItem value="All">All Genres</MenuItem>

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

                <TextField
                    select
                    label="Minimum Rating"
                    value={rating}
                    onChange={handleRating}
                    sx={{
                        minWidth: 160,
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: '#444'
                            }
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray'
                        }
                    }}
                >
                    <MenuItem value="All">All Ratings</MenuItem>
                    <MenuItem value="1">1+ Stars</MenuItem>
                    <MenuItem value="2">2+ Stars</MenuItem>
                    <MenuItem value="3">3+ Stars</MenuItem>
                    <MenuItem value="4">4+ Stars</MenuItem>
                </TextField>

            </Stack>

            {/* Loading */}

            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 5
                    }}
                >
                    <CircularProgress color="secondary" />

                    <Typography mt={2}>
                        Loading movies...
                    </Typography>
                </Box>
            )}

            {/* Error */}

            {!loading && error && (

                <Box sx={{ textAlign: 'center', py: 5 }}>

                    <Typography color="error" mb={2}>
                        {error}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={fetchMovies}
                    >
                        Try Again
                    </Button>

                </Box>
            )}
          <Button
    variant="contained"
    color="secondary"
    startIcon={<PictureAsPdfIcon />}
    onClick={handleDownloadPDF}
>
    Download Reviews PDF
</Button>
            {/* Movie Cards */}

            {!loading && !error && (

                <>

                    {displayedMovies.length > 0 ? (

                        <Grid container spacing={3}>

                            {displayedMovies.map((movie) => (

                                <Grid
                                    key={movie.id}
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                        lg: 3
                                    }}
                                >

                                    <Card
                                        sx={{
                                            bgcolor: '#19192f',
                                            color: 'white',
                                            borderRadius: 3,
                                            height: '100%',
                                            overflow: 'hidden',
                                            transition: '0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 8px 25px rgba(139,92,246,0.25)'
                                            }
                                        }}
                                    >

                                        <CardMedia
                                            component="img"
                                            height="260"
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
                                                color="gray"
                                                variant="body2"
                                                mb={1}
                                            >
                                                {movie.genre} | {movie.year}
                                            </Typography>

                                            <Rating
                                                value={Number(movie.rating) || 0}
                                                readOnly
                                                precision={0.5}
                                                size="small"
                                            />

                                            <Box mt={1} mb={2}>

                                                <Chip
                                                    label={movie.status}
                                                    size="small"
                                                    color={
                                                        movie.status === 'Watched'
                                                            ? 'success'
                                                            : 'secondary'
                                                    }
                                                />

                                            </Box>

                                            <Typography
                                                variant="body2"
                                                color="gray"
                                                sx={{
                                                    minHeight: 40,
                                                    mb: 2
                                                }}
                                            >
                                                {movie.review || 'No review added'}
                                            </Typography>

                                            {/* Action Buttons */}

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >

                                                <IconButton
                                                    color="info"
                                                    onClick={() =>
                                                        navigate(`/view/${movie.id}`)
                                                    }
                                                    title="View movie"
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="warning"
                                                    onClick={() =>
                                                        navigate(`/edit/${movie.id}`)
                                                    }
                                                    title="Edit movie"
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        handleDelete(movie.id)
                                                    }
                                                    title="Delete movie"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                            </Stack>

                                        </CardContent>

                                    </Card>

                                </Grid>

                            ))}

                        </Grid>

                    ) : (

                        // Empty State

                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 8
                            }}
                        >

                            <Typography
                                variant="h6"
                                color="gray"
                            >
                                No movies found
                            </Typography>

                            <Typography
                                color="gray"
                                mb={2}
                            >
                                Try another search or add a new movie.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
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

                        </Box>

                    )}

                    {/* Pagination */}

                    {totalPages > 1 && (

                        <Stack
                            alignItems="center"
                            mt={4}
                        >

                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                                color="secondary"
                            />

                        </Stack>

                    )}

                </>

            )}

        </Box>
    )
}

export default MovieList
