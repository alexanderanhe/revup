'use client'

import Image from 'next/image'
import React, { Fragment, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { handleOnboarding } from "@/lib/actions";
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import FormOnBoarding from './FormOnBoarding';
import { PAGES } from '@/lib/routes';

type SlideProps = {
  title?: string;
  description?: string;
  image: React.ReactNode;
  index?: number;
  buttonClass?: string;
  buttonText?: string;
  submit?: boolean;
};

export default function Slide({ submit, ...slide }: SlideProps) {

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const hash = event.currentTarget.hash;
    const path = `${window.location.origin}${window.location.pathname}`;
    window.location.replace(`${path}${hash}`)
  }

  return (
    <Fragment>
      <section className="grid grid-cols-1 [&>p]:text-center [&>p]:text-lg" style={{ gridColumn: 'full-width'}}>
        <div className='flex justify-center'>
          { slide.image }
        </div>
        <div className='content-grid'>
          <h2 className="text-center py-4">{ slide.title }</h2>
          <p>{ slide.description }</p>
        </div>
      </section>
      <footer className="grid grid-cols-1 gap-2 pb-10">
        <div className="flex justify-center w-full space-x-3 pb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <a href={`#slide${index}`} onClick={handleClick} key={`index-${index}`} className={`w-3 h-3 ${slide.index === index ? 'bg-base-300' : 'bg-base-200'} rounded-full`}></a>
          ))}
        </div>
        { submit ? (
          <FormOnBoarding onDone={() => window.location.replace(PAGES.HOME)}>
            <SubmitButton className={ slide.buttonClass }>
              { slide.buttonText }
            </SubmitButton>
          </FormOnBoarding>
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