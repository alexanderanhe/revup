'use client'

import Image from 'next/image'
import React, { Fragment, use, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { handleOnboarding } from "@/lib/actions";
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Drawer } from 'vaul';

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
  index: number;
  buttonClass?: string;
  buttonText?: string;
  buttonNextText?: string;
  submit?: boolean;
  slideIds?: string[];
};

export default function Slide({ carouselId, submit, slideIds, ...slide }: SlideProps) {
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
          <p>{ slide.description }</p>
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
        
        <Drawer.Root shouldScaleBackground>
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