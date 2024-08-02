'use client'

import { UUID, WorkoutComplexParameters } from "@/lib/definitions";
import { PAGES } from "@/lib/routes";
import { Link } from "@/navigation";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { Drawer } from "vaul";
import Metrics from "./Metrics";

type HistoryButtonProps = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  weight_unit?: string;
  time?: number;
  time_unit?: string;
  completed?: boolean;
  id: UUID;
  workout_id: UUID;
  workout_complex: WorkoutComplexParameters;
  history: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
  }
}

export default function HistoryButton({ name, sets, reps, weight, weight_unit, time, time_unit, completed, id, workout_id, workout_complex, image, history }: HistoryButtonProps ) {
  const [snap, setSnap] = useState<number | string | null>(1);
  const [errorImage, setErrorImage] = useState<boolean>(false);

  return (
    <Drawer.Root
      snapPoints={["355px", 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      shouldScaleBackground
    >
      <Drawer.Overlay className="fixed inset-0 bg-black/80" />
      <Drawer.Trigger className="flex flex-col items-start justify-end w-full h-full z-[1]">
        <span className="w-full font-semibold text-left">{ name }</span>
        <span className="w-full text-xs font-medium text-left">
          { sets && reps && `${ sets }x${ reps }${ weight ? `x${weight}${weight_unit}` : ''}`}
          { time && time_unit && `${ time }${ time_unit }`}
        </span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content className="fixed flex flex-col bg-base-100 border border-base-300 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-30">
          <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
          <div className="content-grid mx-auto w-full p-4 pt-5 space-y-4">
            <div className="grid grid-cols-1 justify-center relative">
              {image && (
                <div className="box w-full">
                  { errorImage || !image?.src ? (
                    <div className="flex items-center justify-center w-full h-[40svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg bg-base-200 rounded">
                      <svg className="w-10 h-10 text-neutral-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                      </svg>
                    </div>
                  ) : (
                    <Image
                      {...image}
                      onError={(e) => {
                        e.currentTarget.src = '/images/E2FLRJtZx2E-unsplash.webp';
                        setErrorImage(true)
                      }}
                      width={400}
                      height={400}
                    />
                  )}
                </div>
              )}
              <div className="absolute top-0 left-[50%] -translate-x-1/2 content-grid place-items-center tall:place-items-end w-full h-full aspect-square">
                <Link href={`${PAGES.WORKOUT}/${workout_id}`} className="btn btn-ghost btn-square self-start">
                  <InformationCircleIcon className="size-5" />
                </Link>
                <Metrics
                  {...workout_complex}
                  completed={completed}
                />
              </div>
            </div>
            { history }
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}