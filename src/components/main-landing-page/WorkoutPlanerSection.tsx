import { getTranslations } from "next-intl/server";

export default async function WorkoutPlanerSection() {
  const t = await getTranslations("MainLangingPage");

  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          { t("workoutPlanner.title") }
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <p>Manage your workout schedule with ease. Our app allows you to plan, organize, and track your fitness activities, ensuring you never miss a session.</p>
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                APP
              </p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">
                Calendar View
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Visualize your weekly and monthly workout schedule at a glance.
              </p>
            </a>
          </div>
          {/* <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Action
              </button>
            </div>
          </div> */}
        </div>
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                APP
              </p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">
                Customizable Schedules
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Create personalized workout plans that fit your lifestyle and commitments.
              </p>
            </a>
          </div>
          {/* <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-center">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Action
              </button>
            </div>
          </div> */}
        </div>
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                APP
              </p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">
                Automatic Reminders
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Receive push notifications to help you stay on top of your fitness routine.
              </p>
            </a>
          </div>
          {/* <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-end">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Action
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}