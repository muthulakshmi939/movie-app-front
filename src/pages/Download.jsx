import React, { useEffect, useState } from 'react'

import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Stack,
    CircularProgress,
    Card,
    CardContent,
    IconButton,
    Divider
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DownloadIcon from '@mui/icons-material/Download'
import StarIcon from '@mui/icons-material/Star'

import {
    viewDownloadsAPI,
    deleteDownloadsAPI
} from '../services/apiServices'

import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from 'recharts'

function Download() {

    const [downloads, setDownloads] = useState([])
    const [loading, setLoading] = useState(true)

    const COLORS = [
        '#8b5cf6',
        '#06b6d4',
        '#f59e0b',
        '#10b981',
        '#ec4899'
    ]

    // Fetch download history
    const getDownloads = async () => {

        try {

            const response = await viewDownloadsAPI()

            setDownloads(response.data)

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {

        getDownloads()

    }, [])

    // Delete download history
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this record?'
        )

        if (!confirmDelete) return

        try {

            await deleteDownloadsAPI(id)

            setDownloads(prev =>
                prev.filter(item => item.id !== id)
            )

        } catch (error) {

            console.log(error)

            alert('Unable to delete record')

        }

    }

    // Statistics
    const totalDownloads = downloads.length

    const totalReviews = downloads.reduce(
        (total, item) => total + Number(item.totalReviews || 0),
        0
    )

    const averageRating = downloads.length > 0
        ? (
            downloads.reduce(
                (total, item) =>
                    total + Number(item.averageRating || 0),
                0
            ) / downloads.length
        ).toFixed(1)
        : '0.0'

    // Chart data
    const chartData = downloads.map(item => ({
        name: item.fileName,
        value: Number(item.totalReviews) || 0
    })).filter(item => item.value > 0)

    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <CircularProgress color="secondary" />
            </Box>
        )

    }

    return (

        <Box
            sx={{
                minHeight: '100vh',
                background: '#0b0b1a',
                color: 'white',
                py: 4
            }}
        >

            <Container maxWidth="xl">

                {/* Header */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                >

                    <Box>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            Downloads
                        </Typography>

                        <Typography color="gray">
                            Manage your movie review PDF downloads
                        </Typography>

                    </Box>

                    <PictureAsPdfIcon
                        sx={{
                            fontSize: 45,
                            color: '#a78bfa'
                        }}
                    />

                </Stack>


                {/* Statistics */}

                <Grid container spacing={3} mb={4}>

                    <Grid size={{ xs: 12, sm: 4 }}>

                        <Card sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            borderRadius: 3
                        }}>

                            <CardContent>

                                <DownloadIcon
                                    sx={{
                                        color: '#a78bfa',
                                        fontSize: 35
                                    }}
                                />

                                <Typography color="gray">
                                    Total Downloads
                                </Typography>

                                <Typography variant="h4" fontWeight="bold">
                                    {totalDownloads}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>


                    <Grid size={{ xs: 12, sm: 4 }}>

                        <Card sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            borderRadius: 3
                        }}>

                            <CardContent>

                                <PictureAsPdfIcon
                                    sx={{
                                        color: '#ec4899',
                                        fontSize: 35
                                    }}
                                />

                                <Typography color="gray">
                                    Total Reviews Exported
                                </Typography>

                                <Typography variant="h4" fontWeight="bold">
                                    {totalReviews}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>


                    <Grid size={{ xs: 12, sm: 4 }}>

                        <Card sx={{
                            bgcolor: '#19192f',
                            color: 'white',
                            borderRadius: 3
                        }}>

                            <CardContent>

                                <StarIcon
                                    sx={{
                                        color: '#fbbf24',
                                        fontSize: 35
                                    }}
                                />

                                <Typography color="gray">
                                    Average Rating
                                </Typography>

                                <Typography variant="h4" fontWeight="bold">
                                    {averageRating} / 5
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>


                {/* Chart */}

                <Paper
                    sx={{
                        bgcolor: '#19192f',
                        color: 'white',
                        p: 3,
                        borderRadius: 3,
                        mb: 4
                    }}
                >

                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Download Statistics
                    </Typography>

                    {chartData.length > 0 ? (

                        <Box sx={{ width: '100%', height: 300 }}>

                            <ResponsiveContainer>

                                <PieChart>

                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >

                                        {chartData.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />

                                        ))}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </Box>

                    ) : (

                        <Typography color="gray">
                            No chart data available
                        </Typography>

                    )}

                </Paper>


                {/* Download History */}

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                >
                    Download History
                </Typography>


                {downloads.length === 0 ? (

                    <Paper
                        sx={{
                            bgcolor: '#19192f',
                            color: 'gray',
                            p: 5,
                            textAlign: 'center',
                            borderRadius: 3
                        }}
                    >

                        <PictureAsPdfIcon sx={{ fontSize: 55 }} />

                        <Typography variant="h6" mt={2}>
                            No Downloads Yet
                        </Typography>

                        <Typography>
                            Download your movie reviews to see them here.
                        </Typography>

                    </Paper>

                ) : (

                    <Grid container spacing={3}>

                        {downloads.map(item => (

                            <Grid
                                size={{ xs: 12, md: 6, lg: 4 }}
                                key={item.id}
                            >

                                <Card
                                    sx={{
                                        bgcolor: '#19192f',
                                        color: 'white',
                                        borderRadius: 3,
                                        height: '100%'
                                    }}
                                >

                                    <CardContent>

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >

                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                            >

                                                <PictureAsPdfIcon
                                                    sx={{
                                                        fontSize: 35,
                                                        color: '#ef4444'
                                                    }}
                                                />

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{
                                                        wordBreak: 'break-word'
                                                    }}
                                                >
                                                    {item.fileName}
                                                </Typography>

                                            </Stack>

                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </Stack>

                                        <Divider
                                            sx={{
                                                my: 2,
                                                borderColor: '#383852'
                                            }}
                                        />

                                        <Typography color="gray" mb={1}>
                                            Downloaded At
                                        </Typography>

                                        <Typography mb={2}>
                                            {new Date(
                                                item.downloadedAt
                                            ).toLocaleString()}
                                        </Typography>

                                        <Typography color="gray">
                                            Total Reviews
                                        </Typography>

                                        <Typography fontWeight="bold" mb={2}>
                                            {item.totalReviews}
                                        </Typography>

                                        <Typography color="gray">
                                            Average Rating
                                        </Typography>

                                        <Typography fontWeight="bold">
                                            ⭐ {item.averageRating} / 5
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))}

                    </Grid>

                )}

            </Container>

        </Box>

    )

}

export default Download