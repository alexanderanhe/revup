import LikeButton from "@/app/ui/explore/LikeButton";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getWorkout, getWorkoutIDs } from "@/lib/data";
import clsx from "clsx";
import Image from "next/image";

export async function generateStaticParams({}) {
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
  const workout = await getWorkout(workoutId, locale);
  const [title] = workout?.tags?.find(([_, type]) => type === 'muscle') ?? [''];
  const [_, ...images] = workout?.images ?? [''];
  
  return (
    <LayoutContent
      title={title || workout?.name}
      pageMenu={<LikeButton />}
      footer
    >
      {images.map(({name, type, ...image}: any, i) => (
        <Image
          key={`w${i}${name}`}
          src={image?.[type]?.url}
          alt={name}
          width={100}
          height={100}
        />
      ))}
      <header className="w-full p-0">
        <h1>{ workout?.name }</h1>
      </header>
      <section className="w-full p-0">
        <p>{ workout?.description }</p>
      </section>
      <section className="w-full p-0 space-y-4">
        <h4>Instructions</h4>
        { workout?.instructions.split("/n").map((instruction, i) => (
            <p key={`instruction${i}`}>{ instruction }</p>
        ))}
      </section>
      <section className="w-full p-0 space-y-4">
        <h4>Warnings</h4>
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