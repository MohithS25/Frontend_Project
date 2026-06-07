function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show max 5 page numbers around current page
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages
    if (currentPage <= 3) return pages.slice(0, 5)
    if (currentPage >= totalPages - 2) return pages.slice(-5)
    return pages.slice(currentPage - 3, currentPage + 2)
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center gap-1 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        ← Previous
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1.5 rounded border text-sm hover:bg-gray-100">1</button>
          {visiblePages[0] > 2 && <span className="px-1 text-gray-400">…</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded border text-sm transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-gray-400">…</span>
          )}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1.5 rounded border text-sm hover:bg-gray-100">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination
