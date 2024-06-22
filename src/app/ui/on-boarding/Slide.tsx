'use client'

import Image from 'next/image'
import React, { Fragment } from 'react'
import { useFormStatus } from 'react-dom';
import { handleOnboarding } from "@/lib/actions";
import { Link } from '@/navigation';

type SlideProps = {
  title?: string;
  description?: string;
  image?: string;
  index?: number;
  buttonClass?: string;
  buttonText?: string;
  submit?: boolean;
};

function Slide({ submit, ...slide }: SlideProps) {
  const { pending } = useFormStatus();

  return (
    <Fragment>
      <section className="grid grid-cols-1 [&>p]:text-center [&>p]:text-lg" style={{ gridColumn: 'full-width'}}>
        <div className='flex justify-center'>
          {slide.image && (
            <Image
              className="w-full h-[60svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
              src={slide.image}
              style={{ maskImage: "linear-gradient(black 60%, transparent)"}}
              alt={ slide.title ?? 'Slide image'}
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
          {Array.from({ length: 4 }).map((_, index) => (
            <a key={`index-${index}`} href={`#slide${index}`} className={`w-3 h-3 ${slide.index === index ? 'bg-base-300' : 'bg-base-200'} rounded-full`}></a>
          ))}
        </div>
        { submit ? (
          <form action={handleOnboarding}>
            <input type="hidden" name="onboarding" value="1" />
            <input type="hidden" name="next" value="/home" />
            <button
              type="submit"
              disabled={pending}
              className={ slide.buttonClass }
            >
              { slide.buttonText }
            </button>
          </form>
        ) : (
          <Link
            href={`/#slide${(slide.index ?? 0) + 1}`}
            scroll={false}
            className={ slide.buttonClass }
            replace
          >
            { slide.buttonText }
          </Link>
        )}
      </footer>
    </Fragment>
  )
}

export default Slide