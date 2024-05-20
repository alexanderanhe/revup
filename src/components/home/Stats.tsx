'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

const Stats = () => {
  const [hasAssessment, setHasAssessment] = useState(false);

  const progress = 70;
  const workoutProgressStyles = {
    "--value": progress,
    "--size": "4rem"
  } as React.CSSProperties

  useEffect(() => {
    const hasAssessmentLS = localStorage.getItem('hasAssessment');
    setHasAssessment(!!hasAssessmentLS)
  }, [])

  return (
    <>
      { hasAssessment ? (
        <>
          <section className="grid grid-cols-[1fr_auto] place-items-center rounded-3xl bg-black p-4">
            <div className="w-full text-white">
              <h2>Progreso del Ejercicios</h2>
              <p>12 rutinas restantes</p>
            </div>
            <div className="radial-progress text-white text-lg font-semibold before:text-success" style={workoutProgressStyles} role="progressbar">70%</div>
          </section>
          <section>
            <h2>Weekly stats</h2>
            <div className="grid grid-cols-2 grid-rows-3 w-full gap-2">
              <div className="grid grid-rows-subgrid row-span-2 shadow-md bg-blue-200/60 text-black rounded-3xl place-items-center p-4">
                <div className="flex bg-white size-9 text-xl rounded-full items-center justify-center self-end">🔥</div>
                <div>
                  <div className="text-xl font-bold text-center">2,154</div>
                  <div className="stat-title">kcal burnt</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 shadow-md bg-green-200/60 text-black rounded-3xl place-items-center p-4">
                <div className="flex bg-white size-9 text-xl rounded-full items-center justify-center">⌛️</div>
                <div className="text-left justify-start">
                  <div className="text-xl font-bold">16h</div>
                  <div className="stat-title">total time</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 shadow-md bg-zinc-300/60 text-black rounded-3xl place-items-center p-4">
                <div className="flex bg-white size-9 text-xl rounded-full items-center justify-center">💪</div>
                <div className="text-left justify-start">
                  <div className="text-xl font-bold">107</div>
                  <div className="stat-title">excercises</div>
                </div>
              </div>

              <div className="grid grid-cols-subgrid shadow-md bg-base text-base-content-100 rounded-3xl place-items-center col-span-2">
                <div>
                  <div className="stat-title">most active</div>
                  <div className="text-xl font-bold text-center">Thursday</div>
                </div>
                <div className="grid grid-cols-7 grid-rows-1 w-full">
                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/30" style={{"height": "25%"}}></div>
                    <div className="text-xs font-bold text-center">L</div>
                  </div>

                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/30" style={{"height": "50%"}}></div>
                    <div className="text-xs font-bold text-center">M</div>
                  </div>

                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/30" style={{"height": "75%"}}></div>
                    <div className="text-xs font-bold text-center">M</div>
                  </div>

                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/70" style={{"height": "90%"}}></div>
                    <div className="text-xs font-bold text-center">J</div>
                  </div>

                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/30" style={{"height": "17%"}}></div>
                    <div className="text-xs font-bold text-center">V</div>
                  </div>
                  
                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/30" style={{"height": "80%"}}></div>
                    <div className="text-xs font-bold text-center">S</div>
                  </div>

                  <div className="flex flex-col flex-nowrap justify-end w-3 h-16 overflow-hidden">
                    <div className="overflow-hidden bg-gray-300/30" style={{"height": "17%"}}></div>
                    <div className="text-xs font-bold">D</div>
                  </div>
                </div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
              
            </div>
          </section>
        </>
      ) : (
        <section className="full-width place-items-center bg-[url('/images/0Wra5YYVQJE-unsplash.webp')] bg-center min-h-[60vh]">
          <div className="card max-w-96 glass text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="text-2xl">No has completado tu evaluación</h2>
              <p>Completa tu evaluación para ver tus estadísticas</p>
              <div className="card-actions justify-end">
                <Link
                  href="/assessment"
                  className="btn btn-primary"
                >Completar evaluación</Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Stats