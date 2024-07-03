'use client'

import { Workout } from "@/lib/definitions"
import Image from "next/image"
import { useEffect, useState } from "react"
import Card from "@/app/ui/Card"
import { Link } from "@/navigation"

type WorkoutProps = {
  workout: Workout
}

type Image = {
  src: string;
  name: string;
}
const DEFAULT_FALLBACK_IMAGE: Image = {
  src: "/images/E2FLRJtZx2E-unsplash.webp",
  name: "Default fallback image"
}

function WorkoutItem({ workout }: WorkoutProps) {
  const [image, setImage] = useState<Image>(DEFAULT_FALLBACK_IMAGE);

  useEffect(() => {
    const firstImage =  workout?.images?.[0] as any;
    if (firstImage) {
      setImage({
        name: firstImage.name,
        src: firstImage?.file?.url ?? firstImage?.external?.url
      })
    }
}, []);

  return (
    <Link href={`/explore/${workout.id}`} className="w-full">
      <Card className="relative h-28">
        <div className="grid items-end justify-start w-full h-full z-[1] font-semibold">
          {workout.name}
        </div>
        { image && (
          <Image
            src={image.src}
            alt={image.name}
            onError={() => setImage(DEFAULT_FALLBACK_IMAGE)}
            width={100}
            height={100}
            className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
            style={{ maskImage: "linear-gradient(to left, black -100%, transparent)"}}
          />
        )}
      </Card>
    </Link>
  )
}

type WorkoutsProps = {
  workouts: Workout[] | null
}

export default function Workouts({ workouts }: WorkoutsProps) {
  return (
    workouts?.map((workout) => <WorkoutItem key={workout.id} workout={workout} />)
  )
}