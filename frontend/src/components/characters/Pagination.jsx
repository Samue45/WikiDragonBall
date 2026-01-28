import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const halfWindow = Math.floor(maxPagesToShow / 2);
    let start = currentPage - halfWindow;
    let end = currentPage + halfWindow;

    if (start < 1) {
      start = 1;
      end = maxPagesToShow;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxPagesToShow + 1;
    }

    if (start > 1) pages.push('...');
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages) pages.push('...');
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded bg-gray-800 border border-gray-700 text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <FiChevronLeft />
      </button>

      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-3 py-2 rounded transition ${
            page === currentPage
              ? 'bg-primary text-white border border-primary'
              : page === '...'
              ? 'text-gray-400 cursor-default'
              : 'bg-gray-800 border border-gray-700 text-white hover:border-primary'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded bg-gray-800 border border-gray-700 text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
