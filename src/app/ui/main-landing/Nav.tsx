'use client'

export default function Nav({ hash, children }: { hash: string, children: React.ReactNode }) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const activeElement: HTMLElement | null = document.activeElement as HTMLElement;
    activeElement && activeElement.blur();
    
    const hash = event.currentTarget.hash;
    const goToElement = document.querySelector(hash);
    goToElement && goToElement.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <li className="mr-3">
      <a href={`#${hash}`} onClick={handleClick} className="inline-block font-semibold no-underline hover:text-primary hover:text-underline py-2 px-4">{ children }</a>
    </li>
  )
}