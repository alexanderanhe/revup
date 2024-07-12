import { getUserCurrentPlanWorkouts } from "@/lib/data";
import { getTranslations } from "next-intl/server";

import { WorkoutImageLink } from "@/lib/definitions";
import Slide from "@/app/ui/exercises/Slide";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import Title from "@/app/ui/exercises/Title";

export default async function ExercisesRunPage({
  params: { locale }
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations("Exercises");
  const exercises = await getUserCurrentPlanWorkouts(locale);
  if (!exercises) {
    return null;
  }
  type Titles = { [key: string]: string }
  const titles: Titles = exercises.reduce((acc: Titles, { id, name, tags }) => {
    const [title] = tags?.find(([_, type]) => type === 'muscle') ?? [''];
    acc[id] = title || name;
    return acc;
  }, {});

  const slides = exercises.map(({ id, workout_id, name, description, images, tags, image_banner, ...workout_complex }, i) => ({
    id,
    workout_id,
    title: name,
    description: description ?? 'No description',
    workout_complex,
    image: {
      src: ((images?.[0] as { external: WorkoutImageLink }).external?.url
      ?? (images?.[0] as { file: WorkoutImageLink }).file?.url),
      alt: name,
      // className: "w-full h-[60svh] aspect-square md:aspect-square object-cover md:object-contain",
      style: { maskImage: "linear-gradient(black 60%, transparent)"},
      className: "w-full h-[40svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
    },
    buttonClass: `btn ${i === exercises.length - 1 ? 'btn-primary' : ''} w-full`,
    buttonText: t("setParametersBtn"),
    buttonNextText: i === exercises.length - 1 ? t("finishBtn") : t("nextBtn"),
  }));

  return (
    <LayoutContent title={<Title titles={titles} />} titleFixed>
      <div id="exercise-run" className="carousel space-x-4 w-full h-svh" style={{margin: '0'}}>
        { slides.map((slide, index) => (
            <Slide
              {...slide}
              carouselId="exercise-run"
              key={`Slide${slide.id}`}
              index={index}
              submit={index === slides.length - 1}
              slideIds={slides.map(({ id }) => id)}
            />
        ))}
      </div>
    </LayoutContent>
  )
}