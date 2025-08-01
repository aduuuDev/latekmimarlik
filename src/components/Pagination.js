import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div
      className="pagination clearfix"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      {/* Previous Page */}
      {currentPage > 1 && (
        <div className="previus-post">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          >
            <i className="fa fa-angle-left"></i> Previous Page
          </a>
        </div>
      )}

      {/* Page Numbers */}
      <div
        className="page-numbers"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <a
            key={page}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
            className={page === currentPage ? "current" : ""}
            style={{
              display: "inline-block",
              padding: "8px 12px",
              margin: "0 4px",
              textDecoration: "none",
              border:
                page === currentPage ? "1px solid #111111" : "1px solid #ddd",
              backgroundColor: page === currentPage ? "#111111" : "transparent",
              color: page === currentPage ? "#ffffff" : "#111111",
              borderRadius: "3px",
              fontSize: "14px",
              minWidth: "35px",
              textAlign: "center",
            }}
          >
            {page}
          </a>
        ))}
      </div>

      {/* Next Page */}
      {currentPage < totalPages && (
        <div className="next-post">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          >
            Next Page <i className="fa fa-angle-right"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default Pagination;
