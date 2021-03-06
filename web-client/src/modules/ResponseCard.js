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
        <div className='ui error message'>
          <div className='header'>You paid more than most people!</div>
          <p>
            The median price for the {roundtrip} roundtrip was ${price}, and you
            paid {percentage}% more!
          </p>
        </div>
      );
    } else if (paid > price * 0.9) {
      return (
        <div className='ui warning message'>
          <div className='header'>You got an OK price!</div>
          <p>
            The median price for the {roundtrip} roundtrip was ${price}, and you
            paid {percentage}% {str}!
          </p>
        </div>
      );
    } else {
      return (
        <div className='ui success message'>
          <div className='header'>You got a good price!</div>
          <p>
            The median price for the {roundtrip} roundtrip was ${price}, and you
            paid {percentage}% {str}!
          </p>
        </div>
      );
    }
  } else {
    if (price !== null) {
      return (
        <div className='ui success message'>
          <div className='header'>Median price</div>
          <p>
            The median price for the {roundtrip} roundtrip was ${price}.
          </p>
        </div>
      );
    } else {
      return (
        <div className='ui error message'>
          <div className='header'>Couldn't find data</div>
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
