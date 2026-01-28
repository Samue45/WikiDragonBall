import React from 'react';
import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating = 0, onRatingChange, readOnly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readOnly && onRatingChange(star)}
          disabled={readOnly}
          className={`text-2xl transition ${
            star <= rating ? 'text-yellow-400' : 'text-gray-600'
          } ${!readOnly && 'hover:text-yellow-300 cursor-pointer'}`}
        >
          <FiStar fill={star <= rating ? 'currentColor' : 'none'} />
        </button>
      ))}
      <span className="ml-2 text-gray-400">{rating}/5</span>
    </div>
  );
};

export default StarRating;
