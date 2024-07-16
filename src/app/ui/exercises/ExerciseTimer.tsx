'use client'

import { useEffect, useState } from "react";

export default function ExerciseTimer() {
  // state to store time
  const [time, setTime] = useState<number>(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  // const reset = () => {
  //   setTime(0);
  // };

  return (
    <p className="font-medium" onClick={startAndStop}>
      { time ? (
        <span className="font-normal font-mono countdown">
          { !!hours && (
            <><span style={{
                "--value": minutes,
              } as React.CSSProperties}
            ></span>:</>
          )}
          <span style={{
              "--value": minutes,
            } as React.CSSProperties}
          ></span>:
          <span style={{
              "--value": seconds,
            } as React.CSSProperties}
          ></span>
        </span>
      ) : "Begin" }
    </p>
  )
}