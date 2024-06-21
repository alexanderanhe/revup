import Slide from "./Slide";

const slides = [
  {
    key: 1,
    title: 'Work out at home or at the gym',
    description: 'Lose weight, gain muscle mass, pump your glutes and gain more muscle definition with our ready-made workout and nutrition plans.',
    image: '/images/4l8UH4G2_Dg-unsplash.webp',
    index: 0,
    buttonClass: 'btn btn-secondary w-full uppercase',
    buttonText: 'Siguiente',
  },
  {
    key: 2,
    title: 'Create your own workout plan',
    description: 'Create your own workout plan and track your progress with our easy-to-use workout planner.',
    image: '/images/mk1GMRfkO5U-unsplash.webp',
    index: 1,
    buttonClass: 'btn btn-secondary w-full uppercase',
    buttonText: 'Siguiente',
  },
  {
    key: 3,
    title: 'Select a trainer',
    description: 'Obtain personalized advice from our team of professional trainers and nutritionists.',
    image: '/images/R0y_bEUjiOM-unsplash.webp',
    index: 2,
    buttonClass: 'btn btn-secondary w-full uppercase',
    buttonText: 'Siguiente',
  },
  {
    key: 4,
    title: 'Be part of the fitness community',
    description: 'Share your progress, get inspired by others, and stay motivated with our community of fitness enthusiasts.',
    image: '/images/XUn7yMZH2yg-unsplash.webp',
    index: 3,
    buttonClass: 'btn btn-primary w-full uppercase',
    buttonText: 'Start',
  },
]

export default function Slides() {
  return (
    <div className="carousel space-x-4 w-full h-svh">
      { slides.map(({key, ...props}) => (
        <div key={`Slide${key}`} id={`slide${props.index}`} className="carousel-item content-grid grid-rows-1 w-full h-full">
          <Slide {...props} submit={props.index === slides.length - 1} />
        </div>
        ))}
    </div>
  )
}