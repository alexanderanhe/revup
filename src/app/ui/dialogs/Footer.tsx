import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <div className="p-4 bg-base-100 border-t border-base-100 mt-auto">
      <div className="flex gap-6 justify-end max-w-md mx-auto">
        <a
          className="text-xs flex items-center gap-0.25"
          href="https://github.com/alexanderanhe"
          target="_blank"
        >
          GitHub
          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
        </a>
        {/* <a
          className="text-xs flex items-center gap-0.25"
          href="https://twitter.com/alexander_anhe"
          target="_blank"
        >
          Twitter
          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
        </a> */}
      </div>
    </div>
  )
}