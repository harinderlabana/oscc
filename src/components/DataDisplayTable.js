// src/components/DataDisplayTable.js
import React from "react";
import StarRating from "./StarRating"; // Import StarRating component
import SortIcon from "./common/SortIcon"; // Import SortIcon component from the common subfolder

/**
 * DataDisplayTable Component
 * Renders the table displaying care home data, including sortable headers.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.items - The array of care home objects to display in the table.
 * @param {function} props.requestSort - Function to call when a column header is clicked for sorting.
 * @param {object} props.sortConfig - Current sort configuration (key and direction).
 * @param {function} props.setSelectedHome - Function to call when a home's details button is clicked.
 */
const DataDisplayTable = ({
  items,
  requestSort,
  sortConfig,
  setSelectedHome,
}) => {
  // Helper component for sortable table headers. This is a nested component,
  // it's defined here because it's only used within DataDisplayTable.
  const SortableHeader = ({ label, sortKey }) => (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      <button
        onClick={() => requestSort(sortKey)}
        className="flex items-center gap-2 group whitespace-nowrap"
      >
        {label}{" "}
        <SortIcon
          direction={sortConfig.key === sortKey ? sortConfig.direction : null}
        />
      </button>
    </th>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader label="Home" sortKey="name" />
            <SortableHeader label="Location" sortKey="city" />
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Room Types
            </th>
            <SortableHeader label="Monthly Cost" sortKey="cost.min" />
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Subsidy Info
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reviews
            </th>
            <th scope="col" className="relative px-4 py-3">
              <span className="sr-only">Details</span>
            </th>{" "}
            {/* Empty header for details button column */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length > 0 ? ( // Conditional rendering based on whether there are items
            // Map over items to render each row
            items.map((home) => (
              <tr
                key={home.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3.5 align-top">
                  <div className="text-sm font-semibold text-gray-900 whitespace-normal">
                    {home.name}
                  </div>
                  <div
                    className={`mt-1 text-xs font-semibold inline-flex px-2 py-0.5 rounded-full ${
                      home.type === "Long Term Care"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {home.type}
                  </div>
                </td>
                <td className="px-4 py-3.5 align-top">
                  <div className="text-sm text-gray-900 whitespace-nowrap">
                    {home.city}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {home.county}
                  </div>
                </td>
                <td className="px-4 py-3.5 align-top">
                  <div className="flex flex-wrap gap-1">
                    {/* Ensure home.roomTypes is an array before mapping */}
                    {home.roomTypes &&
                      Array.isArray(home.roomTypes) &&
                      home.roomTypes.map((rt, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full mr-1"
                        >
                          {rt}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="px-4 py-3.5 align-top text-sm text-gray-800 font-medium whitespace-nowrap">
                  ${home.cost.min.toLocaleString()} - $
                  {home.cost.max.toLocaleString()}
                </td>
                <td className="px-4 py-3.5 align-top text-sm">
                  {home.subsidy.available ? (
                    <div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Subsidy Available
                      </span>
                      {/* Defensive check for home.waitlist before accessing its properties */}
                      {home.waitlist && (
                        <div className="text-gray-500 mt-1 text-xs whitespace-nowrap">
                          Waitlist: {home.waitlist.count} (
                          {home.waitlist.avgTimeMonths} mos)
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Private Pay
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5 align-top text-sm text-gray-800 font-medium">
                  {/* Render StarRating if socialSentiment.score exists */}
                  {home.socialSentiment?.score ? (
                    <div className="flex items-center">
                      <StarRating rating={home.socialSentiment.score} />
                      <span className="ml-1 text-xs text-gray-700">
                        ({home.socialSentiment.score})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3.5 align-top text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedHome(home)}
                    className="text-indigo-600 hover:text-indigo-900 font-bold"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // Message displayed when no homes are found
            <tr>
              <td colSpan="7" className="text-center py-12 px-6">
                <h3 className="text-lg font-medium text-gray-700">
                  No homes found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplayTable;
