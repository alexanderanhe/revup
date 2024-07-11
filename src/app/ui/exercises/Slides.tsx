import { Exercise, WorkoutImageLink } from "@/lib/definitions";
import Slide from "@/app/ui/exercises/Slide";
import { getTranslations } from "next-intl/server";

type SlidesProps = {
  exercises: Exercise[];
}

export default async function Slides({ exercises }: SlidesProps) {
  const t = await getTranslations("Exercises");
  const slides = exercises.map(({ id, name, description, images }, i) => ({
    id,
    title: name,
    description: description ?? 'No description',
    image: {
      src: ((images?.[0] as { external: WorkoutImageLink }).external?.url
      ?? (images?.[0] as { file: WorkoutImageLink }).file?.url),
      alt: name,
      // className: "w-full h-[60svh] aspect-square md:aspect-square object-cover md:object-contain",
      style: { maskImage: "linear-gradient(black 60%, transparent)"},
      className: "w-full h-[40svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
    },
    buttonClass: `btn ${i === exercises.length - 1 ? 'btn-primary' : ''} w-full`,
    buttonText: i === exercises.length - 1 ? t("finishBtn") : t("nextBtn"),
  }));

  return (
    <div className="carousel space-x-4 w-full h-svh">
      { slides.map((slide, index) => (
        <div key={`Slide${slide.id}`} id={`slide${index}`} className="carousel-item content-grid grid-rows-1 w-full h-full">
          <Slide
            {...slide}
            index={index}
            submit={index === slides.length - 1}
            slideIds={slides.map(({ id }) => id)}
          />
        </div>
      ))}
    </div>
  )
}