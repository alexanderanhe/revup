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
  props.className = cn(
    props.className,
    pendingAbsolute && "overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:z-[2]",
    pendingAbsolute && pending && "before:bg-base-100/70",
    pending && "cursor-not-allowed"
  );
  return (
    <button type="submit" disabled={disabled ?? pending} {...props}>
      { pending ? (
        <>
          { pendingAbsolute && children }
          <span className={cn(
            "loading loading-spinner loading-xs",
            pendingAbsolute && "absolute inset-1/2 z-[3]"
          )}></span>
        </>
      ) : children }
    </button>
  )
}