'use client'

import { useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';
import { jersey10 } from "@/app/ui/fonts";
import clsx from "clsx";

const SIZE = 10;

type CustomCircularSliderProps = {
  name: string;
  label: string;
  append: string
  data: string[];
  dataIndex: number;
  interval: number;
  disabled?: boolean;
}

export default function CustomCircularSlider({ name, label, append, data, dataIndex, disabled, interval}: CustomCircularSliderProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [value, setValue] = useState<string>(data[dataIndex]);
  const min = ~~(data.at(0) ?? 1);
  const max = ~~(data.at(-1) ?? 100);

  return (
    <>
      <CircularSlider
        min={min}
        max={max}
        data={data}
        dataIndex={dataIndex}
        width={90}
        progressSize={SIZE}
        trackSize={SIZE}
        progressColorFrom={!disabled ? (isDragging ? "oklch(var(--s))" : "oklch(var(--p))") : "transparent"}
        progressColorTo={!disabled ? (isDragging ? "oklch(var(--s))" : "oklch(var(--p))") : "transparent"}
        trackColor="none"
        knobColor="oklch(var(--nc))"
        knobSize={SIZE * 2.5} // Default: 32
        knobDraggable={!disabled}
        hideKnob={disabled}
        trackDraggable={!disabled}
        continuous={{
          enabled: !disabled,
          clicks: max,
          interval
        }}
        renderLabelValue={<>
          <span className={clsx(
            "grid grid-cols-1 place-items-center gap-[1] absolute inset-0 p-4",
            disabled && "text-neutral",
            isDragging && "text-secondary"
          )}>
            <strong className={`text-3xl font-semibold ${jersey10.className}`}>{ value }</strong>
            <span className="text-sm font-medium">{ append }</span>
          </span>
        </>}
        onChange={(value: string) => setValue(value)}
        isDragging={(value: boolean) => setIsDragging(value)}
      >
        <div className="w-3 h-3 bg-base-300 rounded-full"></div>
      </CircularSlider>
      <input type="hidden" name={name} value={value} />
    </>
  )
}