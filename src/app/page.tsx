import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import logo from './logo.svg'
import Image from "next/image";
import OpenLoginDialog from "@/components/utils/dialogs/buttons/OpenLoginDialog";
import { LogoIcon } from "@/components/utils/icons";

export default async function IndexPage() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <nav id="header" className="sticky w-full top-0 text-white backdrop-blur transition-colors duration-500 bg-gray-400/50 z-[1]">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-4 py-2">
          <div className="flex items-center">
            <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
              <LogoIcon className="w-auto h-12 fill-current inline" />
            </a>
          </div>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="flex lg:hidden items-center p-1 text-white hover:text-[#7f2784] focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </div>
            <div tabIndex={0} className="w-full flex-grow lg:flex lg:items-center min-w-80 lg:w-auto max-lg:base-200 max-lg:dropdown-content mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0" id="nav-content">
              <ul className="list-reset lg:flex justify-end flex-1 items-center">
                {/* <li className="mr-3">
                  <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="#">Active</a>
                </li> */}
                <li className="mr-3">
                  <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">About</a>
                </li>
                <li className="mr-3">
                  <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">Pricing</a>
                </li>
                {!user && <li className="mr-3">
                  <OpenLoginDialog
                    state='signUp'
                    className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  >
                    Sing Up
                  </OpenLoginDialog>
                </li>}
              </ul>
              {!user ? <OpenLoginDialog
                state='signIn'
                className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Login
              </OpenLoginDialog>
              : <Link
                href='/home'
                className="">Enter</Link>}
            </div>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">What are you waiting for?</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Stay motivated and reach your fitness goals.
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Track your progress, create custom routines, and connect with a community.
            </p>
            <Link href="/home"  className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Get Started
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 flex justify-center">
            <Image width={631} height={631} alt="hero" className="w-full lg:w-3/5" src="/images/hero2.webp" />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
            </g>
            <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path
                d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Stay on Track with Customized Routines
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Set Goals
              </h3>
              <p className="text-gray-600 mb-8">
                Define your fitness objectives and let the app suggest tailored workout plans.
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
                  Build Routines
                </h3>
                <p className="text-gray-600 mb-8">
                  Easily create and save custom routines using our extensive exercise library.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Stay Consistent
              </h3>
              <p className="text-gray-600 mb-8">
                Receive helpful reminders and track your progress to stay motivated and on track.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <Image width={1500} height={500} src='/images/7635479-ai.webp' alt="Stay Consistent" className="w-full mx-auto"></Image>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Workout Planner and Scheduler
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
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-start">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Action
                </button>
              </div>
            </div>
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
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Action
                </button>
              </div>
            </div>
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
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-end">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Pricing
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
              <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
                <div className="p-8 text-3xl font-bold text-center border-b-4">
                  Free
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                  $0<small>MXN</small>
                  <span className="text-base">for one user</span>
                </div>
                <div className="flex items-center justify-center">
                  <OpenLoginDialog
                    state='signUp'
                    className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Sing Up
                  </OpenLoginDialog>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <div className="w-full p-8 text-3xl font-bold text-center">Basic</div>
                <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                <ul className="w-full text-center text-base font-bold">
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  $99<small>MXN</small>
                  <span className="text-base">/ per user</span>
                </div>
                <div className="flex items-center justify-center">
                  <OpenLoginDialog
                    state='signUp'
                    className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Sing Up
                  </OpenLoginDialog>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
              <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
                <div className="p-8 text-3xl font-bold text-center border-b-4">
                  Pro
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                  <li className="border-b py-4">Thing</li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                  $200<small>MXN</small>
                  <span className="text-base">/ per user</span>
                </div>
                <div className="flex items-center justify-center">
                  <OpenLoginDialog
                    state='signUp'
                    className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Sing Up
                  </OpenLoginDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path
                d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
              ></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <section className="container mx-auto text-center py-6 mb-12">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
          Call to Action
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <h3 className="my-4 text-3xl leading-tight">
          Main Hero Message to sell yourself!
        </h3>
        <button className="mx-auto hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Action!
        </button>
      </section>
      <footer className="bg-base-100">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6 text-black">
              <a className="no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                <LogoIcon className="w-auto h-40 fill-current inline" />
              </a>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Links</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Support</a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Legal</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Terms</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy</a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Social</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Linkedin</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Twitter</a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Company</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a href="https://www.freepik.com/free-photos-vectors/background" className="text-gray-500">Background vector created by freepik - www.freepik.com</a>
      </footer>
    </div>
  );
}
