
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import {
    Box,
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import MovieIcon from '@mui/icons-material/Movie'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DownloadIcon from '@mui/icons-material/Download'
import TheatersIcon from '@mui/icons-material/Theaters'

const drawerWidth = 250

function Sidebar() {

    const location = useLocation()

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <DashboardIcon />
        },
        {
            title: 'Movie List',
            path: '/movies',
            icon: <MovieIcon />
        },
        {
            title: 'Add Movie',
            path: '/add-movie',
            icon: <AddCircleIcon />
        },
        {
            title: 'Watchlist',
            path: '/watchlist',
            icon: <BookmarkIcon />
        },
        {
            title: 'Calendar',
            path: '/calendar',
            icon: <CalendarMonthIcon />
        },
        {
            title: 'Downloads',
            path: '/downloads',
            icon: <DownloadIcon />
        }
    ]

    const isActive = (path) => {
        if (path === '/movies') {
            return location.pathname === '/movies' ||
                location.pathname.startsWith('/view/') ||
                location.pathname.startsWith('/edit/')
        }

        return location.pathname === path
    }

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#111124',
                    color: '#ffffff',
                    borderRight: '1px solid #292944'
                }
            }}
        >

            {/* Sidebar Header */}

            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    py: 2
                }}
            >

                <TheatersIcon
                    sx={{
                        fontSize: 32,
                        color: '#a78bfa'
                    }}
                />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        color: '#a78bfa',
                        letterSpacing: 1
                    }}
                >
                    CineTrack
                </Typography>

            </Toolbar>

            <Divider sx={{ borderColor: '#292944' }} />

            {/* Navigation Menu */}

            <Box sx={{ px: 2, py: 2 }}>

                <Typography
                    variant="caption"
                    sx={{
                        color: '#8888a8',
                        px: 2,
                        fontWeight: 'bold',
                        letterSpacing: 1
                    }}
                >
                    MAIN MENU
                </Typography>

            </Box>

            <List sx={{ px: 1 }}>

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            py: 1.5,

                            backgroundColor: isActive(item.path)
                                ? '#292044'
                                : 'transparent',

                            color: isActive(item.path)
                                ? '#a78bfa'
                                : '#b8b8ce',

                            '&:hover': {
                                backgroundColor: '#211d38',
                                color: '#a78bfa'
                            },

                            '& .MuiListItemIcon-root': {
                                color: isActive(item.path)
                                    ? '#a78bfa'
                                    : '#8888a8',
                                minWidth: 42
                            }
                        }}
                    >

                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: isActive(item.path)
                                    ? 'bold'
                                    : 'medium'
                            }}
                        />

                    </ListItemButton>

                ))}

            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ borderColor: '#292944' }} />

            {/* Footer */}

            <Box sx={{ p: 2, textAlign: 'center' }}>

                <Typography
                    variant="caption"
                    sx={{ color: '#77778f' }}
                >
                    CineTrack Movie Manager
                </Typography>

                <Typography
                    variant="caption"
                    display="block"
                    sx={{ color: '#555570', mt: 0.5 }}
                >
                    Version 1.0.0
                </Typography>

            </Box>

        </Drawer>

    )
}

export default Sidebar
