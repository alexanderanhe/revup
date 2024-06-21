'use client'

import { useEffect, useState } from "react";

export default function Countdown({ values, intervalTime }: { values: (number)[], intervalTime?: number}) {
  const [ currentValue, setCurrentValue ] = useState<number>(0)
  const currentCountdown = {
    "--value": values[currentValue],
  } as React.CSSProperties

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prev) => {
        if (prev === values.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, intervalTime ?? 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="countdown">
      <span style={currentCountdown}></span>
    </span>
  )
}