import React from "react";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <span
      key={index}
      className={`${
        index < rating ? "text-yellow-400" : "text-gray-300"
      } text-xl`}
    >
      &#9733;
    </span>
  ));

  return <div className="flex gap-0.5">{stars}</div>;
};

export default StarRating;
