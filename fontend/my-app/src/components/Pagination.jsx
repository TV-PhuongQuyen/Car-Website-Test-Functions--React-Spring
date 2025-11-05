import "../assets/styles/pagination.css"
import { useState } from "react"

export default function Pagination() {
    const totalPages = 11 // fix tổng số trang
    const [currentPage, setCurrentPage] = useState(1)
    const maxPagesToShow = 5

    const handlePageClick = (page) => {
        if (page === '...') return
        setCurrentPage(page)
    }

    const renderPagination = () => {
        let pages = []

        if (totalPages <= maxPagesToShow + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1)
            let start = Math.max(currentPage - 2, 2)
            let end = Math.min(currentPage + 2, totalPages - 1)

            if (start > 2) pages.push('...')
            for (let i = start; i <= end; i++) pages.push(i)
            if (end < totalPages - 1) pages.push('...')
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="pagination">
            <button className="page-button" onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}><i className='bx bx-chevron-left'></i></button>
            {renderPagination().map((page, idx) => (
                <button
                    key={idx}
                    className={`page-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button className="page-button" onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}><i className='bx bx-chevron-right'></i></button>
        </div>
    )
}
