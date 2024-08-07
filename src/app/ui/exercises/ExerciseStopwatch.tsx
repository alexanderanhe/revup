'use client'

import { usePathname, useRouter } from "@/navigation";
import { ClockIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import SubmitButton from "../utils/SubmitButton";
import { useFormState } from "react-dom";
import { handleFinishWorkoutDay, handleSetWorkoutCloseDay, handleStartWorkoutDay } from "@/lib/actions";
import { PAGES } from "@/lib/routes";

const MAX_SEC_TIME = 6 * 60 * 60; // 6 hours

type ExerciseStopwatchProps = {
  startDate?: string | null;
  translate: {
    start?: string;
    skip?: string;
  };
}

type Stopwatch = {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ExerciseStopwatch({ startDate, translate }: ExerciseStopwatchProps) {
  const [ sDate, setSDate ] = useState<string | null | undefined>(startDate);
  const [ formStateStartWorkoutDay, formActionStartWorkoutDay ] = useFormState(handleStartWorkoutDay, null);
  const [ formStateWorkoutCloseDay, formActionWorkoutCloseDay ] = useFormState(handleSetWorkoutCloseDay, { status: 'idle' });
  const [ formStateFinishWorkoutDay, formActionFinishWorkoutDay ] = useFormState(handleFinishWorkoutDay, null);
  const [ showSkip, setShowSkip ] = useState<boolean>(false);
  // state to store time
  const secondsStarted = diffSeconds(sDate);
  const [time, setTime] = useState<number>(secondsStarted > MAX_SEC_TIME ? -1 : secondsStarted);
  const [stopwatch, setStopwatch] = useState<Stopwatch>({ hours: 0, minutes: 0, seconds: 0 });
  const pathname = usePathname();
  const router = useRouter();

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState<boolean>(secondsStarted > MAX_SEC_TIME ? false : secondsStarted >= 0);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(diffSeconds(sDate)), 1000);
      // Reset timer back to 0 if it is more than max time
      if (diffSeconds(sDate) > MAX_SEC_TIME) {
        setTime(-1);
        setIsRunning(false);
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  useEffect(() => {
    // Hours calculation
    const hours = Math.floor(time / 3600);

    // Minutes calculation
    const minutes = Math.floor((time % 3600) / 60);

    // Seconds calculation
    const seconds = Math.floor((time % 60));

    setStopwatch({ hours, minutes, seconds });
  }, [time]);

  useEffect(() => {
    if (formStateStartWorkoutDay?.status === "done") {
      setSDate(formStateStartWorkoutDay.date);
      setIsRunning(true);
    }
  }, [ formStateStartWorkoutDay ]);

  useEffect(() => {
    if (formStateFinishWorkoutDay === "saved") {
      setIsRunning(false);
    }
  }, [ formStateFinishWorkoutDay ]);

  useEffect(() => {
    if (formStateWorkoutCloseDay?.status === "success") {
      router.push(PAGES.HOME);
    }
  }, [ formStateWorkoutCloseDay ]);

  useEffect(() => {
    setShowSkip(pathname !== `${PAGES.EXERCISES}/run`);
  }, [ pathname ]);

  if (pathname.startsWith(`${PAGES.EXERCISES}/`)
    && pathname !== `${PAGES.EXERCISES}/run`
  ) {
    return null;
  }

  return (
    showSkip && !isRunning ? (
      <form action={formActionWorkoutCloseDay}>
        <SubmitButton className="btn btn-ghost underline">
          { translate.skip }
        </SubmitButton>
      </form>
    ) : (
      time >= 0 ? (
        <form action={formActionFinishWorkoutDay} className="relative group grid place-items-center">
          <SubmitButton className="btn btn-xs btn-ghost gap-1">
            <span className="font-medium font-mono countdown">
              { !!stopwatch.hours && (
                <><span style={{
                    "--value": stopwatch.hours,
                  } as React.CSSProperties}
                ></span>:</>
              )}
              <span style={{
                  "--value": stopwatch.minutes,
                } as React.CSSProperties}
              ></span>:
              <span style={{
                  "--value": stopwatch.seconds,
                } as React.CSSProperties}
              ></span>
            </span>
            <ClockIcon className="size-4" />
          </SubmitButton>
        </form>
      ) : (
        <form action={formActionStartWorkoutDay}>
          <SubmitButton className="btn flex-nowrap">
          { translate.start } <PlayIcon className="size-5" />
          </SubmitButton>
        </form>
      )
    )
  )
}

const diffSeconds = (startDate?: Date | string | null) => {
  const now = new Date();
  const started_at = startDate instanceof Date ? startDate : new Date(Date.parse(startDate ?? ""));
  const sec =  Math.floor((now.getTime() - (started_at ?? now).getTime()) / 1000);
  return sec >= 0 ? sec : -1;
}