import React from 'react'

// ⭐ Star Rating Component
export default function StarRating({ rating }) {
  // Clamp rating between 0 and 5 just to be safe
  const safeRating = Math.max(0, Math.min(5, rating));
  const intPart = Math.floor(safeRating);
  const decimal = safeRating - intPart;

  let fullStars = intPart;
  let halfStars = 0;

  if (decimal === 0) {
    // exact integer, do nothing extra
  } else if (decimal < 0.5) {
    // e.g. 4.3 -> 4 full + 1 half
    halfStars = 1;
  } else {
    // e.g. 3.7 -> round up to 4 full
    fullStars = Math.min(5, Math.round(safeRating));
  }

  const totalUsed = fullStars + halfStars;
  const emptyStars = Math.max(0, 5 - totalUsed);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-lg text-yellow-400">
          ★
        </span>
      ))}

      {/* Half star */}
      {halfStars === 1 && (
        <span className="relative text-lg">
          {/* Left half (yellow) */}
          <span className="absolute inset-0 w-1/2 overflow-hidden text-yellow-400">
            ★
          </span>
          {/* Base star (gray) */}
          <span className="text-gray-300">★</span>
        </span>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-lg text-gray-300">
          ★
        </span>
      ))}

      {/* Numeric rating */}
      <span className="text-sm text-muted-foreground ml-1">
        {safeRating.toFixed(1)}
      </span>
    </div>
  );
};