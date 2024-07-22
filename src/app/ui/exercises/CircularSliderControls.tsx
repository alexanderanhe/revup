'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { WorkoutComplexParameters } from '@/lib/definitions';
import { jersey10 } from '@/app/ui/fonts';

const NoSSRCustomCircularSlider = dynamic(() => import('@/app/ui/utils/CustomCircularSlider'), { ssr: false })

type CircularSliderControlsProps = {
  workout_complex: WorkoutComplexParameters;
  disabled: boolean;
}

export default function CircularSliderControls({ workout_complex, disabled }: CircularSliderControlsProps) {

  const ControlDiv = ({ children }: { children: React.ReactNode }) => (
    <div className={clsx(
      "flex items-center justify-center gap-4", 
      `[&>div>div:nth-child(2)>div:nth-child(2)>code]:${jersey10.className}`,
      !disabled && `[&>div>svg>circle]:fill-primary/10`,
      disabled && `[&>div>svg>circle]:fill-neutral/10`
    )}>{ children }</div>
  )

  if (workout_complex.reps && workout_complex.weight) {
    return (
      <ControlDiv>
        <RepsControl
          reps={workout_complex.reps}
          weight={workout_complex.weight}
          weight_unit={workout_complex.weight_unit}
          disabled={disabled}
        />
      </ControlDiv>
    )
  }

  if (workout_complex.time) {
    return (
      <ControlDiv>
        <TimeControl
          time={workout_complex.time}
          time_unit={workout_complex.time_unit}
          disabled={disabled}
        />
      </ControlDiv>
    )
  }
  return null;
}

function RepsControl({ reps, weight, weight_unit, disabled }: { reps: number, weight: number, weight_unit: string, disabled: boolean }) {
  const dataReps = Array.from({ length: Math.abs(reps * 1.5) }, (_, i) => `${i + 1}`);
  const dataIndexReps = ~~(reps ?? 1) - 1;
  const dataWeight = Array.from({ length: Math.abs(weight / 5 * 1.8) }, (_, i) => `${(i + 1) * 5}`);
  const dataIndexWeight = ~~(weight ?? 25) / 5 - 1;

  return (
    <>
      <NoSSRCustomCircularSlider
        name="reps"
        label="reps"
        data={dataReps}
        dataIndex={dataIndexReps}
        append="x"
        interval={1}
        disabled={disabled}
      />
      <NoSSRCustomCircularSlider
        name="weight"
        label="weight"
        data={dataWeight}
        dataIndex={dataIndexWeight}
        append={weight_unit}
        interval={5}
        disabled={disabled}
      />
    </>
  )
}

function TimeControl({ time, time_unit, disabled }: { time: number, time_unit: string, disabled: boolean }) {
  const data = Array.from({ length: Math.abs(time * 2) }, (_, i) => `${i + 1}`);
  const dataIndex = ~~(time ?? 1) - 1;
  return (
    <NoSSRCustomCircularSlider
      name="time"
      label="time"
      data={data}
      dataIndex={dataIndex}
      append={time_unit}
      interval={1}
      disabled={disabled}
    />
  )
}