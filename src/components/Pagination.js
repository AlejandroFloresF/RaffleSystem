import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = ({ totalPages, visiblePageCount = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
    updateVisiblePages(page);
  };

  const updateVisiblePages = (page) => {
    const startPage = Math.max(1, page - Math.floor(visiblePageCount / 2));
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const newVisiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setVisiblePages(newVisiblePages);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {visiblePages.map(page => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;