import React from "react";
import ReactPaginate from "react-paginate";
export default ({
  onPageChange,
  pageNumber,
  pageSize,
  total,
  isInfinity,
  color = "##00BCD4",
}) => {
  const firstEntry = total > 0 ? pageNumber * pageSize + 1 : 0;
  const lastEntry = Math.min(pageSize * (pageNumber + 1), total);
  return (
    <div className="d-md-flex align-items-center justify-content-between mt-1">
      <div className="show-result">
        Viewing <span className="show-result-current">{firstEntry}</span> to{" "}
        <span className="show-result-number">{lastEntry}</span> of{" "}
        <span className="show-result-total">{total}</span> entries
      </div>
      <nav className="ml-0 ml-md-2 mt-3 mt-md-0" aria-label="Page navigation">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageClassName={"page-item"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          breakClassName={"page-item"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          pageCount={Math.ceil(total / Math.max(pageSize, 1))}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active makeActive"}
          forcePage={pageNumber}
          initialPage={0}
          isInfinity={true}
        />
      </nav>
    </div>
  );
};
