import axiosService from '../api/axiosServices'

// Get all movies
export const getAllMoviesAPI = () => {
    return axiosService('GET', '/movies')
}

// Add movie
export const addMovieAPI = (data) => {
    return axiosService('POST', '/movies', data)
}

// Get single movie
export const getMovieAPI = (id) => {
    return axiosService('GET', `/movies/${id}`)
}

// Update movie
export const updateMovieAPI = (id, data) => {
    return axiosService('PUT', `/movies/${id}`, data)
}

// Delete movie
export const deleteMovieAPI = (id) => {
    return axiosService('DELETE', `/movies/${id}`)
}

// Add download history
export const addDownloadsAPI = (data) => {
    return axiosService('POST', '/downloads', data)
}

// Get all downloads
export const viewDownloadsAPI = () => {
    return axiosService('GET', '/downloads')
}

// Delete download history
export const deleteDownloadsAPI = (id) => {
    return axiosService('DELETE', `/downloads/${id}`)
}