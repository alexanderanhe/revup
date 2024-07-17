'use client'

import { ClockIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import SubmitButton from "../utils/SubmitButton";
import { useFormState } from "react-dom";
import { handleFinishWorkoutDay, handleStartWorkoutDay } from "@/lib/actions";

const MAX_SEC_TIME = 6 * 60 * 60; // 6 hours

type ExerciseStopwatchProps = {
  startDate?: string | null
}

export default function ExerciseStopwatch({ startDate }: ExerciseStopwatchProps) {
  const [ formStateStartWorkoutDay, formActionStartWorkoutDay ] = useFormState(handleStartWorkoutDay, null);
  const [ formStateFinishWorkoutDay, formActionFinishWorkoutDay ] = useFormState(handleFinishWorkoutDay, null);
  // state to store time
  const secondsStarted = diffSeconds(startDate);
  const [time, setTime] = useState<number>(secondsStarted > MAX_SEC_TIME ? 0 : secondsStarted);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState<boolean>(!!secondsStarted);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1000);
      // Reset timer back to 0 if it is more than max time
      secondsStarted > MAX_SEC_TIME && setTime(0)
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor((time % 60));

  // Method to start and stop timer
  // const startAndStop = () => {
  //   setIsRunning(!isRunning);
  // };

  useEffect(() => {
    if (formStateStartWorkoutDay?.status === "done") {
      setTime(diffSeconds(formStateStartWorkoutDay.date));
      setIsRunning(true);
    }
  }, [ formStateStartWorkoutDay ]);

  useEffect(() => {
    if (formStateFinishWorkoutDay === "saved") {
      setIsRunning(false);
    }
  }, [ formStateFinishWorkoutDay ]);

  return (
    time ? (
      <form action={formActionFinishWorkoutDay} className="relative group grid place-items-center">
        <SubmitButton className="btn btn-xs btn-ghost">
          <span className="font-medium font-mono countdown">
            { !!hours && (
              <><span style={{
                  "--value": hours,
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
          <ClockIcon className="size-4 ml-1" />
        </SubmitButton>
      </form>
    ) : (
      <form action={formActionStartWorkoutDay}>
        <SubmitButton className="btn">
          Begin <PlayIcon className="size-5" />
        </SubmitButton>
      </form>
    )
  )
}

const diffSeconds = (startDate?: Date | string | null) => {
  const now = new Date();
  const started_at = startDate instanceof Date ? startDate : new Date(Date.parse(startDate ?? ""));
  const sec =  Math.floor((now.getTime() - (started_at ?? now).getTime()) / 1000);
  return sec >= 0 ? sec : 0;
}