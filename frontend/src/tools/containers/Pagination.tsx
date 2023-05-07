// Pagination.tsx
import React from "react";
import Paginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <Paginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName="pagination"
      activeClassName="active"
      previousLabel="上一页"
      nextLabel="下一页"
    />
  );
};

export default Pagination;
