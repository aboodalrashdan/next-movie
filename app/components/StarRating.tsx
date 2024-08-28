import React from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStar;

  return (
    <div className={styles.starRating}>
      {[...Array(filledStars)].map((_, index) => (
        <span key={`filled-${index}`} className={styles.filledStar}>★</span>
      ))}
      {halfStar ? <span key="half" className={styles.halfStar}>★</span> : null}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className={styles.emptyStar}>★</span>
      ))}
    </div>
  );
};

export default StarRating;
