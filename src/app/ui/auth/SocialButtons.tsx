import { redirect } from "@/navigation";
import { useEffect } from "react";
import SubmitButton from "../utils/SubmitButton";
import Image from "next/image";
import { useFormState } from "react-dom";
// import { authenticateFacebook, authenticateGithub, authenticateGoogle } from "@/lib/actions";
import { DEFAULT_REDIRECT } from "@/lib/routes";

function AuthGoogle() {
  // const [ formState, formAction ] = useFormState(authenticateGoogle, null);
  // useEffect(() => {
  //   formState === "done" && redirect(DEFAULT_REDIRECT);
  // }, [formState]);
  return (
    <form>
      <SubmitButton className="btn btn-square btn-neutral">
        <Image width={18} height={18} src="/images/google.png" alt="Google" className="size-[18px]" />
      </SubmitButton>
    </form>
  )
}
function AuthFacebook() {
  // const [ formState, formAction ] = useFormState(authenticateFacebook, null);
  // useEffect(() => {
  //   formState === "done" && redirect(DEFAULT_REDIRECT);
  // }, [formState]);
  return (
    <form>
      <SubmitButton className="btn btn-square btn-neutral">
        <Image width={18} height={18} src="/images/facebook.png" alt="Facebook" className="size-[18px]" />
      </SubmitButton>
    </form>
  )
}
function AuthGithub() {
  // const [ formState, formAction ] = useFormState(authenticateGithub, null);
  // useEffect(() => {
  //   formState === "done" && redirect(DEFAULT_REDIRECT);
  // }, [formState]);
  return (
    <form>
      <SubmitButton className="btn btn-square btn-neutral">
        <Image width={18} height={18} src="/images/github.svg" alt="GitHub" className="size-[18px]" />
      </SubmitButton>
    </form>
  )
}

export function SocialButtons() {
  return (
    <>
      <AuthGoogle />
      {/* <AuthFacebook /> */}
      <AuthGithub />
    </>
  )
}