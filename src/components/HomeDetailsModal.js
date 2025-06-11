// src/components/HomeDetailsModal.js
import React from "react";
import StarRating from "./StarRating"; // Import StarRating component

/**
 * HomeDetailsModal Component
 * Displays detailed information about a selected care home in a modal pop-up.
 * Features a clean, robust layout designed to prevent blank screens.
 *
 * @param {object} props - The component props.
 * @param {object} props.home - The care home object containing its details.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 */
const HomeDetailsModal = ({ home, onClose }) => {
  // Don't render anything if no home object is provided
  if (!home) return null;

  // Helper function to generate Google Maps directions URL
  const getDirectionsUrl = () => {
    const encodedAddress = encodeURIComponent(
      `${home.address}, ${home.city}, Ontario, Canada`
    );
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  // Helper function to generate Google search URL for reviews
  const getGoogleReviewsSearchUrl = () => {
    const encodedQuery = encodeURIComponent(
      `${home.name} ${home.city} Ontario reviews`
    );
    return `https://www.google.com/search?q=${encodedQuery}&tbm=lcl`; // tbm=lcl for local search results
  };

  // Determine sentiment color based on score
  const sentimentColor =
    home.socialSentiment?.score >= 4.5
      ? "text-green-500"
      : home.socialSentiment?.score >= 3.8
      ? "text-blue-500"
      : "text-orange-500";

  return (
    // Outer modal container: fixed position, covers viewport, centered
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      {/* Modal content area: background, rounded corners, shadow, max-width, flex column layout, max-height, internal scrolling */}
      <div className="bg-white rounded-xl shadow-2xl p-5 w-full max-w-lg mx-auto flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="relative pb-3 border-b-2 border-blue-200 mb-4 flex-shrink-0">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-900 pr-10">
            {home.name}
          </h3>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 bg-gray-100 hover:bg-gray-200"
            aria-label="Close details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Scrollable Modal Body */}
        {/* This section will handle overflow if content is too long for the modal's max-height */}
        <div className="flex-grow overflow-y-auto pr-2 -mr-2 text-gray-700 text-sm">
          {" "}
          {/* pr-2 -mr-2 creates custom scrollbar space */}
          {/* Basic Home Info */}
          <div className="space-y-1 mb-4">
            {" "}
            {/* Adjusted margin-bottom */}
            <p>
              <strong>Home Type:</strong>{" "}
              <span className="font-medium text-blue-700">{home.type}</span>
            </p>
            <p>
              <strong>Ownership:</strong> {home.ownership}
            </p>
            <p>
              <strong>Address:</strong> {home.address}, {home.city}, ON,{" "}
              {home.county}
            </p>
          </div>
          {/* Monthly Cost & Room Types */}
          <div className="border-t border-gray-200 pt-3 mb-4">
            {" "}
            {/* Adjusted padding-top and margin-bottom */}
            <p>
              <strong>Monthly Cost:</strong>{" "}
              <span className="font-semibold">
                ${home.cost.min.toLocaleString()} - $
                {home.cost.max.toLocaleString()} / mo
              </span>
            </p>
            <p className="mt-1">
              {" "}
              {/* Added margin-top for spacing */}
              <strong>Room Types:</strong>{" "}
              {home.roomTypes &&
                Array.isArray(home.roomTypes) &&
                home.roomTypes.map((rt, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full mr-1 my-0.5"
                  >
                    {rt}
                  </span>
                ))}
            </p>
          </div>
          {/* Subsidy Info & Waitlist */}
          <div className="border-t border-gray-200 pt-3 mb-4">
            {" "}
            {/* Adjusted padding-top and margin-bottom */}
            <p>
              <strong>Subsidy Info:</strong>{" "}
              {home.subsidy.available ? (
                <span className="font-semibold text-blue-600">
                  Subsidy Available: {home.subsidy.details}
                </span>
              ) : (
                <span className="font-semibold text-gray-600">
                  Private Pay: {home.subsidy.details}
                </span>
              )}
            </p>
            {home.type === "Long Term Care" && home.waitlist && (
              <p className="mt-1">
                <strong>Waitlist:</strong> {home.waitlist.count} people (
                {home.waitlist.avgTimeMonths} mos avg)
              </p>
            )}
          </div>
          {/* Amenities Section */}
          {home.amenities && home.amenities.length > 0 && (
            <div className="border-t border-gray-200 pt-3 mb-4">
              {" "}
              {/* Adjusted padding-top and margin-bottom */}
              <h4 className="font-semibold text-gray-700 mb-2 text-base">
                Amenities
              </h4>
              <ul className="list-disc list-inside text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5 text-sm">
                {home.amenities.map((am, idx) => (
                  <li key={idx}>{am}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Location & Directions Section */}
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-700 mb-2 text-base">
              Location & Directions
            </h4>
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center relative rounded-md overflow-hidden group"
              aria-label={`View ${home.name} on Google Maps`}
            >
              <img
                src="https://placehold.co/400x120/cccccc/000000?text=View+Map"
                alt="Map Placeholder"
                className="w-full h-28 object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-200">
                <span className="text-white text-base font-bold">View Map</span>
                <span className="text-white text-xs mt-1">Get Directions</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>
            <p className="text-xs text-gray-600 mt-2">
              Click the image above to open the location in Google Maps.
            </p>
          </div>
          {/* Reviews Section */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-4">
            <h4 className="font-semibold text-gray-700 mb-2 text-base">
              Google Reviews
            </h4>
            <div className="flex items-center mb-2">
              <StarRating rating={home.socialSentiment?.score} />
              <p className={`font-bold text-base ml-1 ${sentimentColor}`}>
                {home.socialSentiment?.score}/5.0{" "}
                <span className="text-xs text-gray-600 font-normal">
                  ({home.socialSentiment?.summary})
                </span>
              </p>
            </div>
            {home.sampleReviews && home.sampleReviews.length > 0 && (
              <div className="mt-2 space-y-2">
                {home.sampleReviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-800 font-semibold">
                        {review.author}
                      </span>
                      <div className="flex items-center">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-gray-600 ml-1">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 leading-normal">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <a
              href={getGoogleReviewsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline text-xs flex items-center mt-3 pt-3 border-t border-gray-200"
            >
              See all Google reviews
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <p className="text-xs text-gray-500 mt-1">
              Note: Direct review links require specific data not always
              publicly available.
            </p>
          </div>
        </div>{" "}
        {/* End Scrollable Modal Body */}
        {/* Modal Footer (Action Buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t mt-auto flex-shrink-0">
          {home.websiteUrl && (
            <a
              href={home.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block bg-gray-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-700 transition duration-150 text-sm"
            >
              Visit Website
            </a>
          )}
          {home.inspectionUrl && (
            <a
              href={home.inspectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-indigo-700 transition duration-150 text-sm"
            >
              Official Inspection Portal
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeDetailsModal;
