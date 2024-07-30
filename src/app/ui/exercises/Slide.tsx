'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Drawer } from 'vaul';
import { useFormState } from 'react-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { selectExercise, set_exercise } from "@/lib/features/app";

import { handleSetWorkoutCloseDay } from "@/lib/actions";

import SubmitButton from '@/app/ui/utils/SubmitButton';
import { UUID, WorkoutComplexParameters } from '@/lib/definitions';
import { Link, useRouter } from '@/navigation';
import { PAGES } from '@/lib/routes';
import WorkoutDayForm from '@/app/ui/exercises/WorkoutDayForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Metrics from './Metrics';

type SlideProps = {
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
  slideIds?: string[];
};

function Slide({slideIds, workout_complex, workout_id, plan_id, day, completed, ...slide }: SlideProps) {
  const [startRest, setStartRest] = useState<boolean>(false);
  const [form, setForm] = useState<Record<string, any>>({
    day,
    workout_id: workout_id,
    workout_complex_id: slide.id,
    plan_id: plan_id,
  });
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch()
  const setExercise = (state: UUID) => dispatch(set_exercise(state));

  const handleForm = (name: string, value: string | number) => () => {
    !completed && setForm({ ...form, [name]: value });
  }

  const handleClick = (WorkoutHash: string | undefined) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!WorkoutHash) return;
    setExercise(WorkoutHash as UUID);
  }

  return (
    <div id={`slide${slide.id}`}
      ref={ref}
      className="carousel-item content-grid grid-rows-1 w-full h-full"
      style={{ gridColumn: 'full-width'}}
    >
      <section className="grid grid-cols-2 tall:grid-cols-1 tall:grid-rows-[auto_auto_1fr] h-full [&>p]:text-center [&>p]:text-lg overflow-auto pt-20" style={{ gridColumn: 'full-width'}}>
        <div className={"grid grid-cols-1 justify-center relative"}>
          {slide.image && (
            <div className="box w-full">
              <Image
                {...slide.image}
                width={400}
                height={400}
              />
            </div>
          )}
          <div className="absolute top-0 left-[50%] -translate-x-1/2 content-grid place-items-center tall:place-items-end w-full h-full aspect-square p-5">
            <Link href={`${PAGES.WORKOUT}/${workout_id}`} className="btn btn-ghost btn-square self-start">
              <InformationCircleIcon className="size-5" />
            </Link>
            <Metrics
              {...workout_complex}
              completed={completed}
              startRest={startRest}
              setStartRest={setStartRest}
              handleForm={handleForm}
            />
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            { slideIds?.[slide.index - 1] ? (
                <button
                  type="button"
                  className="btn btn-circle btn-ghost"
                  onClick={handleClick(slideIds?.[slide.index - 1])}
                >
                  <ChevronLeftIcon className="size-5" />
                </button>
            ) : <div className="w-5" /> }
            { slideIds?.[slide.index + 1] && (
                <button
                  type="button"
                  className="btn btn-circle btn-ghost"
                  onClick={handleClick(slideIds?.[slide.index + 1])}
                >
                  <ChevronRightIcon className="size-5" />
                </button>
            )}
          </div>
        </div>
        <div className='content-grid space-y-4 order-first col-span-2 tall:order-none tall:col-auto'>
          <h3 className="max-h-20 text-center line-clamp-2 z-[1]">{ slide.title }</h3>
        </div>
        <div className='content-grid space-y-4'>
          <section className="place-items-center"><p>
            {/* { !!workout_complex.time && `${workout_complex.time} ${workout_complex.time_unit}` } */}
            {/* { !!workout_complex.weight && `${workout_complex.weight} ${workout_complex.weight_unit}` } */}
            { !!workout_complex.recommendations && ` - ${workout_complex.recommendations}` }
          </p></section>
          <WorkoutDayForm
            workout_complex={workout_complex}
            completed={completed}
            day={day}
            plan_id={plan_id}
            workout_id={workout_id}
            slide_id={slide.id}
            setStartRest={setStartRest}
            form={form}
            handleForm={handleForm}
          />
        </div>
      </section>
    </div>
  )
}

type FooterItemProps = {
  carouselRef: React.RefObject<HTMLDivElement>;
  slides: any[];
};

function FooterItem({ carouselRef, slides }: FooterItemProps) {
  const [snap, setSnap] = useState<number | string | null>("355px");
  const [ formStateWorkoutCloseDay, formActionWorkoutCloseDay ] = useFormState(handleSetWorkoutCloseDay, null);
  const dispatch = useAppDispatch()
  const setExercise = (state: UUID) => dispatch(set_exercise(state));
  const currExercise = useAppSelector(selectExercise);
  const router = useRouter();
  const slide = slides.find(({ id }) => id === currExercise);
  
  const slideIds = slides.map(({ id }) => id);
  const submit = slideIds.indexOf(currExercise) === slideIds.length - 1;
  const history = slide?.history;

  const handleClick = (WorkoutHash: string | undefined) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!WorkoutHash) return;
    setExercise(WorkoutHash as UUID);
  }
  
  const NextButton = () => submit ? (
    <form action={formActionWorkoutCloseDay}>
      <SubmitButton className={ slide.buttonNextClass }>
        { slide.buttonNextText }
      </SubmitButton>
    </form>
  ) : (
    <button
      type="button"
      className={ slide.buttonNextClass }
      onClick={handleClick(slideIds?.[slide.index + 1])}
    >
      { slide.buttonNextText }
      <ChevronRightIcon className="size-5" />
    </button>
  );

  useEffect(() => {
    if (currExercise ) {
      carouselRef.current && goToOtherImage(`#slide${currExercise}`, carouselRef.current, "smooth");
    } else if (slideIds?.[0]) {
      setExercise(slideIds[0] as UUID);
    }
  }, [ currExercise ]);

  useEffect(() => {
    if (formStateWorkoutCloseDay === 'done') {
      router.push(PAGES.HOME);
    }
  }, [formStateWorkoutCloseDay]);

  if (!slide) return null;

  return (
    <footer className="grid grid-cols-1 gap-2 g-gradient-to-t from-base-100 pb-10">
      <div className="flex justify-center w-full space-x-3 pb-4">
        { slideIds?.map((id) => (
          <button key={`slide-nav-${id}`}
            type="button"
            className={`w-3 h-3 ${slide.id === id ? 'bg-base-300' : 'bg-base-200'} rounded-full`}
            onClick={handleClick(id)}
          ></button>
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
              <div className="content-grid mx-auto w-full p-4 pt-5 space-y-2">
                { history }
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
        <NextButton />
      </div>
    </footer>
  )
}

type SlidesProps = {
  slides: any[];
};

export default function Slides({ slides }: SlidesProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const setExercise = (state: UUID) => dispatch(set_exercise(state));
  const currExercise = useAppSelector(selectExercise);
  const router = useRouter();

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
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
          console.log("Scrolling", scrollLeft);
          const refs = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
          refs.forEach((ref) => {
            const workout_id = ref.id.replace('slide', '');
            if (isInViewport(ref)) {
              ref.dataset.active = 'true';
              setExercise(workout_id as UUID);
            } else if (ref.dataset.active) {
              ref.removeAttribute('data-active');
            }
            router.prefetch(`${PAGES.WORKOUT}/${workout_id}`)
          });
        });
      }

      if (currExercise) {
        const refs = document.querySelectorAll('[data-active*="true"]');
        carouselRef.current && goToOtherImage(`#slide${currExercise}`, carouselRef.current, !refs.length ? "instant" : "smooth");
      } else {
        setExercise(slides[0].id);
      }

      carousel.addEventListener("touchend", endPull);
      return () => {
        carousel.removeEventListener("touchend", endPull);
      }
    }
  }, []);

  return (
    // grid-flow-row
    <div className="grid full-width grid-rows-[1fr_auto] w-full h-svh" style={{ margin: "0" }}>
      <div ref={carouselRef} className="carousel space-x-4 w-full" style={{gridColumn: 'full-width', margin: '0'}}>
        { slides.map((slide) => (
            <Slide
              key={`Slide${slide.id}`}
              carouselRef={carouselRef}
              submit={slide.index === slides.length - 1}
              slideIds={slides.map(({ id }) => id)}
              {...slide}
            />
        ))}
      </div>
      <FooterItem
        key={`FooterItem`}
        carouselRef={carouselRef}
        slides={slides}
      />
    </div>
  )
}

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function goToOtherImage (href: string, carousel: HTMLDivElement, behavior: 'instant' | 'smooth' = 'instant', callback?: () => void) {
  if (carousel) {
    const target = document.querySelector<HTMLDivElement>(href)!;
    if (!target || target.dataset.active) return;
    const refs = document.querySelectorAll('[data-active*="true"]');
    refs.forEach((div) => {
      div.removeAttribute('data-active');
    });
    target.dataset.active = 'true';
    const left = target.offsetLeft;
    carousel.scrollTo({ left: left, behavior });
    if (callback) {
      callback();
    }
  }
};