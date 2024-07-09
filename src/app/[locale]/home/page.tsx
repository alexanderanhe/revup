import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { auth } from "@/auth";

import LayoutContent from "@/app/ui/utils/templates/LayoutContent";
import Stats from "@/app/ui/home/Stats";
import AssessmentBanner from "@/app/ui/home/AssessmentBanner";
import { APPCOOKIES, User } from "@/lib/definitions";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  const Assessment = async () => {
    const hasAssessment = (user as User)?.info?.assessment || cookies().has(APPCOOKIES.ASSESSMENT);
    if (hasAssessment) {
      return;
    }
    const t = await getTranslations("Assessment.banner")
    return (
      <AssessmentBanner
        title={t("title")}
        description={t("description")}
        buttonText={t("buttonText")}
      />
    )
  }

  return (
    <>
      <Assessment />
      { user && <Stats /> }
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
              <button className="btn btn-primary btn-wide">Ver</button>
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
              <button className="btn btn-primary btn-wide">Ver</button>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
