// src/components/StarRating.js
import React from "react";

/**
 * StarRating Component
 * Renders a visual star rating based on a numeric score (e.g., 3.5 stars).
 * Displays full stars, a half star if applicable, and empty stars to total 5.
 *
 * @param {object} props - The component props.
 * @param {number} props.rating - The numerical rating to display (e.g., 3.5).
 */
const StarRating = ({ rating }) => {
  // Calculate the number of full stars
  const fullStars = Math.floor(rating);
  // Check if there's a half star (fractional part of the rating)
  const hasHalfStar = rating % 1 !== 0;
  // Calculate the number of empty stars needed to make a total of 5 stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      {/* Render half star if applicable */}
      {hasHalfStar && (
        <svg
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69L10 2.927z" />
          <path
            fillRule="evenodd"
            d="M10 2.477c.376-1.166 2.103-1.166 2.479 0l1.244 3.824a1 1 0 00.937.677h4.019c1.116 0 1.579 1.442.665 2.115l-3.24 2.355a1 1 0 00-.376 1.134l1.244 3.824c.376 1.166-.88 2.13-1.823 1.43l-3.24-2.355a1 1 0 00-1.167 0l-3.24 2.355c-.943.7-2.199-.264-1.823-1.43l1.244-3.824a1 1 0 00-.376-1.134L.937 7.093c-.914-.673-.451-2.115.665-2.115h4.019a1 1 0 00.937-.677l1.244-3.824zM10 5.477V2.927l-.539 1.657a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
