import LikeButton from "@/app/ui/explore/LikeButton";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getWorkout, getWorkoutIDs } from "@/lib/data";
import { WorkoutImage, WorkoutImageLink } from "@/lib/definitions";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateStaticParams() {
  const workoutIDs = await getWorkoutIDs();
  return workoutIDs.map((workoutId) => ({ workoutId }))
}

export default async function WorkoutItemPage({
  params: { locale, workoutId }
}: {
  params: {
    locale: string;
    workoutId: string;
  }
}) {
  const t = await getTranslations("Workout");
  const workout = await getWorkout(workoutId, locale);
  const [title] = workout?.tags?.find(([_, type]) => type === 'muscle') ?? [''];
  const images = (workout?.images ?? []);
  
  return (
    <LayoutContent
      title={title || workout?.name}
      pageMenu={<LikeButton />}
      footer
    >
      {images?.map(({name, type, ...image}: WorkoutImage, i) => (
        <Image
          key={`w${i}${name}`}
          className="rounded-lg w-full h-48 object-cover object-center"
          src={ (image as { external: WorkoutImageLink }).external?.url ?? (image as { file: WorkoutImageLink }).file?.url }
          alt={name}
          width={1200}
          height={393}
        />
      ))}
      <header className="w-full p-0">
        <h1>{ workout?.name }</h1>
      </header>
      <section className="w-full p-0">
        <p>{ workout?.description }</p>
      </section>
      <section className="w-full p-0 space-y-4">
        <h4>{ t("instructions") }</h4>
        { workout?.instructions.split("/n").map((instruction, i) => (
            <p key={`instruction${i}`}>{ instruction }</p>
        ))}
      </section>
      <section className="w-full p-0 space-y-4">
        <h4>{ t("warnings") }</h4>
        { workout?.warnings.split("/n").map((instruction, i) => (
            <p key={`instruction${i}`}>{ instruction }</p>
        ))}
      </section>
      <section className=" w-full p-0">
        <div className="flex flex-row flex-warp gap-2">
          { workout?.tags.map(([tag, type]) => (
            <div key={`tag${tag}${type}`} className={clsx("badge font-semibold p-3", classNames?.[type] ?? '')}>
              <span className="[&::first-letter]:capitalize">{ tag }</span>
            </div>
          ))}
        </div>
      </section>
    </LayoutContent>
  )
}

const classNames: Record<string, string> = {
  muscle: 'badge-primary',
  place: 'badge-accent',
  equipment: 'badge-success',
  difficulty: 'badge-warning'
}