import React from "react";

const ResponseCard = ({ price, paid, origin, dest, display }) => {
  if (display === false) {
    return null;
  }
  const roundtrip = origin + "/" + dest;

  if (price !== null && paid !== "") {
    //Percentage calculations
    let str = "";
    const percentage = Math.abs(Math.round((paid / price - 1) * 100));
    if (paid > price) {
      str = "more";
    } else {
      str = "less";
    }
    //start of actual return flow
    if (paid > price * 1.2) {
      return (
        <div class='ui error message'>
          <div className='header'>You paid more than average!</div>
          <p>
            The average price for the {roundtrip} roundtrip was ${price}, and
            you paid {percentage}% more!
          </p>
        </div>
      );
    } else if (paid > price * 0.9) {
      return (
        <div class='ui warning message'>
          <div class='header'>You got an average price!</div>
          <p>
            The average price for the {roundtrip} roundtrip was ${price}, and
            you paid {percentage}% {str}!
          </p>
        </div>
      );
    } else {
      return (
        <div class='ui success message'>
          <div class='header'>You got a good price!</div>
          <p>
            The average price for the {roundtrip} roundtrip was ${price}, and
            you paid {percentage}% {str}!
          </p>
        </div>
      );
    }
  } else {
    if (price !== null) {
      return (
        <div class='ui success message'>
          <div class='header'>Average price</div>
          <p>
            The average price for the {roundtrip} roundtrip was ${price}.
          </p>
        </div>
      );
    } else {
      return (
        <div class='ui error message'>
          <div class='header'>Couldn't find data</div>
          <p>
            Could not find data about the {roundtrip} trip. Either this route is
            not popular or there is an error with the airport codes!
          </p>
        </div>
      );
    }
  }
};

export default ResponseCard;
