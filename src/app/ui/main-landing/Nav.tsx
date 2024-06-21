'use client'

export default function Nav({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    const elem: HTMLElement | null = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  return (
    <li className="mr-3" onClick={handleClick}>
      { children }
    </li>
  )
}