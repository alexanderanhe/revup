import { LogoIcon } from "@/components/utils/icons";
import { Link } from "@/navigation";

export default async function FooterSection() {
  return (
    <footer className="bg-base-100">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex flex-1 items-center justify-center mb-6 text-secondary">
            <a className="no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
              <LogoIcon className="w-auto h-40 fill-current inline" />
            </a>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Links</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link href="/faq" className="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link href="/help" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link href="/support" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Support</Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Legal</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link href="/terms-of-service" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Terms</Link>
              </li>
              {/* <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy</a>
              </li> */}
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Social</p>
            <ul className="list-reset mb-6">
              {/* <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Linkedin</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Twitter</a>
              </li> */}
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="https://instagram.com/bray.fit.app" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Company</p>
            <ul className="list-reset mb-6">
              {/* <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a>
              </li> */}
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link href="/about" className="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</Link>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <Link href="/contact" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <a href="https://www.freepik.com/free-photos-vectors/background" className="text-gray-500">Background vector created by freepik - www.freepik.com</a> */}
    </footer>
  )
}