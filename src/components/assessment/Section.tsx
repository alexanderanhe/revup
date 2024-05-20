import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";

type SectionProps = {
  title: string,
  header?: React.ReactNode,
  buttons?: React.ReactNode[],
  children?: React.ReactNode
}

const Section = ({ title, header, buttons, children }: SectionProps) => {
  return (
    <div className="content-grid grid-rows-[auto_auto_1fr_auto] h-screen py-2">
      <div className="flex flex-col place-items-start">
        <Link
          href='/'
          className='btn btn-ghost btn-circle p-0'
        >
          <XMarkIcon className="size-8" />
        </Link>
      </div>
      <header className="flex flex-col">
        { header }
        <h2 className="text-2xl font-bold">{ title }</h2>
      </header>
      <section className="flex justify-start gap-4">
        { children }
      </section>
      <footer className="grid grid-cols-1 gap-2 pb-10">
        { buttons }
      </footer>
    </div>
  )
}

export default Section