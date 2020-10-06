import React from "react";
import _ from "lodash";

const Paginator = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log("pages Count", pagesCount);
  if (pagesCount === 1 || pagesCount === 0) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example" style={{ cursor: "pointer" }}>
      <ul className="pagination pg-teal">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a onClick={() => onPageChange(1)} className="page-link">
            First
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pagesCount ? "disabled" : ""
          }`}
        >
          <a
            onClick={() => onPageChange(currentPage + 1)}
            className="page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
        <li
          className={`page-item ${
            currentPage === pagesCount ? "disabled" : ""
          }`}
        >
          <a onClick={() => onPageChange(pagesCount)} className="page-link">
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
