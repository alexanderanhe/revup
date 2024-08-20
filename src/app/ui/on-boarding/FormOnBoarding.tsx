import { handleOnboarding } from "@/lib/actions";
import { use, useEffect } from "react";
import { useFormState } from "react-dom";

type FormOnBoardingProps = {
  onDone: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function FormOnBoarding({ children, onDone, ...props }: FormOnBoardingProps) {
  const [ formState, formAction ] = useFormState(handleOnboarding, null);

  useEffect(() => {
    if (formState === 'done') {
      onDone();
    }
  }, [formState]);

  return (
    <form {...props} action={formAction}>
      { children }
    </form>
  )
}