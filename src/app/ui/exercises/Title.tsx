'use client'

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type TitleProps = {
  titles: Record<string, string>;
  defaultTitle?: string;
}

export default function Title({ titles, defaultTitle }: TitleProps) {
  const [ title, setTitle ] = useState<string>("")
  const [ countingTitle, setCountingTitle ] = useState<string>("")
  const pathname = usePathname();
  const ids = Object.keys(titles);
  const total = ids.length;
  const hash = typeof window !== "undefined" ? window?.location.hash : "";
  
  /*
  const handleUrlChange = useCallback(() => {
    const hash = window.location.hash.replace(/^#slide/i, "");
    const findIndex = ids.indexOf(hash) + 1;
    const nTitle = titles?.[hash] || defaultTitle || titles?.[ids[0]];
    document.title = nTitle;
    setCountingTitle(hash && titles?.[hash] ? `${findIndex || 1}/${total}` : '');
    setTitle(nTitle);
  }, [hash]);

  useEffect(() => {
    handleUrlChange();
    
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [ids, total, useCallback, pathname]);
*/
useEffect(() => {
  const carousel = document.getElementById('exercise-run') as HTMLElement;
  if (carousel) {
    let listenerFunc: (this: HTMLElement, ev: Event) => any;
    const onScrollStop = (callback: (scrollLeft: number) => void) => {
      let isScrolling: NodeJS.Timeout;
      if (listenerFunc) {
        carousel.removeEventListener('scroll', listenerFunc);
      }
      listenerFunc = (event) => {
        clearTimeout(isScrolling);
        const scrollLeft = (event.target as HTMLElement).scrollLeft;
        isScrolling = setTimeout(() => {
          callback(scrollLeft);
        }, 200);
      };
      
      carousel.addEventListener('scroll', listenerFunc);
    }
    const endPull = () => {
      onScrollStop((scrollLeft) => {
        const ref = document.querySelector('[data-active*="true"]');
        const hash = ref?.id.replace(/^slide/i, "");
        console.log("title", { hash });
        const findIndex = ids.indexOf(hash!) + 1;
        const nTitle = titles?.[hash!] || defaultTitle || titles?.[ids[0]];
        document.title = nTitle;
        setCountingTitle(hash && titles?.[hash] ? `${findIndex || 1}/${total}` : '');
        setTitle(nTitle);
      });
    }
    carousel.addEventListener("touchend", endPull);

    return () => {
      carousel.removeEventListener("touchend", endPull);
    }
  }
}, []);
  return (
    <>
    { countingTitle }
    { " " }
    <span className="[&::first-letter]:uppercase ml-1">{ title }</span>
    </>
  )
}