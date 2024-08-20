import { Link } from "@/navigation";
import { auth } from "@/auth";
import OpenLoginDialog from "@/app/ui/dialogs/buttons/OpenLoginDialog";
import { getTranslations } from "next-intl/server";
import Nav from "@/app/ui/main-landing/Nav";
import NavLogo from "@/app/ui/main-landing/NavLogo";
import { LanguagesIcon } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";

export default async function NavHeader() {
  let session = await auth();
  let user = session?.user?.email;
  const t = await getTranslations("MainLangingPage"); // Await the getTranslations function call
  const tAuth = await getTranslations("auth");
  const navigationKeys = Object.keys(t.raw("navigation"));

  const LoginBtn = () => !user
    ? <OpenLoginDialog state='signIn' className="hover:underline bg-white text-gray-800 font-bold rounded-full text-sm py-2 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        { tAuth("login" )}
      </OpenLoginDialog>
    : <Link href='/home' className="hover:underline bg-white text-gray-800 font-bold rounded-full text-sm py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        { t("loggedBtn") }
      </Link>

  return (
    <nav id="header" className="sticky w-full top-0 text-white backdrop-blur transition-colors duration-500 bg-gray-400/50 z-[1]">
      <div className="w-full container mx-auto flex flex-wrap gap-4 items-center justify-between mt-0 px-4 py-2">
        <div className="flex items-center">
          <NavLogo />
        </div>
        <div className="flex justify-end grow md:grow-0 md:order-last">
          <LocaleSwitcher />
          <LoginBtn />
        </div>
        <div className="dropdown dropdown-bottom dropdown-end md:dropdown-open md:grow">
          <div tabIndex={0} role="button" className="flex md:hidden items-center p-1 text-white hover:text-[#7f2784] focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </div>
          <div tabIndex={0} className="w-full grow md:flex md:justify-end min-w-80 md:!static base-200 dropdown-content mt-2 md:mt-0 bg-white md:bg-transparent text-black md:text-white p-4 md:p-0" id="nav-content">
            <ul className="list-reset md:flex justify-end flex-1 items-center">
              { navigationKeys.map((key) => (
                <Nav key={key} hash={key}>{ t(`navigation.${key}`) }</Nav>
              ))}
              {!user && <li className="mr-3">
                <OpenLoginDialog
                  state='signUp'
                  className="inline-block font-semibold no-underline hover:text-primary hover:text-underline py-2 px-4"
                >
                  { tAuth("signUp" )}
                </OpenLoginDialog>
              </li>}
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  )
}