'use client'

import Slide from "./Slide";
import Login from "./Login";
import { useState } from "react";
import { redirect } from "@/navigation";
import { PAGES } from "@/lib/routes";
import { useSession } from "next-auth/react";

const slides = [
  {
    key: 1,
    title: 'Work out at home or at the gym',
    description: 'Lose weight, gain muscle mass, pump your glutes and gain more muscle definition with our ready-made workout and nutrition plans.',
    image: '/images/4l8UH4G2_Dg-unsplash.webp',
    index: 0,
    buttonClass: 'btn btn-secondary w-full uppercase',
    buttonText: 'Siguiente',
    Component: Slide
  },
  {
    key: 2,
    title: 'Create your own workout plan',
    description: 'Create your own workout plan and track your progress with our easy-to-use workout planner.',
    image: '/images/mk1GMRfkO5U-unsplash.webp',
    index: 1,
    buttonClass: 'btn btn-secondary w-full uppercase',
    buttonText: 'Siguiente',
    Component: Slide
  },
  {
    key: 3,
    title: 'Select a trainer',
    description: 'Obtain personalized advice from our team of professional trainers and nutritionists.',
    image: '/images/R0y_bEUjiOM-unsplash.webp',
    index: 2,
    buttonClass: 'btn btn-secondary w-full uppercase',
    buttonText: 'Siguiente',
    Component: Slide
  },
  {
    key: 4,
    title: 'Be part of the fitness community',
    description: 'Share your progress, get inspired by others, and stay motivated with our community of fitness enthusiasts.',
    image: '/images/XUn7yMZH2yg-unsplash.webp',
    index: 3,
    buttonClass: 'btn btn-primary w-full uppercase',
    buttonText: 'Start',
    Component: Slide
  },
  {
    key: 5,
    buttonClass: 'btn btn-info btn-outline w-full uppercase',
    buttonText: 'Skip',
    Component: Login
  },
]

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { data: session, status } = useSession();
  const { HOME } = PAGES;

  const handleNext = () => setCurrentSlide((prevSlide) => {
    if (prevSlide === slides.length - 1) {
      redirect(HOME);
      return 0;
    };
    return prevSlide + 1
  });

  return (
    <div className="content-grid grid-rows-[1fr_auto] w-full h-svh">
      { slides.filter((_, index) => currentSlide === index).map(({key, Component, ...props}) => (
        <Component
          key={`Slide${key}`}
          {...props}
          submit={currentSlide === slides.length - (session ? 2 : 1)}
          handleNext={handleNext} />
      ))}
    </div>
  )
}