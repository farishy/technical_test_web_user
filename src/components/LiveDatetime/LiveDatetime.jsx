import React, { useState, useEffect } from "react";
import { DAYS } from "../../constant/constant";
import { formatTwoDigits } from "../../helpers/helpers";

const LiveDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDay = DAYS[currentDateTime.getDay()];

  const formattedTime = `${formatTwoDigits(
    currentDateTime.getHours()
  )}:${formatTwoDigits(currentDateTime.getMinutes())}:${formatTwoDigits(
    currentDateTime.getSeconds()
  )}`;

  const formattedDate = `${formatTwoDigits(
    currentDateTime.getDate()
  )}-${formatTwoDigits(
    currentDateTime.getMonth() + 1
  )}-${currentDateTime.getFullYear()}`;

  return (
    <div className="d-flex gap-1 text-white">
      <b>Tanggal & Waktu : </b>
      <p>{`${formattedDay}, ${formattedDate} ${formattedTime} WIB`}</p>
    </div>
  );
};

export default LiveDateTime;
