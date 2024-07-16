'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Drawer } from 'vaul';
import { useFormState } from 'react-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { ArrowTopRightOnSquareIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';

import { handleSetWorkoutCloseDay, handleSetWorkoutItem } from "@/lib/actions";

import SubmitButton from '@/app/ui/utils/SubmitButton';
import Card from '@/app/ui/Card';
import { WorkoutComplexParameters } from '@/lib/definitions';
import { Link, useRouter } from '@/navigation';
import { PAGES } from '@/lib/routes';

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

function Slide({ carouselId, scrolled, submit, slideIds, workout_complex, workout_id, plan_id, day, ...slide }: SlideProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [snap, setSnap] = useState<number | string | null>("355px");
  const [ formStateWorkoutCloseDay, formActionWorkoutCloseDay ] = useFormState(handleSetWorkoutCloseDay, null);
  const [ formStateWorkoutItem, formActionWorkoutItem ] = useFormState(handleSetWorkoutItem, null);
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const hash = event.currentTarget.hash;
    const path = `${window.location.origin}${window.location.pathname}`;
    window.location.replace(`${path}${hash}`)
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

  useEffect(() => {
    if (ref.current && isInViewport(ref.current)) {
      const hash = `#${ref.current.id}`;
      const path = `${window.location.origin}${window.location.pathname}`;
      window.location.replace(`${path}${hash}`);
    }
  }, [scrolled]);


  useEffect(() => {
    if (formStateWorkoutItem === 'saved') {
      formRef.current?.reset();
    }
  }, [formStateWorkoutItem]);

  useEffect(() => {
    if (formStateWorkoutCloseDay === 'done') {
      window.location.replace('/home');
    }
  }, [formStateWorkoutCloseDay]);

  useEffect(() => {
    router.prefetch(`${PAGES.WORKOUT}/${workout_id}`);
  }, []);

  return (
    <div id={`slide${slide.id}`}
      ref={ref}
      className="carousel-item content-grid grid-rows-1 w-full h-full"
      style={{ gridColumn: 'full-width'}}
    >
      <section className="grid grid-cols-1 [&>p]:text-center [&>p]:text-lg overflow-auto pt-20" style={{ gridColumn: 'full-width'}}>
        <div className='flex justify-center relative'>
          {slide.image && (
            <Image
              {...slide.image}
              width={400}
              height={400}
            />
          )}
          <Link href={`${PAGES.WORKOUT}/${workout_id}`} className="btn btn-xs btn-ghost btn-outline btn-square absolute top-2 right-2">
            <InformationCircleIcon className="size-5" />
          </Link>
        </div>
        <div className='content-grid space-y-4'>
          <h3 className="text-center pt-4">{ slide.title }</h3>
          <section><p>
            { !!workout_complex.time && `${workout_complex.time} ${workout_complex.time_unit}` }
            { !!workout_complex.weight && `${workout_complex.weight} ${workout_complex.weight_unit}` }
            { !!workout_complex.recommendations && ` - ${workout_complex.recommendations}` }
          </p></section>
          <section className="grid grid-cols-3 justify-between gap-4">
            <Card className="[&>strong]:font-medium size-24">
              <div className="flex gap-1 justify-center w-full">
                { workout_complex.reps ? (
                  <><strong>{ workout_complex.reps }</strong>reps</>
                ) : "NO" }
              </div>
            </Card>
            <Card className="[&>strong]:font-medium size-24">
              <div className="flex gap-1 justify-center w-full">
                <strong>-</strong>
                { workout_complex.time_unit }
              </div>
            </Card>
            <Card className="[&>strong]:font-medium size-24">
              <div className="flex flex-col items-center gap-1 w-full">
                { workout_complex.sets ? (
                  <><strong>{ workout_complex?.sets_done ?? 0 } / { workout_complex.sets }</strong>sets</>
                ) : (
                  <><strong>{ workout_complex?.time_done ?? 0 } / { workout_complex.time }</strong>{ workout_complex.time_unit }</>
                )}
              </div>
            </Card>
          </section>
          <section>
            <form ref={formRef} action={formActionWorkoutItem} className="grid grid-cols-1 gap-2 w-full">
              <input type="hidden" name="day" value={ day } />
              <input type="hidden" name="workout_id" value={ workout_id } />
              <input type="hidden" name="workout_complex_id" value={ slide.id } />
              <input type="hidden" name="plan_id" value={ plan_id } />
              <div className="join w-full">
                { workout_complex.reps && (
                  <div className="join-item grow grid grid-cols-2">
                    <input className="input input-bordered rounded-r-none" name="reps" placeholder="reps" type="number" pattern="[0-9]*" inputMode="numeric" required />
                    <input className="input input-bordered rounded-none" name="weight" placeholder={ `${workout_complex.weight_unit}` } type="number" pattern="[0-9]*" inputMode="numeric" required />
                  </div>
                )}
                { workout_complex.time && (
                  <div className="join-item grow grid grid-cols-1">
                    <input className="input input-bordered rounded-r-none" name="time" placeholder={ `${workout_complex.time_unit}` } type="number" pattern="[0-9]*" inputMode="numeric" required />
                  </div>
                )}
                <SubmitButton className="btn join-item rounded-r-full">
                  <PlusIcon className="size-4" />
                </SubmitButton>
              </div>
            </form>
          </section>
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
  const [ scrolled, setScrolled ] = useState<number>(0);
  const carouselId = 'exercise-run';

  useEffect(() => {
    const carousel = document.getElementById(carouselId) as HTMLElement;
    if (carousel) {
      const handleScroll = (event: Event) => {
        setScrolled((event.target as HTMLElement).scrollLeft);
      }

      carousel.addEventListener('scroll', handleScroll);
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      }
    }
    if (window.location.hash) {
      goToOtherImage(window.location.hash, carouselId);
    }
  }, []);

  return (
    <div id={carouselId} className="carousel space-x-4 w-full h-svh" style={{margin: '0'}}>
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