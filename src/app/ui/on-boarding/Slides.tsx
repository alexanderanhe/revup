'use client'

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import ImproveSleepQuality from "./images/improve-sleep-quality";
import TrackYourGoal from "./images/track-your-goal";
import GetBurn from "./images/get-burn";
import EatWell from "./images/eat-well";
import Slide from "./Slide";
import SubmitButton from "../utils/SubmitButton";
import FormOnBoarding from "./FormOnBoarding";
import { PAGES } from "@/lib/routes";

const images: { [key: string]: JSX.Element } = {
  "track-your-goal": <TrackYourGoal className="max-h-[60svh] aspect-auto md:aspect-video md:bg-primary/70 text-primary" />,
  "get-burn": <GetBurn className="max-h-[60svh] aspect-auto md:aspect-video md:bg-primary/70 text-primary" />,
  "eat-well": <EatWell className="max-h-[60svh] aspect-auto md:aspect-video md:bg-primary/70 text-primary" />,
  "improve-sleep-quality": <ImproveSleepQuality className="max-h-[60svh] aspect-auto md:aspect-video md:bg-primary/70 text-primary" />,
}

type slideTranslate = {
  title: string;
  description: string;
  image: string;
}
type SlideType = Omit<slideTranslate, 'image'> & {
  key: number;
  image: ReactNode;
  buttonClass: string;
  buttonText: string;
}
export default function Slides() {
  const t = useTranslations("OnBoarding");
  const s = t.raw("slides") as slideTranslate[];

  const slides: SlideType[] = s.map(({title, description, image}, index: number) => {
    const imageNode = images[image];
    const lastSlide = index === s.length - 1;
    return {
      key: index + 1,
      title,
      description,
      image: imageNode,
      buttonClass: cn('btn w-full', lastSlide && "btn-primary"),
      buttonText: lastSlide ? t("finishBtn") : t("nextBtn"),
    };
  });

  return (
    <div className="relative w-full h-svh">
      <FormOnBoarding className="absolute right-4 top-4" onDone={() => window.location.replace(PAGES.HOME)}>
        <SubmitButton className="btn btn-ghost text-neutral">{ t("skipBtn") }</SubmitButton>
      </FormOnBoarding>
      <div className="carousel space-x-4 w-full h-full">
        { slides.map(({key, ...props}, index) => (
          <div key={`Slide${key}`} id={`slide${index}`} className="carousel-item content-grid grid-rows-1 w-full h-full">
            <Slide {...props} index={index} submit={index === slides.length - 1} />
          </div>
        ))}
      </div>
    </div>
  )
}