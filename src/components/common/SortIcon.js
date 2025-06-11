// src/components/common/SortIcon.js
import React from "react";

/**
 * SortIcon Component
 * Renders an SVG sorting icon that changes based on the sort direction.
 *
 * @param {object} props - The component props.
 * @param {string} [props.direction] - The current sort direction ('ascending', 'descending', or null/undefined for no sort).
 */
const SortIcon = ({ direction }) => {
  if (!direction) {
    // Default icon when no sort is applied (up and down arrows)
    return (
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
        ></path>
      </svg>
    );
  }
  if (direction === "ascending") {
    // Up arrow icon for ascending sort
    return (
      <svg
        className="w-4 h-4 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 15l7-7 7 7"
        ></path>
      </svg>
    );
  }
  // Down arrow icon for descending sort
  return (
    <svg
      className="w-4 h-4 text-indigo-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
};

export default SortIcon;
