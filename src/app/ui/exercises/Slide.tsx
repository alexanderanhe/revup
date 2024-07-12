'use client'

import Image from 'next/image'
import React, { Fragment, use, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { handleOnboarding } from "@/lib/actions";
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

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
        { submit ? (
          <form action={formAction}>
            <SubmitButton className={ slide.buttonClass }>
              { slide.buttonText }
            </SubmitButton>
          </form>
        ) : (
          <a href={`#slide${slideIds?.[slide.index + 1]}`} onClick={handleClick} className={ slide.buttonClass }>
            { slide.buttonText }
            <ChevronRightIcon className="size-5" />
          </a>
        )}
      </footer>
    </div>
  )
}