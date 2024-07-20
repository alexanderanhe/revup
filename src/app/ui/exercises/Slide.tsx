'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Drawer } from 'vaul';
import { useFormState } from 'react-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { handleSetWorkoutCloseDay } from "@/lib/actions";

import SubmitButton from '@/app/ui/utils/SubmitButton';
import { WorkoutComplexParameters } from '@/lib/definitions';
import { Link, useRouter } from '@/navigation';
import { PAGES } from '@/lib/routes';
import CheckIcon from '@/components/utils/icons/CheckIcon';
import WorkoutDayForm from './WorkoutDayForm';

type SlideProps = {
  carouselId: string;
  scrolled?: number;
  id: string;
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
  };
  workout_complex: WorkoutComplexParameters;
  workout_id: string;
  completed: boolean;
  completed_at: string;
  plan_id: string;
  day: number;
  index: number;
  buttonClass?: string;
  buttonText?: string;
  buttonNextClass?: string;
  buttonNextText?: string;
  submit?: boolean;
  slideIds?: string[];
};

function Slide({ carouselId, scrolled, submit, slideIds, workout_complex, workout_id, plan_id, day, completed, ...slide }: SlideProps) {
  const [snap, setSnap] = useState<number | string | null>("355px");
  const [ formStateWorkoutCloseDay, formActionWorkoutCloseDay ] = useFormState(handleSetWorkoutCloseDay, null);
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const hash = event.currentTarget.hash;
    router.replace(`${hash}`)
  }

  const NextButton = () => submit ? (
    <form action={formActionWorkoutCloseDay}>
      <SubmitButton className={ slide.buttonNextClass }>
        { slide.buttonNextText }
      </SubmitButton>
    </form>
  ) : (
    <a href={`#slide${slideIds?.[slide.index + 1]}`} onClick={handleClick} className={ slide.buttonNextClass }>
      { slide.buttonNextText }
      <ChevronRightIcon className="size-5" />
    </a>
  )

  function isInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  useEffect(() => {
    if (scrolled !== null && ref.current && `#${ref.current.id}` !== window.location.hash && isInViewport(ref.current)) {
      const hash = `#${ref.current.id}`;
      router.replace(`${hash}`)
    }
  }, [scrolled]);

  useEffect(() => {
    if (formStateWorkoutCloseDay === 'done') {
      window.location.replace('/home');
    }
  }, [formStateWorkoutCloseDay]);

  useEffect(() => {
    router.prefetch(`${PAGES.WORKOUT}/${workout_id}`);
  }, []);

  const CompletedBackground = ({ children }: { children?: React.ReactNode }) => completed && (
    <div className="grid place-items-center absolute inset-0 w-full h-full bg-success/10 uppercase font-semibold text-xl p-4">
      <div className="flex items-center gap-2"><CheckIcon className="size-20 drop-shadow-lg text-base-100" /> { children }</div>
    </div>
  )

  return (
    <div id={`slide${slide.id}`}
      ref={ref}
      className="carousel-item content-grid grid-rows-1 w-full h-full"
      style={{ gridColumn: 'full-width'}}
    >
      <section className="grid grid-cols-1 [&>p]:text-center [&>p]:text-lg overflow-auto pt-20" style={{ gridColumn: 'full-width'}}>
        <div className='grid grid-cols-1 justify-center relative'>
          {slide.image && (
            <Image
              {...slide.image}
              width={400}
              height={400}
            />
          )}
          <CompletedBackground />
          <div className="absolute top-0 left-[50%] -translate-x-1/2 flex items-start justify-end w-full h-[40svh] aspect-square p-5">
            <Link href={`${PAGES.WORKOUT}/${workout_id}`} className="btn btn-ghost btn-square">
              <InformationCircleIcon className="size-5" />
            </Link>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            { slideIds?.[slide.index - 1] ? (
                <a href={`#slide${slideIds?.[slide.index - 1]}`} onClick={handleClick} className="btn btn-circle btn-ghost">
                  <ChevronLeftIcon className="size-5" />
                </a>
            ) : <div className="w-5" /> }
            { slideIds?.[slide.index + 1] && (
                <a href={`#slide${slideIds?.[slide.index + 1]}`} onClick={handleClick} className="btn btn-circle btn-ghost">
                  <ChevronRightIcon className="size-5" />
                </a>
            )}
          </div>
        </div>
        <div className='content-grid space-y-4 pb-10'>
          <h3 className="text-center pt-4">{ slide.title }</h3>
          <WorkoutDayForm
            workout_complex={workout_complex}
            completed={completed}
            day={day}
            plan_id={plan_id}
            workout_id={workout_id}
            slide_id={slide.id}
          />
        </div>
      </section>
      <footer className="grid grid-cols-1 gap-2 g-gradient-to-t from-base-100 pb-10">
        <div className="flex justify-center w-full space-x-3 pb-4">
          { slideIds?.map((id) => (
            <a key={`slide-nav-${id}`}
              href={`#slide${id}`}
              onClick={handleClick}
              className={`w-3 h-3 ${slide.id === id ? 'bg-base-300' : 'bg-base-200'} rounded-full`}
            ></a>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          <Drawer.Root
            snapPoints={["355px", 1]}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            shouldScaleBackground
          >
            <Drawer.Overlay className="fixed inset-0 bg-black/80" />
            <Drawer.Trigger className={ slide.buttonClass }>
              { slide.buttonText }
              <ArrowTopRightOnSquareIcon className="size-5" />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Content className="fixed flex flex-col bg-base-100 border border-base-300 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-30">
                <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
                <div className="flex flex-col max-w-md mx-auto w-full p-4 pt-5 space-y-2">
                  <Table />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          <NextButton />
        </div>
      </footer>
    </div>
  )
}

type SlidesProps = {
  slides: any[];
};

export default function Slides({ slides }: SlidesProps) {
  const [ scrolled, setScrolled ] = useState<number | null>(null);
  const carouselId = 'exercise-run';

  useEffect(() => {
    const carousel = document.getElementById(carouselId) as HTMLElement;
    if (carousel) {
      let listenerFunc: (this: HTMLElement, ev: Event) => any;
      const onScrollStop = (callback: (scrollLeft: number) => void) => {
        let isScrolling: NodeJS.Timeout;
        if (listenerFunc) {
          carousel.removeEventListener('scroll', listenerFunc);
        }
        listenerFunc = (event) => {
          clearTimeout(isScrolling);
          const scrollLeft = (event.target as HTMLElement).scrollLeft;
          isScrolling = setTimeout(() => {
            callback(scrollLeft);
          }, 150);
        };
        
        carousel.addEventListener('scroll', listenerFunc);
      }
      const endPull = () => {
        onScrollStop((scrollLeft) => {
          setScrolled(scrollLeft);
        });
      }

      if (window.location.hash) {
        goToOtherImage(window.location.hash, carouselId);
      }
      carousel.addEventListener("touchend", endPull);

      return () => {
        carousel.removeEventListener("touchend", endPull);
      }
    }
  }, []);

  return (
    <div id={carouselId} className="carousel grid-flow-row space-x-4 w-full h-svh" style={{gridColumn: 'full-width', margin: '0'}}>
      { slides.map((slide, index) => (
          <Slide
            {...slide}
            carouselId={carouselId}
            key={`Slide${slide.id}`}
            index={index}
            submit={index === slides.length - 1}
            slideIds={slides.map(({ id }) => id)}
            scrolled={scrolled}
          />
      ))}
    </div>
  )
}

const goToOtherImage = (href: string, carouselId: string) => {
  const carousel = document.getElementById(carouselId);
  if (carousel) {
    const target = document.querySelector<HTMLDivElement>(href)!;
    target.dataset.active = 'true';
    const left = target.offsetLeft;
    carousel.scrollTo({ left: left, behavior: 'instant' });
  }
};

const Table = () => (
  <div className="overflow-x-auto">
    <table className="table table-xs">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>company</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Littel, Schaden and Vandervort</td>
        </tr>
        <tr>
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Zemlak, Daniel and Leannon</td>
        </tr>
        <tr>
          <th>3</th>
          <td>Brice Swyre</td>
          <td>Tax Accountant</td>
          <td>Carroll Group</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>company</th>
        </tr>
      </tfoot>
    </table>
  </div>
)