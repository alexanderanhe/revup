'use client'

import Image from 'next/image'
import React, { Fragment, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { handleOnboarding } from "@/lib/actions";
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

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
  index?: number;
  buttonClass?: string;
  buttonText?: string;
  submit?: boolean;
  slideIds?: string[];
};

export default function Slide({ submit, slideIds, ...slide }: SlideProps) {
  const [ formState, formAction ] = useFormState(handleOnboarding, null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const hash = event.currentTarget.hash;
    const path = `${window.location.origin}${window.location.pathname}`;
    window.location.replace(`${path}${hash}`)
  }

  useEffect(() => {
    if (formState === 'done') {
      window.location.replace('/home');
    }
  }, [formState]);

  return (
    <Fragment>
      <section className="grid grid-cols-1 [&>p]:text-center [&>p]:text-lg" style={{ gridColumn: 'full-width'}}>
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
            <a key={`index-${id}`}
              href={`#slideNav${id}`}
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
          <a href={`#slide${(slide.index ?? 0) + 1}`} onClick={handleClick} className={ slide.buttonClass }>
            { slide.buttonText }
            <ChevronRightIcon className="size-5" />
          </a>
        )}
      </footer>
    </Fragment>
  )
}