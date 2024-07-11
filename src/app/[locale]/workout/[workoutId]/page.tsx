import { LikeButton, UnauthLikeButton } from "@/app/ui/explore/LikeButton";
import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import { getWorkout, getWorkoutIDs, getWorkoutsLiked } from "@/lib/data";
import { WorkoutImage, WorkoutImageLink } from "@/lib/definitions";
import { ExclamationCircleIcon, ExclamationTriangleIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
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

  const Like = async () => {
    const userWorkoutIdsLiked = await getWorkoutsLiked();
    if (!userWorkoutIdsLiked) return <UnauthLikeButton />;

    return <LikeButton
      workoutId={workoutId}
      enabled={userWorkoutIdsLiked.some(( id ) => id === workoutId)}
    />
  }

  if (!workout) {
    return <LayoutContent title={t("notFound")} />
  }
  
  return (
    <LayoutContent
      title={title || workout?.name}
      pageMenu={<Like />}
      className="pb-10"
      footer
    >
      {images?.map(({name, type, ...image}: WorkoutImage, i) => (
        <Image
          key={`w${i}${name}`}
          className="rounded-lg w-full aspect-video max-sm:aspect-square object-cover object-center"
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
        <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
          { workout?.instructions.split(/\r?\n/).map((instruction, i, instructions) => (
            <li key={`instruction${i}`}>
              <div className="timeline-middle text-secondary">
                <RocketLaunchIcon className="size-5" />
              </div>
              <div className="timeline-end">
                {/* <time className="font-mono italic">1984</time> */}
                {/* <div className="text-lg font-black">First Macintosh computer</div> */}
                { instruction }
              </div>
              <hr className={clsx(instructions.length - 1 === i && 'hidden')} />
            </li>
          ))}
        </ul>
      </section>
      <section className="full-width bg-error/20 w-full p-0 pt-4 space-y-2">
        <h4 className="flex items-center text-error gap-3"><ExclamationTriangleIcon className="size-5" />{ t("warnings") }</h4>
        <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
          { workout?.warnings.split(/\r?\n/).map((warning, i, warnings) => (
            <li key={`warning${i}`}>
              <div className="timeline-middle">
                <ExclamationCircleIcon className="size-4 text-error" />
              </div>
              <div className="timeline-end font-medium mb-5">
                {/* <time className="font-mono italic">1984</time> */}
                {/* <div className="text-lg font-black">First Macintosh computer</div> */}
                { warning }
              </div>
              <hr className={clsx(warnings.length - 1 === i && 'hidden')} />
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full p-0">
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
  muscle: 'badge-neutral text-primary',
  place: 'badge-neutral',
  equipment: 'badge-neutral text-accent',
  difficulty: 'badge-neutral text-info'
}