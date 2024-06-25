type CardProps = {
  className?: string;
  children: React.ReactNode;
}
export default function Card({ className, children }: CardProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 items-center justify-start bg-base-100 shadow-2xl rounded-2xl w-full p-5 ${className ?? ''}`}>
        { children }
      </div>
  )
}