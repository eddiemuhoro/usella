import React from 'react';
import { useState, useEffect } from 'react';

const Timer = ({deadline}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


//time difference
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
       
                <div className="timer__number">{days}d</div>
                <div className="timer__number">{hours}h</div>
                <div className="timer__number">{minutes}m</div>
                <div className="timer__number">{seconds}s</div>
    </div>
  );
};

export default Timer;