import React, { useState, useMemo, useEffect, useRef } from "react";

// IMPORTANT: This line imports your full dataset from the generated ontarioCareHomes.js file.
// Make sure this file exists in the correct path relative to App.js (e.g., in src/).
import ontarioCareHomesData from "./ontarioCareHomes.js";

// Import all your new component files from the 'components' folder
// ENSURE THESE PATHS EXACTLY MATCH YOUR FILE LOCATIONS
import HomeDetailsModal from "./components/HomeDetailsModal";
import FAQ from "./components/FAQ";
import Legal from "./components/Legal";
import ContactUs from "./components/ContactUs";
import Filters from "./components/Filters";
import DataDisplayTable from "./components/DataDisplayTable";
import PaginationControls from "./components/PaginationControls";

export default function App() {
  // Initial state for all filters, reset to these values
  const initialFilters = {
    search: "",
    county: "All",
    type: "All",
    roomType: "All",
    minCost: "",
    maxCost: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  // State for sorting the table data
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  }); // Default sort by name

  // State to manage the currently selected home for the detail modal
  const [selectedHome, setSelectedHome] = useState(null);

  // State for pagination: current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State to manage which main view is active ('directory', 'faq', 'legal', 'contact')
  const [activeView, setActiveView] = useState("directory");

  // State to control scrolling within the Legal page to specific sections
  const [legalScrollToId, setLegalScrollToId] = useState(null);

  // State to track loading status
  const [loading, setLoading] = useState(true); // Initialized to true, can be set to false in useEffect if no async data fetch

  // Ref to enable smooth scrolling to the top of the content area when filters/sort change
  const contentTopRef = useRef(null);

  // useEffect to handle initial loading state (can be removed if no async fetch)
  useEffect(() => {
    setLoading(false); // Set loading to false once initial data is ready
  }, []); // Empty dependency array means this runs once on mount

  // Handler for changes in filter inputs (search, dropdowns)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Handler for changing items per page dropdown
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handler for requesting a sort on a column
  const requestSort = (key) => {
    let direction = "ascending";
    // If already sorted by this key, toggle direction. If descending, reset to no sort.
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "none"; // Cycle to 'none' for a third click
      key = null; // Clear sort key
    }
    setSortConfig({ key, direction });
  };

  // Function to reset all filters and sort order to initial state
  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSortConfig({ key: "name", direction: "ascending" }); // Reset sort as well
    setCurrentPage(1);
  };

  // Memoized function to filter and sort the data based on current filters and sort config
  // This recalculates only when filters, sortConfig, currentPage, or itemsPerPage change, optimizing performance.
  const { paginatedItems, totalPages, totalResults } = useMemo(() => {
    // Data source is now explicitly 'ontarioCareHomesData' from the import.
    const dataToFilter = ontarioCareHomesData;

    let sortableItems = [...dataToFilter].filter((home) => {
      const searchLower = filters.search.toLowerCase();

      // Corrected search logic:
      // An item matches the search IF:
      // 1. The search input is empty OR
      // 2. The home's name contains the search term OR
      // 3. The home's city contains the search term OR
      // 4. The home's county (if it exists) contains the search term.
      const matchesSearch =
        searchLower === "" || // If search input is empty, don't filter by search term
        (home.name && home.name.toLowerCase().includes(searchLower)) || // Check name
        (home.city && home.city.toLowerCase().includes(searchLower)) || // Check city
        (home.county && home.county.toLowerCase().includes(searchLower)); // Check county

      // Check if county filter matches
      const matchesCounty =
        filters.county === "All" || home.county === filters.county;

      // Check if home type filter matches
      const matchesType = filters.type === "All" || home.type === filters.type;

      // Check if room type filter matches (defensive check for home.roomTypes and ensures it's an array)
      const matchesRoomType =
        filters.roomType === "All" ||
        (home.roomTypes &&
          Array.isArray(home.roomTypes) &&
          home.roomTypes.includes(filters.roomType));

      // Apply cost range filter
      let matchesCost = true;
      if (filters.minCost !== "" || filters.maxCost !== "") {
        const minFilter = parseFloat(filters.minCost) || 0; // Default to 0 if minCost is empty/invalid
        const maxFilter = parseFloat(filters.maxCost) || Infinity; // Default to Infinity if maxCost is empty/invalid

        matchesCost = home.cost.max >= minFilter && home.cost.min <= maxFilter;
      }

      return (
        matchesSearch &&
        matchesCounty &&
        matchesType &&
        matchesRoomType &&
        matchesCost
      );
    });

    const totalResults = sortableItems.length; // Get total results after filtering

    // Apply sorting if a sort key is selected
    // Modified sorting logic for stability
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue;
        let bValue;

        // Determine values for comparison
        if (sortConfig.key === "cost.min") {
          aValue = a.cost.min;
          bValue = b.cost.min;
        } else if (sortConfig.key === "socialSentiment.score") {
          aValue = a.socialSentiment?.score;
          bValue = b.socialSentiment?.score;
        } else if (sortConfig.key.includes(".")) {
          const [parent, child] = sortConfig.key.split(".");
          aValue = a[parent]?.[child];
          bValue = b[parent]?.[child];
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        // Handle undefined or null values (push them to the end or beginning)
        if (aValue === undefined || aValue === null)
          return sortConfig.direction === "ascending" ? 1 : -1;
        if (bValue === undefined || bValue === null)
          return sortConfig.direction === "ascending" ? -1 : 1;

        // Numeric comparison
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }

        // String comparison (case-insensitive)
        if (String(aValue).toLowerCase() < String(bValue).toLowerCase()) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (String(aValue).toLowerCase() > String(bValue).toLowerCase()) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        // Secondary sort by ID for stability if primary sort values are equal
        return a.id - b.id; // Ensures consistent order for otherwise equal items
      });
    } else {
      // If no explicit sort key is selected, ensure a consistent default order (e.g., by ID)
      sortableItems.sort((a, b) => a.id - b.id);
    }

    // Calculate total pages and slice data for current page
    const totalPages = Math.ceil(sortableItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      paginatedItems: sortableItems.slice(startIndex, endIndex),
      totalPages,
      totalResults,
    };
  }, [filters, sortConfig, currentPage, itemsPerPage, ontarioCareHomesData]); // Dependency on ontarioCareHomesData

  // Effect to scroll to the top of the content area when filters or sort config change
  useEffect(() => {
    if (contentTopRef.current) {
      contentTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filters, sortConfig]);

  // Generate unique lists for dropdown filters based on the dataset
  const counties = [
    "All",
    ...Array.from(new Set(ontarioCareHomesData.map((h) => h.county))).sort(),
  ];
  const types = [
    "All",
    ...Array.from(new Set(ontarioCareHomesData.map((h) => h.type))).sort(),
  ];
  const allRoomTypes = [
    "All",
    ...Array.from(
      new Set(ontarioCareHomesData.flatMap((h) => h.roomTypes || []))
    ).sort(),
  ]; // Use flatMap to handle arrays of roomTypes correctly

  // Generate cost options for min/max dropdowns
  const generateCostOptions = () => {
    const options = [""]; // Empty option for "Any" or no selection
    for (let i = 0; i <= 10000; i += 500) {
      options.push(i.toString());
    }
    for (let i = 11000; i <= 20000; i += 1000) {
      options.push(i.toString());
    }
    return options;
  };
  const costOptions = generateCostOptions();

  // Handler for navigation links in the footer, sets active view and scroll target for Legal page
  const handleFooterLinkClick = (view, sectionId = null) => {
    setActiveView(view);
    setLegalScrollToId(sectionId);
  };

  // Renders the content based on the active view state
  const renderContent = () => {
    switch (activeView) {
      case "directory":
        return (
          <>
            {/* Filters Component */}
            <Filters
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              counties={counties}
              types={types}
              allRoomTypes={allRoomTypes}
              costOptions={costOptions}
            />
            {/* Data Display Table Component */}
            <DataDisplayTable
              items={paginatedItems}
              requestSort={requestSort}
              sortConfig={sortConfig}
              setSelectedHome={setSelectedHome}
            />
            {/* Pagination Controls Component */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={handleItemsPerPageChange}
            />
          </>
        );
      case "faq":
        return <FAQ />;
      case "legal":
        return <Legal scrollToId={legalScrollToId} />;
      case "contact":
        return <ContactUs />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Global CSS animations for smooth transitions */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes scale-up-center { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .transform.scale-up-center { animation: scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both; }
        /* Hide spinner for number inputs */
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
        {/* Header Section */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2 sm:mb-0">
              SeniorCare Ontario
            </h1>
            {/* Main Navigation */}
            <nav className="space-x-4">
              <button
                onClick={() => setActiveView("directory")}
                className={`text-gray-600 hover:text-indigo-700 font-medium ${
                  activeView === "directory"
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : ""
                }`}
              >
                Directory
              </button>
              <button
                onClick={() => setActiveView("faq")}
                className={`text-gray-600 hover:text-indigo-700 font-medium ${
                  activeView === "faq"
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : ""
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() =>
                  handleFooterLinkClick("legal", "terms-of-service-section")
                }
                className={`text-gray-600 hover:text-indigo-700 font-medium ${
                  activeView === "legal" &&
                  legalScrollToId === "terms-of-service-section"
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : ""
                }`}
              >
                Legal
              </button>
              <button
                onClick={() => setActiveView("contact")}
                className={`text-gray-600 hover:text-indigo-700 font-medium ${
                  activeView === "contact"
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : ""
                }`}
              >
                Contact Us
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto p-4" ref={contentTopRef}>
          {renderContent()} {/* Renders the active view */}
        </main>

        {/* Home Details Modal (conditionally rendered) */}
        {selectedHome && (
          <HomeDetailsModal
            home={selectedHome}
            onClose={() => setSelectedHome(null)}
          />
        )}

        {/* Footer Section */}
        <footer className="bg-white shadow-md mt-6 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>
              © {new Date().getFullYear()} Ontario SeniorCare Compass. All
              rights reserved.
            </p>
            <p className="mt-2">
              <button
                onClick={() =>
                  handleFooterLinkClick("legal", "terms-of-service-section")
                }
                className="text-indigo-600 hover:underline mx-2"
              >
                Terms of Service
              </button>{" "}
              |
              <button
                onClick={() =>
                  handleFooterLinkClick("legal", "privacy-policy-section")
                }
                className="text-indigo-600 hover:underline mx-2"
              >
                Privacy Policy
              </button>{" "}
              |
              <button
                onClick={() => handleFooterLinkClick("contact")}
                className="text-indigo-600 hover:underline mx-2"
              >
                Contact Us
              </button>
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Disclaimer: The information provided on this website is for
              general informational purposes only and may not be entirely
              up-to-date. Please verify all details directly with the care homes
              or relevant authorities.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
