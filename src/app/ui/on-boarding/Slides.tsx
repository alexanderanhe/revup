'use client'

import Slide from "./Slide";

const slides = [
  {
    key: 1,
    title: 'Track your goal',
    description: 'Don\'t worry if you have trouble determining your goals, We can help you determine your goals and track your goals',
    image: {
      src: '/images/on-boarding_track-your-goal.svg',
      alt: 'Track your goal',
      className: "w-full h-[60svh] aspect-square md:aspect-square object-cover md:object-contain"
    },
    buttonClass: 'btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full',
    buttonText: 'Siguiente',
  },
  {
    key: 2,
    title: 'Get Burn',
    description: 'Let\'s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever',
    image: {
      src: '/images/on-boarding_get-burn.svg',
      alt: 'Get Burn',
      className: "w-full h-[60svh] aspect-square md:aspect-square object-cover md:object-contain"
    },
    buttonClass: 'btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full',
    buttonText: 'Siguiente',
  },
  {
    key: 3,
    title: 'Eat Well',
    description: 'Let\'s start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun',
    image: {
      src: '/images/on-boarding_eat-well.svg',
      alt: 'Eat Well',
      className: "w-full h-[60svh] aspect-square md:aspect-square object-cover md:object-contain"
    },
    buttonClass: 'btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full',
    buttonText: 'Siguiente',
  },
  {
    key: 4,
    title: 'Improve Sleep Quality',
    description: 'Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning',
    image: {
      src: '/images/on-boarding_improve-sleep-quality.svg',
      alt: 'Improve Sleep Quality',
      className: "w-full h-[60svh] aspect-square md:aspect-square object-cover md:object-contain"
    },
    buttonClass: 'btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full',
    buttonText: 'Iniciar',
  },
  // {
  //   key: 5,
  //   title: 'Work out at home or at the gym',
  //   description: 'Lose weight, gain muscle mass, pump your glutes and gain more muscle definition with our ready-made workout and nutrition plans.',
  //   image: {
  //     src: '/images/4l8UH4G2_Dg-unsplash.webp',
  //     style: { maskImage: "linear-gradient(black 60%, transparent)"},
  //     alt: 'Work out at home or at the gym',
  //     className: "w-full h-[60svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
  //   },
  //   buttonClass: 'btn btn-secondary w-full uppercase',
  //   buttonText: 'Siguiente',
  // },
  // {
  //   key: 6,
  //   title: 'Create your own workout plan',
  //   description: 'Create your own workout plan and track your progress with our easy-to-use workout planner.',
  //   image: {
  //     src: '/images/mk1GMRfkO5U-unsplash.webp',
  //     style: { maskImage: "linear-gradient(black 60%, transparent)"},
  //     alt: 'Create your own workout plan',
  //     className: "w-full h-[60svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
  //   },
  //   buttonClass: 'btn btn-secondary w-full uppercase',
  //   buttonText: 'Siguiente',
  // },
  // {
  //   key: 7,
  //   title: 'Select a trainer',
  //   description: 'Obtain personalized advice from our team of professional trainers and nutritionists.',
  //   image: {
  //     src: '/images/R0y_bEUjiOM-unsplash.webp',
  //     style: { maskImage: "linear-gradient(black 60%, transparent)"},
  //     alt: 'Select a trainer',
  //     className: "w-full h-[60svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
  //   },
  //   buttonClass: 'btn btn-secondary w-full uppercase',
  //   buttonText: 'Siguiente',
  // },
  // {
  //   key: 8,
  //   title: 'Be part of the fitness community',
  //   description: 'Share your progress, get inspired by others, and stay motivated with our community of fitness enthusiasts.',
  //   image: {
  //     src: '/images/XUn7yMZH2yg-unsplash.webp',
  //     style: { maskImage: "linear-gradient(black 60%, transparent)"},
  //     alt: 'Be part of the fitness community',
  //     className: "w-full h-[60svh] aspect-[3/4] md:aspect-square object-cover md:object-contain shadow-lg"
  //   },
  //   buttonClass: 'btn btn-primary w-full uppercase',
  //   buttonText: 'Start',
  // },
]

export default function Slides() {
  return (
    <div className="carousel space-x-4 w-full h-svh">
      { slides.map(({key, ...props}, index) => (
        <div key={`Slide${key}`} id={`slide${index}`} className="carousel-item content-grid grid-rows-1 w-full h-full">
          <Slide {...props} index={index} submit={index === slides.length - 1} />
        </div>
      ))}
    </div>
  )
}