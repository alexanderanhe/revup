import { getUserCurrentPlanWorkouts } from "@/lib/data";
import { getTranslations } from "next-intl/server";

import { WorkoutImageLink } from "@/lib/definitions";
import Slides from "@/app/ui/exercises/Slide";

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
    buttonClass: `btn w-full`,
    buttonText: t("historyBtn"),
    buttonNextClass: `btn ${i === exercises.length - 1 ? 'btn-primary' : 'btn-ghost'} w-full`,
    buttonNextText: i === exercises.length - 1 ? t("finishBtn") : t("nextBtn"),
  }));

  return (
      <Slides slides={slides} />
  )
}