import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default function Rating(props) {
  const { userRating, setBookState, currBookID } = props;

  const handleInput = (event) => {
    let newRating = event.target.id;
    newRating = newRating.slice(-1);
    setBookState((prev) => ({ ...prev, rating: newRating }));
  };

  const numberToStarRating = (rating) => {
    let count = 0;
    if (!rating) {
      rating = 0;
    }
    const emptyStars = 5 - rating;
    let starRating = [];
    //Add Solid Stars to Array
    for (let i = 0; i < rating; i++) {
      count++;
      starRating.push(
        <FontAwesomeIcon
          key={`star-${count}_full`}
          icon={faStarSolid}
          value={`star-${count}`}
          onClick={handleInput}
        />
      );
    }
    //Add Empty Starts to Array (totaling 5)
    for (let i = 0; i < emptyStars; i++) {
      count++;
      starRating.push(
        <FontAwesomeIcon
          key={`star-${count}_empty`}
          icon={faStarRegular}
          id={`star-${count}`}
          onClick={handleInput}
        />
      );
    }
    //Map to Render Array
    return starRating;
  };

  return (
    <span className="star_rating" id="rating">
      {numberToStarRating(userRating)}
    </span>
  );
}
