'use client'

import { useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';

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
  const [value, setValue] = useState<string>("");
  return (
    <>
      <CircularSlider
        label={label}
        verticalOffset={"0rem"}
        data={data}
        dataIndex={dataIndex}
        appendToValue={append}
        width={90}
        progressSize={SIZE}
        trackSize={SIZE}
        labelFontSize={"0.8rem"} // Default: 1rem
        valueFontSize={"1rem"} // Default: 4rem
        progressColorFrom={isDragging && !disabled ? "#F0A367" : "oklch(var(--p))"}
        progressColorTo={isDragging && !disabled ? "#F65749" : "oklch(var(--p))"}
        labelColor={isDragging && !disabled ? "#F0A367" : "currentColor"}
        trackColor="none"
        knobColor="oklch(var(--s))"
        knobSize={SIZE * 3} // Default: 32
        knobDraggable={!disabled}
        hideKnob={disabled}
        trackDraggable={!disabled}
        continuous={{
          enabled: true,
          clicks: 100,
          interval
        }}
        onChange={ (value: string) => { setValue(value); } }
        isDragging={(value: boolean) => setIsDragging(value)}
      >
        <div className="w-3 h-3 bg-base-300 rounded-full"></div>
      </CircularSlider>
      <input type="hidden" name={name} value={value} />
    </>
  )
}