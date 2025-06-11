// src/components/Filters.js
import React from "react";
import SearchIcon from "./common/SearchIcon"; // Import the SearchIcon component from the common subfolder

/**
 * Filters Component
 * Renders the filter controls for the care home directory, including
 * search, county, home type, room type, and min/max cost dropdowns.
 * Improved to be responsive and prevent cutoff on smaller screens.
 *
 * @param {object} props - The component props.
 * @param {object} props.filters - Current filter state object (e.g., { search: '', county: 'All', ... }).
 * @param {function} props.handleFilterChange - Function to update filter state.
 * @param {function} props.handleResetFilters - Function to reset all filters.
 * @param {Array<string>} props.counties - List of available counties for the dropdown.
 * @param {Array<string>} props.types - List of available home types for the dropdown.
 * @param {Array<string>} props.allRoomTypes - List of all unique room types for the dropdown.
 * @param {Array<string>} props.costOptions - List of cost options for min/max dropdowns.
 */
const Filters = ({
  filters,
  handleFilterChange,
  handleResetFilters,
  counties,
  types,
  allRoomTypes,
  costOptions,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 pb-2">
        {/* Search Filter - allow it to take full width on small screens, smaller on md+ */}
        <div className="w-full md:w-auto flex-grow">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search by Name, City, or County
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="e.g., Allendale or Toronto"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base placeholder-gray-400"
            />
          </div>
        </div>

        {/* Dropdowns - set responsive widths */}
        <div className="w-full sm:w-1/2 md:w-48">
          <label
            htmlFor="county"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            County / Region
          </label>
          <select
            name="county"
            id="county"
            value={filters.county}
            onChange={handleFilterChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
          >
            {counties.map((c, index) => (
              <option key={`${c}-${index}`} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2 md:w-48">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Home Type
          </label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
          >
            {types.map((t, index) => (
              <option key={`${t}-${index}`} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2 md:w-48">
          <label
            htmlFor="roomType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Room Type
          </label>
          <select
            name="roomType"
            id="roomType"
            value={filters.roomType}
            onChange={handleFilterChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
          >
            {allRoomTypes.map((t, index) => (
              <option key={`${t}-${index}`} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Min Cost Dropdown - Take half width on small, fixed width on md+ */}
        <div className="w-full sm:w-1/2 md:w-32">
          <label
            htmlFor="minCost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Cost
          </label>
          <select
            name="minCost"
            id="minCost"
            value={filters.minCost}
            onChange={handleFilterChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
          >
            {costOptions.map((option) => (
              <option key={`min-${option}`} value={option}>
                {option === ""
                  ? "Any"
                  : `$${parseInt(option).toLocaleString()}`}
              </option>
            ))}
          </select>
        </div>

        {/* Max Cost Dropdown - Take half width on small, fixed width on md+ */}
        <div className="w-full sm:w-1/2 md:w-32">
          <label
            htmlFor="maxCost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Cost
          </label>
          <select
            name="maxCost"
            id="maxCost"
            value={filters.maxCost}
            onChange={handleFilterChange}
            className="w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
          >
            {costOptions.map((option) => (
              <option key={`max-${option}`} value={option}>
                {option === ""
                  ? "Any"
                  : `$${parseInt(option).toLocaleString()}`}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button - Adjusted sizing and text */}
        {/* On small screens, it takes full width but has less vertical padding.
            On medium+ screens, it's auto width and aligns by md:pt-7. */}
        <div className="w-full sm:w-auto md:pt-7">
          {" "}
          {/* Adjusted width for small screens */}
          <button
            onClick={handleResetFilters}
            className="w-full py-2 sm:py-2.5 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
