export default function Skeleton() {
  return (
    <section className="row-end-auto w-full max-h-[calc(100svh_-_14rem)] p-0 overflow-hidden">
      <div className="grid grid-cols-1 gap-2 w-full h-full">
        { Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton shadow-2xl rounded-2xl h-28 w-full"></div>
        ))}
      </div>
    </section>
  )
}