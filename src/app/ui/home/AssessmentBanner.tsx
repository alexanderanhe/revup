import { Link } from "@/navigation";


export default function AssessmentBanner() {
  return (
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
  )
}