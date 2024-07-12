interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div {...props} className={`grid grid-cols-1 gap-2 items-center justify-start border-[0.5px] border-base-300 bg-base-100 shadow-md shadow-base-300 rounded-2xl w-full p-5 ${className ?? ''}`}>
      { children }
    </div>
  )
}