'use client'

import { WorkoutImage, WorkoutImageLink } from "@/lib/definitions"
import Image from "next/image";
import { useState } from "react"

type Image = {
  src: string;
  name: string;
}
const DEFAULT_FALLBACK_IMAGE: Image = {
  src: "/images/E2FLRJtZx2E-unsplash.webp",
  name: "Default fallback image"
}

type ImageWorkoutProps = {
  image: WorkoutImage;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageWorkout({ image, ...props }: ImageWorkoutProps) {
  const [imageObj, setImageObj] = useState<Image>({
    name: image ? image.name : DEFAULT_FALLBACK_IMAGE.name,
    src: image ? ((image as { external: WorkoutImageLink }).external?.url
      ?? (image as { file: WorkoutImageLink }).file?.url)
      : DEFAULT_FALLBACK_IMAGE.src
  });

  return (
    <Image
      src={imageObj.src}
      alt={imageObj.name}
      onError={() => setImageObj(DEFAULT_FALLBACK_IMAGE)}
      {...props}
    />
  )
}