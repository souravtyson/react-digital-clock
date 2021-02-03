import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [isStarted, setIsStarted] = useState(null);
  const [formatAMPM, setFormatAMPM] = useState("");

  const appendZero = num => {
    if (num) {
      return num.toString().length == 2 ? num : "0" + num;
    } else {
      return "00";
    }
  };

  const showHrFormat = hours => {
    //console.log(formatAMPM)
    if (formatAMPM.length) {
      console.log(formatAMPM.length);
      setFormatAMPM(hours >= 12 ? "PM" : "AM");
      hours = hours % 12;
      hours = hours ? hours : 12;
    }
    return hours;
  };

  const startClock = () => {
    if (!isStarted) {
      const id = setInterval(() => {
        let time = new Date();
        setHours(appendZero(time.getHours()));
        setMinutes(appendZero(time.getMinutes()));
        setSeconds(appendZero(time.getSeconds()));
      }, 1000);
      setIsStarted(id);
    }
  };

  const stopClock = () => {
    clearInterval(isStarted);
    setIsStarted(null);
    console.log("stopped");
  };

  const showButton = () => {
    if (isStarted) {
      return (
        <button className="buttonStyle" onClick={stopClock}>
          Stop
        </button>
      );
    } else {
      return (
        <button className="buttonStyle" onClick={startClock}>
          Start
        </button>
      );
    }
  };

  const x = y => {
    console.log(y);
    setFormatAMPM("AM");
  };

  const changeHourFormat = () => {
    if (formatAMPM) {
      return <button onClick={() => x("")}>Change to 24 Hr format</button>;
    } else {
      return <button onClick={() => x("AM")}>Change to 12 Hr format</button>;
    }
  };

  useEffect(() => {
    startClock();
  }, [hours, minutes, seconds, formatAMPM]);

  return (
    <div id="clock">
      <p className="text">DIGITAL CLOCK with React.js</p>
      <p className="date" />
      <p className="time">
        {hours}:{minutes}:{seconds} {formatAMPM}
      </p>
      <div className="alocate">{showButton()}</div>
    </div>
  );
}
