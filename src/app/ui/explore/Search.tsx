'use client'
import Input from "@/app/ui/Input";

export default function Search() {
  return (
    <div className="grid w-full">
      <Input>
        <input
          type="search"
          placeholder="Search for workouts"
          className="w-full" />
      </Input>
    </div>
  )
}