import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, disabled, ...props }: { children:React.ReactNode, disabled?: boolean, className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={disabled ?? pending} {...props}>
      { pending ? <span className="loading loading-spinner loading-xs"></span> : children }
    </button>
  )
}