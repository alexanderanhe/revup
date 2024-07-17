'use client'

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

// source: https://blog.logrocket.com/implementing-pull-to-refresh-react-tailwind-css/

const PULL_LENGTH_TO_REFRESH = 60;

export default function PullToRefresh() {
  const [loading, setLoading] = useState<boolean>(false);
  /**
    state to hold the start point
  */
  const [startPoint, setStartPoint] = useState<number>(0);
  /**
   * 
    state to hold the change in the start point and current point
    the pull change is equivalent to current point - start point
  */
  const [pullChange, setPullChange] = useState<number>(0);
  /**
    ref to target the `.refresh-container` element in the DOM
   */
  const refreshCont = useRef<HTMLDivElement>(null);

  const initLoading = () => {
    if (refreshCont.current) {
      refreshCont.current.classList.add("loading");
      setLoading(true)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const pullStart = (e: any) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e: any) => {
    /**
     * get the current user touch event data
     */
    const touch = e.targetTouches[0];
    /**
     * get the touch position on the screen's Y axis
     */
    const { screenY } = touch;
    /**
     * The length of the pull
     *
     * if the start touch position is lesser than the current touch position, calculate the difference, which gives the `pullLength`
     *
     * This tells us how much the user has pulled
     */
    let pullLength: number = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
    console.log({ screenY, startPoint, pullLength, pullChange });
  };

  const endPull = () => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > PULL_LENGTH_TO_REFRESH) initLoading();
  };
  
  // add and remove event listeners
  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  });

  return (
    <div
      ref={refreshCont}
      className={clsx(
        "grid place-items-center w-full m-auto overflow-hidden",
        pullChange > PULL_LENGTH_TO_REFRESH && "bg-primary/20",
        pullChange <= PULL_LENGTH_TO_REFRESH && "bg-neutral/20",
      )}
      style={{
        gridColumn: 'full-width',
        height: !loading ? Math.min(PULL_LENGTH_TO_REFRESH * 2, pullChange) : PULL_LENGTH_TO_REFRESH * 2
      } as React.CSSProperties}
    >
      <div className="refresh-icon p-2 rounded-full">
        <ArrowPathIcon
          style={{ transform: `rotate(${pullChange}deg)` }}
          className={clsx("size-6", loading && "animate-spin")}
        />
      </div>
    </div>
  )
}