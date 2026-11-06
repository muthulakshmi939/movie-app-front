
import React, { useEffect, useState } from 'react'

import {
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    Grid,
    Chip,
    CircularProgress
} from '@mui/material'

import {
    ChevronLeft,
    ChevronRight,
    CalendarMonth,
    Movie,
    EventAvailable
} from '@mui/icons-material'

import { getAllMoviesAPI } from '../services/apiServices'
import { useNavigate } from 'react-router-dom'

function Calender() {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(
        new Date().toLocaleDateString('en-CA')
    )

    const today = new Date()

    // Fetch movies
    const fetchMovies = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await getAllMoviesAPI()
            setMovies(response.data)

        } catch (err) {
            console.error(err)
            setError('Unable to load movies. Check JSON Server.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    // Month and year
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const monthName = currentDate.toLocaleString('default', {
        month: 'long'
    })

    // Number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // First day of month
    const firstDay = new Date(year, month, 1).getDay()

    // Previous month
    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    // Next month
    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    // Current month
    const goToToday = () => {
        setCurrentDate(new Date())
        setSelectedDate(today.toLocaleDateString('en-CA'))
    }

    // Get movies for a date
    const getMoviesForDate = (date) => {

        const dateString = [
            year,
            String(month + 1).padStart(2, '0'),
            String(date).padStart(2, '0')
        ].join('-')

        return movies.filter(movie =>
            movie.watchDate === dateString
        )
    }

    // Selected date movies
    const selectedMovies = movies.filter(movie =>
        movie.watchDate === selectedDate
    )

    // Statistics
    const watchedMovies = movies.filter(
        movie => movie.status === 'Watched'
    ).length

    const watchlistMovies = movies.filter(
        movie => movie.status === 'Watchlist'
    ).length

    // Calendar cells
    const calendarDays = []

    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day)
    }

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <CircularProgress color="secondary" />
                <Typography mt={2}>
                    Loading calendar...
                </Typography>
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography color="error" mb={2}>
                    {error}
                </Typography>

                <Button variant="contained" onClick={fetchMovies}>
                    Try Again
                </Button>
            </Box>
        )
    }

    return (

        <Box>

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
                        Movie Calendar
                    </Typography>

                    <Typography color="gray">
                        Track your movie watching schedule
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<CalendarMonth />}
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

            {/* Statistics */}

            <Grid container spacing={2} mb={4}>

                <Grid size={{ xs: 12, sm: 6 }}>

                    <Paper
                        sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            p: 3,
                            borderRadius: 3
                        }}
                    >

                        <Stack direction="row" spacing={2} alignItems="center">

                            <Movie sx={{ fontSize: 40, color: '#a78bfa' }} />

                            <Box>
                                <Typography color="gray">
                                    Watched Movies
                                </Typography>

                                <Typography variant="h4" fontWeight="bold">
                                    {watchedMovies}
                                </Typography>
                            </Box>

                        </Stack>

                    </Paper>

                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>

                    <Paper
                        sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            p: 3,
                            borderRadius: 3
                        }}
                    >

                        <Stack direction="row" spacing={2} alignItems="center">

                            <EventAvailable
                                sx={{ fontSize: 40, color: '#22c55e' }}
                            />

                            <Box>
                                <Typography color="gray">
                                    Watchlist Movies
                                </Typography>

                                <Typography variant="h4" fontWeight="bold">
                                    {watchlistMovies}
                                </Typography>
                            </Box>

                        </Stack>

                    </Paper>

                </Grid>

            </Grid>

            {/* Calendar and Selected Date */}

            <Grid container spacing={3}>

                {/* Calendar */}

                <Grid size={{ xs: 12, md: 8 }}>

                    <Paper
                        sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            p: { xs: 2, sm: 3 },
                            borderRadius: 3
                        }}
                    >

                        {/* Month Navigation */}

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                        >

                            <Button
                                onClick={previousMonth}
                                sx={{ color: 'white', minWidth: 40 }}
                            >
                                <ChevronLeft />
                            </Button>

                            <Box textAlign="center">

                                <Typography variant="h5" fontWeight="bold">
                                    {monthName} {year}
                                </Typography>

                                <Button
                                    size="small"
                                    onClick={goToToday}
                                    sx={{ color: '#a78bfa' }}
                                >
                                    Today
                                </Button>

                            </Box>

                            <Button
                                onClick={nextMonth}
                                sx={{ color: 'white', minWidth: 40 }}
                            >
                                <ChevronRight />
                            </Button>

                        </Stack>

                        {/* Weekdays */}

                        <Grid container spacing={1} mb={1}>

                            {[
                                'Sun',
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thu',
                                'Fri',
                                'Sat'
                            ].map(day => (

                                <Grid
                                    key={day}
                                    size={{ xs: 12 / 7 }}
                                    sx={{ textAlign: 'center' }}
                                >

                                    <Typography
                                        color="gray"
                                        fontWeight="bold"
                                        variant="body2"
                                    >
                                        {day}
                                    </Typography>

                                </Grid>

                            ))}

                        </Grid>

                        {/* Calendar Dates */}

                        <Grid container spacing={1}>

                            {calendarDays.map((day, index) => {

                                if (day === null) {
                                    return (
                                        <Grid
                                            key={`empty-${index}`}
                                            size={{ xs: 12 / 7 }}
                                        />
                                    )
                                }

                                const dateString = [
                                    year,
                                    String(month + 1).padStart(2, '0'),
                                    String(day).padStart(2, '0')
                                ].join('-')

                                const dayMovies = getMoviesForDate(day)

                                const isSelected =
                                    selectedDate === dateString

                                const isToday =
                                    today.getFullYear() === year &&
                                    today.getMonth() === month &&
                                    today.getDate() === day

                                return (

                                    <Grid
                                        key={day}
                                        size={{ xs: 12 / 7 }}
                                    >

                                        <Box
                                            onClick={() => setSelectedDate(dateString)}
                                            sx={{
                                                minHeight: { xs: 65, sm: 95 },
                                                p: 1,
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                border: isSelected
                                                    ? '2px solid #a78bfa'
                                                    : '1px solid #353550',
                                                bgcolor: isSelected
                                                    ? '#39305b'
                                                    : '#252542',
                                                '&:hover': {
                                                    bgcolor: '#39305b'
                                                }
                                            }}
                                        >

                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                sx={{
                                                    color: isToday
                                                        ? '#a78bfa'
                                                        : 'white'
                                                }}
                                            >
                                                {day}
                                            </Typography>

                                            {dayMovies.length > 0 && (

                                                <Box mt={0.5}>

                                                    <Chip
                                                        label={`${dayMovies.length} movie${dayMovies.length > 1 ? 's' : ''}`}
                                                        size="small"
                                                        color="secondary"
                                                        sx={{
                                                            maxWidth: '100%',
                                                            height: 20,
                                                            '& .MuiChip-label': {
                                                                px: 0.5,
                                                                fontSize: 10
                                                            }
                                                        }}
                                                    />

                                                </Box>

                                            )}

                                        </Box>

                                    </Grid>

                                )
                            })}

                        </Grid>

                    </Paper>

                </Grid>

                {/* Selected Date Details */}

                <Grid size={{ xs: 12, md: 4 }}>

                    <Paper
                        sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            p: 3,
                            borderRadius: 3,
                            height: '100%'
                        }}
                    >

                        <Typography variant="h6" fontWeight="bold" mb={1}>
                            Selected Date
                        </Typography>

                        <Typography color="#a78bfa" mb={3}>
                            {new Date(
                                selectedDate + 'T00:00:00'
                            ).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Typography>

                        {selectedMovies.length > 0 ? (

                            <Stack spacing={2}>

                                {selectedMovies.map(movie => (

                                    <Paper
                                        key={movie.id}
                                        sx={{
                                            bgcolor: '#252542',
                                            color: 'white',
                                            p: 2,
                                            borderRadius: 2
                                        }}
                                    >

                                        <Typography fontWeight="bold">
                                            {movie.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="gray"
                                            mb={1}
                                        >
                                            {movie.genre} | {movie.year}
                                        </Typography>

                                        <Chip
                                            label={movie.status}
                                            size="small"
                                            color={
                                                movie.status === 'Watched'
                                                    ? 'success'
                                                    : 'secondary'
                                            }
                                        />

                                        <Button
                                            fullWidth
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                color: '#a78bfa'
                                            }}
                                            onClick={() =>
                                                navigate(`/view/${movie.id}`)
                                            }
                                        >
                                            View Details
                                        </Button>

                                    </Paper>

                                ))}

                            </Stack>

                        ) : (

                            <Box textAlign="center" py={4}>

                                <CalendarMonth
                                    sx={{
                                        fontSize: 45,
                                        color: 'gray',
                                        mb: 1
                                    }}
                                />

                                <Typography color="gray">
                                    No movies on this date
                                </Typography>

                                <Button
                                    size="small"
                                    onClick={() => navigate('/add-movie')}
                                    sx={{
                                        mt: 2,
                                        color: '#a78bfa'
                                    }}
                                >
                                    Add Movie
                                </Button>

                            </Box>

                        )}

                    </Paper>

                </Grid>

            </Grid>

        </Box>
    )
}

export default Calender
