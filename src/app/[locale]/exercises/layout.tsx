import Title from "@/app/ui/exercises/Title";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getUserCurrentPlanWorkouts } from "@/lib/data";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    locale: string;
  };
  children: React.ReactNode;
}
export default async function ExercisesLayout({ params: { locale }, children }: Props) {
  const t = await getTranslations("Exercises");
  const exercises = await getUserCurrentPlanWorkouts(locale);
  type Titles = { [key: string]: string }
  const titles: Titles = exercises ? exercises?.reduce((acc: Titles, { id, name, tags }) => {
    const [title] = tags?.find(([_, type]) => type === 'muscle') ?? [''];
    acc[id] = title || name;
    return acc;
  }, {}) : {};

  return (
    <LayoutContent title={<Title titles={titles} defaultTitle={ t("title") } />} titleFixed>
      { children }
    </LayoutContent>
  )
}