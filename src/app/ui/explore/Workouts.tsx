'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { BookmarkIcon } from "@heroicons/react/24/solid"

import { Link } from "@/navigation"
import Card from "@/app/ui/Card"
import { Workout, WorkoutImage, WorkoutImageLink } from "@/lib/definitions"
import { PAGES } from "@/lib/routes"

type WorkoutProps = {
  workout: Workout,
  liked: boolean
}

type Image = {
  src: string;
  name: string;
}
const DEFAULT_FALLBACK_IMAGE: Image = {
  src: "/images/E2FLRJtZx2E-unsplash.webp",
  name: "Default fallback image"
}

function WorkoutItem({ workout, liked }: WorkoutProps) {
  const [image, setImage] = useState<Image>(DEFAULT_FALLBACK_IMAGE);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const firstImage =  workout?.image_banner?.[0] as WorkoutImage;
    if (firstImage) {
      setImage({
        name: firstImage.name,
        src: (firstImage as { external: WorkoutImageLink }).external?.url
          ?? (firstImage as { file: WorkoutImageLink }).file?.url
      })
    }
}, []);

  return (
    <Link href={`${PAGES.WORKOUT}/${workout.id}`} className="w-full">
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
        <div className="absolute top-0 right-0 flex gap-2 items-center p-3">
          { !params.has('tags')
            && workout?.tags?.filter(([_, type]) => type === 'muscle')
            ?.map(([tag, type]) => (
            <div key={`tag${tag}${type}`} className="badge badge-neutral text-primary font-semibold p-2">
              <span className="[&::first-letter]:capitalize">{ tag }</span>
            </div>
          ))}
          { liked && <BookmarkIcon className="size-4 text-primary" />}
        </div>
      </Card>
    </Link>
  )
}

type WorkoutsProps = {
  workouts: Workout[] | null,
  userWorkoutIdsLiked: string[]
}

export default function Workouts({ workouts, userWorkoutIdsLiked }: WorkoutsProps) {
  return (
    <section className="w-full p-0">
      {workouts?.map((workout) => (
        <WorkoutItem
          key={workout.id}
          workout={workout}
          liked={userWorkoutIdsLiked.includes(workout?.id ?? '')}
        />
      ))}
    </section>
  )
}