'use client'

import clsx from "clsx";
import { useEffect, useState } from "react"

type LoaderProps = {
  show?: boolean | string;
}
export default function Loader({ show }: LoaderProps) {
  const [ loading, setLoading ] = useState<boolean>(true);
  useEffect(() => {
    if (show) return;

    const handler = () => {
      setLoading(!loading);
    };

    if (document.readyState === "complete") {
      handler();
    } else {
      window.addEventListener('load', handler);
      return () => document.removeEventListener('load', handler);
    }
  }, []);

  return (
    <div className={clsx(
      "fixed inset-0 grid place-content-center bg-base-100 z-[100]",
      !(loading || show) && "opacity-0 pointer-events-none"
    )}>
      <svg className="animate-l11 w-3/4 text-primary mx-auto" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 204" width="420" height="204"><path fill="currentColor" d="m84.9 117.1l-20.8-14.3 20.8-14.4 20.8 14.3zm-20.8-14.3l-20.9-14.3 20.8-14.3 20.9 14.3zm20.8-14.4l-20.8-14.3 20.8-14.3 20.8 14.3zm20.9 14.3l-20.9-14.3 20.8-14.4 20.9 14.4zm20.8 14.3l-20.8-14.3 20.8-14.4 20.8 14.4zm20.9 14.3l-20.9-14.3 20.8-14.4 20.9 14.3zm20.8 14.4l-20.8-14.4 20.8-14.3 20.8 14.3zm-20.8 14.4l-20.8-14.4 20.8-14.3 20.8 14.3zm-20.8-14.3l-20.8-14.3 20.8-14.4 20.8 14.4zm-20.8-14.4l-20.9-14.3 20.8-14.3 20.9 14.3zm62.5 43l-20.8-14.4 20.8-14.3 20.8 14.3zm20.8-14.3l-20.8-14.3 20.8-14.4 20.8 14.3zm20.9 14.4l-20.9-14.4 20.9-14.3 20.8 14.3zm20.8 14.4l-20.8-14.4 20.8-14.3 20.9 14.3zm-20.9 14.4l-20.8-14.4 20.8-14.3 20.9 14.3zm-20.9-14.3l-20.8-14.3 20.8-14.4 20.8 14.3zm124.9-57.4l-20.8-14.3 20.8-14.3 20.9 14.3zm-0.1-28.7l-20.8-14.3 20.8-14.3 20.9 14.3zm-20.9-14.3l-20.8-14.4 20.8-14.3 20.8 14.3zm-20.8-14.3l-20.8-14.3 20.8-14.4 20.8 14.3zm-20.8-14.3l-20.9-14.3 20.8-14.4 20.9 14.4zm-20.9-14.4l-20.8-14.3 20.8-14.3 20.9 14.3zm-20.9-14.3l-20.8-14.4 20.8-14.3 20.8 14.3zm20.9 43l-20.8-14.3 20.8-14.3 20.8 14.3zm20.9 14.3l-20.9-14.3 20.8-14.4 20.9 14.4zm20.8 14.3l-20.8-14.3 20.8-14.4 20.8 14.4zm20.9 14.3l-20.9-14.3 20.8-14.4 20.9 14.3zm-83.4-57.3l-20.8-14.3 20.8-14.3 20.8 14.3zm-83.2 28.7l-20.9-14.3 20.8-14.4 20.9 14.3zm20.8-14.3l-20.9-14.3 20.9-14.4 20.8 14.4zm20.8-14.4l-20.8-14.3 20.8-14.4 20.8 14.4zm-20.8-14.4l-20.8-14.3 20.8-14.3 20.8 14.3zm20.8-14.3l-20.8-14.4 20.8-14.3 20.8 14.3zm20.9 14.3l-20.9-14.3 20.9-14.3 20.8 14.3zm-62.5 14.4l-20.8-14.4 20.8-14.3 20.8 14.3zm-104.1 14.4l-20.8-14.3 20.8-14.4 20.8 14.3zm20.8-14.3l-20.8-14.3 20.8-14.4 20.9 14.4zm20.8 14.3l-20.8-14.3 20.8-14.4 20.8 14.3zm-20.8 14.4l-20.8-14.3 20.8-14.4 20.8 14.3zm208.4 86l-20.9-14.4 20.8-14.3 20.9 14.3zm20.8-14.3l-20.9-14.3 20.9-14.4 20.8 14.3zm20.8-14.3l-20.8-14.3 20.8-14.4 20.8 14.4zm-20.8-14.4l-20.8-14.3 20.8-14.3 20.8 14.3zm-20.8 14.3l-20.8-14.3 20.8-14.3 20.8 14.3zm-20.8 14.3l-20.8-14.3 20.8-14.3 20.8 14.3z"/><path fill="#56198b" d="m355.6 74l-20.8-14.3 20.8-14.4 20.8 14.3zm20.8-14.3l-20.8-14.3 20.8-14.4 20.9 14.4zm20.8 14.3l-20.8-14.3 20.8-14.4 20.8 14.3zm-20.8 14.4l-20.8-14.3 20.8-14.4 20.8 14.3z"/></svg>
      <span className="loading loading-dots loading-lg text-secondary mx-auto"></span>
    </div>
  )
}