import { Link } from "@/navigation";
import { auth } from "@/auth";
import { LogoIcon } from "@/components/utils/icons";
import OpenLoginDialog from "@/components/utils/dialogs/buttons/OpenLoginDialog";
import { getTranslations } from "next-intl/server";

export default async function NavHeader() {
  let session = await auth();
  let user = session?.user?.email;
  const t = await getTranslations("MainLangingPage"); // Await the getTranslations function call
  const tAuth = await getTranslations("auth");
  const navigationKeys = Object.keys(t.raw("navigation"));

  const LoginBtn = () => !user
    ? <OpenLoginDialog state='signIn' className="btn font-bold rounded-full shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        { tAuth("login" )}
      </OpenLoginDialog>
    : <Link href='/home' className="btn rounded-full shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        { t("loggedBtn") }
      </Link>

  return (
    <nav id="header" className="sticky w-full top-0 text-white backdrop-blur transition-colors duration-500 bg-gray-400/50 z-[1]">
      <div className="w-full container mx-auto flex flex-wrap gap-4 items-center justify-between mt-0 px-4 py-2">
        <div className="flex items-center">
          <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
            <LogoIcon className="w-auto h-12 fill-current inline" />
          </a>
        </div>
        <div className="flex flex-grow justify-end lg:hidden">
          <LoginBtn />
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
              { navigationKeys.map((key) => (
                <li className="mr-3" key={key}>
                  <a href={`#/${key}`} className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4">{ t(`navigation.${key}`) }</a>
                </li>
              ))}
              {!user && <li className="mr-3">
                <OpenLoginDialog
                  state='signUp'
                  className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                >
                  { tAuth("signUp" )}
                </OpenLoginDialog>
              </li>}
              <li className="max-lg:hidden">
                <LoginBtn />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  )
}