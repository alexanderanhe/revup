import { getUserCurrentPlanWorkouts } from "@/lib/data";

import Slides from "@/app/ui/exercises/Slides";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import Title from "@/app/ui/exercises/Title";
import { getTranslations } from "next-intl/server";

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

  return (
    <LayoutContent title={<Title titles={titles} />} titleFixed>
      <Slides exercises={exercises} />
    </LayoutContent>
  )
}