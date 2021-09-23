import React from "react";

const ResponseCard = ({ price, paid, origin, dest, display }) => {
  if (display === false) {
    return null;
  }

  let str = "";
  const percentage = Math.abs(Math.round((paid / price - 1) * 100));
  const roundtrip = origin + "/" + dest;
  if (paid > price) {
    str = "more";
  } else {
    str = "less";
  }
  if (paid !== "") {
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
    } else if (paid !== "") {
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
    return (
      <div class='ui success message'>
        <div class='header'>Average price</div>
        <p>
          The average price for the {roundtrip} roundtrip was ${price}.
        </p>
      </div>
    );
  }
};

export default ResponseCard;
