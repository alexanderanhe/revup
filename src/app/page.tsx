import Image from "next/image";
import Stats from "@/components/home/Stats";
import LayoutContent from "@/components/templates/LayoutContent";

export default function Home() {
  return (
    <LayoutContent title="">
      {/* <section className="full-width py-0">
        <h1 className="flex flex-col text-3xl font-semibold text-zinc-200 [&>strong]:font-bold [&>strong]:text-zinc-900">
          Hola, <strong>Brayan</strong>
        </h1>
      </section> */}
      <Stats />

      {/* <section className="grid grid-cols-autofit">
        <div className="card shadow-xl image-full">
          <figure>
            <Image
              width={300}
              height={300}
              src="/images/coiWR0gT8Cw-unsplash.webp"
              alt="Shoes"
            /></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Yoga!</h2>
            <p>El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card shadow-xl image-full">
          <figure>
            <Image
              width={300}
              height={300}
              src="/images/fS3tGOkp0xY-unsplash.webp"
              alt="Shoes"
            /></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Peso</h2>
            <p>El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </section> */}
    </LayoutContent>
  );
}
