'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Drawer } from 'vaul';
import { useFormState, useFormStatus } from 'react-dom';
import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { handleOnboarding } from "@/lib/actions";

import SubmitButton from '@/app/ui/utils/SubmitButton';
import Card from '@/app/ui/Card';
import { WorkoutComplexParameters } from '@/lib/definitions';

type SlideProps = {
  carouselId: string;
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
  index: number;
  buttonClass?: string;
  buttonText?: string;
  buttonNextText?: string;
  submit?: boolean;
  slideIds?: string[];
};

function Slide({ carouselId, submit, slideIds, workout_complex, ...slide }: SlideProps) {
  const [snap, setSnap] = useState<number | string | null>("355px");
  const [ formState, formAction ] = useFormState(handleOnboarding, null);
  const ref = React.useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const carousel = document.getElementById(carouselId) as HTMLElement;
    if (carousel) {
      const handleScroll = () => {
        if (ref.current && isInViewport(ref.current)) {
          const hash = `#${ref.current.id}`;
          const path = `${window.location.origin}${window.location.pathname}`;
          window.location.replace(`${path}${hash}`);
        }
      }

      carousel.addEventListener('scroll', handleScroll);
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  useEffect(() => {
    if (formState === 'done') {
      window.location.replace('/home');
    }
  }, [formState]);

  return (
    <div id={`slide${slide.id}`}
      ref={ref}
      className="carousel-item content-grid grid-rows-1 w-full h-full"
      style={{ gridColumn: 'full-width'}}
    >
      <section className="grid grid-cols-1 [&>p]:text-center [&>p]:text-lg overflow-auto pt-20" style={{ gridColumn: 'full-width'}}>
        <div className='flex justify-center'>
          {slide.image && (
            <Image
              {...slide.image}
              width={400}
              height={400}
            />
          )}
        </div>
        <div className='content-grid'>
          <h2 className="text-center py-4">{ slide.title }</h2>
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
                  <><strong>0 / { workout_complex.sets }</strong>sets</>
                ) : (
                  <><strong>0 / { workout_complex.time }</strong>{ workout_complex.time_unit }</>
                )}
              </div>
            </Card>
          </section>
          {/* <p>{ slide.description }</p> */}
        </div>
      </section>
      <footer className="grid grid-cols-1 gap-2 pb-10">
        <div className="flex justify-center w-full space-x-3 pb-4">
          { slideIds?.map((id) => (
            <a key={`slide-nav-${id}`}
              href={`#slide${id}`}
              onClick={handleClick}
              className={`w-3 h-3 ${slide.id === id ? 'bg-base-300' : 'bg-base-200'} rounded-full`}
            ></a>
          ))}
        </div>
        
        <Drawer.Root
          snapPoints={["148px", "355px", 1]}
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
                { submit ? (
                  <form action={formAction}>
                    <SubmitButton className={ slide.buttonClass }>
                      { slide.buttonNextText }
                    </SubmitButton>
                  </form>
                ) : (
                  <a href={`#slide${slideIds?.[slide.index + 1]}`} onClick={handleClick} className={ slide.buttonClass }>
                    { slide.buttonNextText }
                    <ChevronRightIcon className="size-5" />
                  </a>
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </footer>
    </div>
  )
}

type SlidesProps = {
  slides: any[];
};

export default function Slides({ slides }: SlidesProps) {
  const carouselId = 'exercise-run';

  useEffect(() => {
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