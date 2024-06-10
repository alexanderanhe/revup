import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import BackButton from "../utils/BackButton";

type SectionProps = {
  title: string,
  horizonalHeader?: boolean,
  header?: React.ReactNode,
  headerButton?: React.ReactNode,
  CloseIcon?: React.ReactNode,
  buttons?: React.ReactNode[],
  children?: React.ReactNode
}

const Section = ({ title, horizonalHeader, header, headerButton, CloseIcon, buttons, children }: SectionProps) => {
  return (
    <div className="content-grid grid-rows-[auto_1fr_auto] w-full h-svh py-2">
      <header
        className={clsx(
          'flex gap-2 place-items-start',
          !horizonalHeader && "flex-col items-start justify center",
          horizonalHeader && "flex-row items-center gap-2",
          !!headerButton && "justify-between",
          !headerButton && "justify-start"
          )}
      >
        <BackButton className='btn btn-ghost btn-circle p-0'>
          { CloseIcon ? CloseIcon : <XMarkIcon className="size-8" />}
        </BackButton>
        { header }
        <h2 className="text-2xl font-bold">{ title }</h2>
        { headerButton }
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