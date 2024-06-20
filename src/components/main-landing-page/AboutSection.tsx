import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutSection() {
  const t = await getTranslations("MainLangingPage");

  return (
    <section className="bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          { t("about.title") }
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            { t("about.goals.title") }
            </h3>
            <p className="text-gray-600 mb-8">
            { t("about.goals.description") }
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <div className="w-full mx-auto"></div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <div className="w-5/6 mx-auto"></div>
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              { t("about.build.title") }
              </h3>
              <p className="text-gray-600 mb-8">
              { t("about.build.description") }
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            { t("about.consistent.title") }
            </h3>
            <p className="text-gray-600 mb-8">
            { t("about.consistent.description") }
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <Image width={1500} height={500} src='/images/7635479-ai.webp' alt="Stay Consistent" className="w-full mx-auto"></Image>
          </div>
        </div>
      </div>
    </section>
  )
}