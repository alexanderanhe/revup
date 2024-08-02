'use client'

import { useEffect } from "react"

export default function CurrentPlanWorkingDays() {

  useEffect(() => {
    const listWorkingDays = document.getElementById("currentPlanWorkingDays")
    if (listWorkingDays) {
      listWorkingDays.scrollTo(0, listWorkingDays.scrollHeight);
    }
  }, [])

  return (
    <div />
  )
}