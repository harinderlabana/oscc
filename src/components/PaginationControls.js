// src/components/PaginationControls.js
import React from "react";

/**
 * PaginationControls Component
 * Renders the pagination UI for navigating through data.
 *
 * @param {object} props - The component props.
 * @param {number} props.currentPage - The current active page number.
 * @param {number} props.totalPages - The total number of available pages.
 * @param {number} props.totalResults - The total number of filtered results.
 * @param {number} props.itemsPerPage - The current number of items displayed per page.
 * @param {function} props.setCurrentPage - Function to update the current page.
 * @param {function} props.setItemsPerPage - Function to update the number of items per page.
 */
const PaginationControls = ({
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Previous Page Button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1} // Disable if on the first page
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page Info and Items Per Page Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages} ({totalResults} results)
        </span>
        <select
          value={itemsPerPage}
          onChange={setItemsPerPage} // Calls the handler from App.js
          className="py-1 px-2 border border-gray-300 rounded-md text-sm bg-white"
        >
          {/* Options for items per page, with unique keys */}
          <option key="5-per-page" value={5}>
            5 per page
          </option>
          <option key="10-per-page" value={10}>
            10 per page
          </option>
          <option key="25-per-page" value={25}>
            25 per page
          </option>
          <option key="50-per-page" value={50}>
            50 per page
          </option>
        </select>
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages} // Disable if on the last page
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
