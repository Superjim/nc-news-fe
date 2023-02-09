import React from "react";

//returns seconds NOT ms
const calculateTimeDifference = (date) => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - date.getTime();
  return timeDifference / 1000;
};

//thx be-katas
const formatTimeDifference = (timeDifference) => {
  if (timeDifference < 60) {
    return "just now";
  }
  const units = [
    { name: "year", value: 31536000 },
    { name: "month", value: 2592000 },
    { name: "day", value: 86400 },
    { name: "hour", value: 3600 },
    { name: "minute", value: 60 },
  ];

  let result = "";
  let unitCount = 0;
  for (const { name, value } of units) {
    if (unitCount >= 2) {
      break;
    }

    if (timeDifference >= value) {
      const count = Math.floor(timeDifference / value);
      timeDifference -= count * value;

      result += `${count} ${name}`;
      if (count > 1) {
        result += "s";
      }
      result += ", ";
      unitCount++;
    }
  }

  result = result.slice(0, -2);
  result = result.replace(/,(?=[^,]+$)/, " and");

  return result + " ago";
};

const TimeSince = ({ date }) => {
  const parsedTime = new Date(date);
  const timeDifference = calculateTimeDifference(parsedTime);
  const formattedTimeDifference = formatTimeDifference(timeDifference);

  return <h5>Posted {formattedTimeDifference}</h5>;
};

export default TimeSince;
