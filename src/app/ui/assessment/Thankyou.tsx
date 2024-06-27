import Link from 'next/link'
import Section from '@/app/ui/utils/templates/Section'
import Image from 'next/image'

const Thankyou = () => {
  return (
    <Section title="Gracias por completar la evaluación" buttons={[
        <Link
          key={"nextConfirm"}
          href='/home'
          className="btn btn-primary w-full"
        >
          Finalizar
        </Link>
      ]}>
      <p>En base a tus respuestas, te recomendamos el siguiente programa de entrenamiento:</p>
      <div className="card max-w-96 bg-base-100 shadow-xl image-full mx-auto">
        <figure>
          <Image
            width={430}
            height={253}
            src="/images/9GdMuamOGlc-unsplash.webp"
            alt="Plan personalizado a tu medida"
        /></figure>
        <div className="card-body [&>p]:text-white [&>h2]:text-white items-center text-center">
          <h2 className="card-title">Plan personalizado a tu medida!</h2>
          <p>Fortalece tu espalda</p>
          <div className="card-actions justify-end">
            
          </div>
        </div>
      </div>
  </Section>
  )
}

export default Thankyou