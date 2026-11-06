import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const DownloadReview = (movies) => {

    const reviewedMovies = movies.filter(
        movie => movie.review && movie.review.trim() !== ''
    )

    if (reviewedMovies.length === 0) {
        alert('No movie reviews available to download!')
        return null
    }

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    })

    const averageRating = (
        reviewedMovies.reduce(
            (total, movie) => total + (Number(movie.rating) || 0),
            0
        ) / reviewedMovies.length
    ).toFixed(1)

    doc.setFontSize(22)
    doc.text('CineTrack - My Movie Reviews', 14, 20)

    doc.setFontSize(11)
    doc.text(`Total Reviews: ${reviewedMovies.length}`, 14, 30)
    doc.text(`Average Rating: ${averageRating} / 5`, 14, 37)
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 44)

    autoTable(doc, {
        startY: 52,
        head: [[
            'Movie',
            'Genre',
            'Year',
            'Rating',
            'Watched Date',
            'My Review'
        ]],
        body: reviewedMovies.map(movie => [
            movie.title || '-',
            movie.genre || '-',
            movie.year || '-',
            `${movie.rating || 0}/5`,
            movie.watchDate || '-',
            movie.review || '-'
        ]),
        styles: {
            fontSize: 9,
            cellPadding: 3,
            overflow: 'linebreak'
        },
        headStyles: {
            fillColor: [139, 92, 246]
        },
        columnStyles: {
            5: { cellWidth: 90 }
        }
    })

    const fileName = `CineTrack-Reviews-${Date.now()}.pdf`

    doc.save(fileName)

    return {
        fileName,
        totalReviews: reviewedMovies.length,
        averageRating: Number(averageRating),
        downloadedAt: new Date().toISOString()
    }
}

export default DownloadReview