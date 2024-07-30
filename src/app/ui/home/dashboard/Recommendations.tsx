'use client'

export default function Recommendations({ data: recomendations, translate }: { data?: string[] | null, translate?: {[key: string]: string} }) {
  return (
    <div className="w-full overflow-y-auto space-y-1 py-2">
      <div className="font-semibold">{ translate?.title ?? "-" }</div>
      { !!recomendations?.length ? (
        <div className="w-full inline-flex flex-nowrap">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            { recomendations.map((recomendation, i) => (
              <li key={`recomendations${recomendation}${i}`} className="flex-none">
                { recomendation }
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{ translate?.noRecommendations }</p>
      )}
    </div>
  )
}