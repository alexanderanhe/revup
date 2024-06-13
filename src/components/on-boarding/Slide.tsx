import Image from 'next/image'
import React, { Fragment } from 'react'

type SlideProps = {
  title?: string;
  description?: string;
  image?: string;
  index?: number;
  buttonClass?: string;
  buttonText?: string;
  handleNext: () => void;
};

function Slide({ handleNext, ...slide }: SlideProps) {
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
            <button
              type="button"
              key={`index-${index}`}
              className={`w-3 h-3 ${slide.index === index ? 'bg-base-300' : 'bg-base-200'} rounded-full`}
            ></button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className={ slide.buttonClass }
        >
          { slide.buttonText }
        </button>
      </footer>
    </Fragment>
  )
}

export default Slide