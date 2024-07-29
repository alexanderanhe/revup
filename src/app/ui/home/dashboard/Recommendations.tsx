'use client'

export default function Recommendations({ translate }: { translate?: {[key: string]: string} }) {
  return (
    <div className="w-full overflow-y-auto space-y-1 py-2">
      <div className="font-semibold">{ translate?.title ?? "-" }</div>
      {/* <div className="w-full inline-flex flex-nowrap">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          { Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map((letter) => (
            <li key={letter} className="flex-none">
              {letter}
            </li>
          ))}
        </ul>
      </div> */}
      <p>{ translate?.noRecommendations }</p>
    </div>
  )
}