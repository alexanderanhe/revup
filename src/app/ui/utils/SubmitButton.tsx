import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, ...props }: { children:React.ReactNode, className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} {...props}>
      { pending ? <span className="loading loading-spinner loading-xs"></span> : children }
    </button>
  )
}