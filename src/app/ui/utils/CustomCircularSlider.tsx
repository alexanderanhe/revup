'use client'

import { useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';

type CustomCircularSliderProps = {
  label: string;
  data: string[];
  dataIndex: number;
  disabled?: boolean;
  name: string;
}

export default function CustomCircularSlider({ label, data, dataIndex, disabled, name}: CustomCircularSliderProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  return (
    <>
      <CircularSlider
        label={label}
        verticalOffset={"0.5rem"}
        data={data}
        dataIndex={dataIndex}
        width={90}
        progressSize={8}
        trackSize={8}
        labelFontSize={"0.8rem"} // Default: 1rem
        valueFontSize={"1.5rem"} // Default: 4rem
        progressColorFrom={isDragging && !disabled ? "#F0A367" : "currentColor"}
        progressColorTo={isDragging && !disabled ? "#F65749" : "currentColor"}
        labelColor={isDragging && !disabled ? "#F0A367" : "currentColor"}
        onChange={ (value: string) => { setValue(value); } }
        isDragging={(value: boolean) => setIsDragging(value)}
        knobSize={16} // Default: 32
        knobDraggable={!disabled}
        hideKnob={disabled}
      >
        <div className="w-3 h-3 bg-base-300 rounded-full"></div>
      </CircularSlider>
      <input type="hidden" name={name} value={value} />
    </>
  )
}