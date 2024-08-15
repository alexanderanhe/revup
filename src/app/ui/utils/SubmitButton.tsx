import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children:React.ReactNode;
  disabled?: boolean;
  className?: string;
  pendingAbsolute?: string | boolean;
}
export default function SubmitButton({ children, disabled, pendingAbsolute, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  pendingAbsolute && (props.className += " relative");
  return (
    <button type="submit" disabled={disabled ?? pending} {...props}>
      { pending ? (
        <>
          { pendingAbsolute && children }
          <span className={cn(
            "loading loading-spinner loading-xs",
            pendingAbsolute && "absolute inset-1/2"
          )}></span>
        </>
      ) : children }
    </button>
  )
}