'use client'

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { signIn, useSession } from 'next-auth/react';
import { LoginModal } from '@/lib/features/app';
import { useFormState } from 'react-dom';
import { authenticateFacebook, authenticateGithub, authenticateGoogle } from '@/lib/actions';
import SubmitButton from '../utils/SubmitButton';
import { redirect } from '@/navigation';

const FORM_INIT = {
  username: "",
  password: ""
}

type AuthPanelProps = {
  modal: LoginModal;
}

export default function AuthPanel({ modal: initModal }: AuthPanelProps) {
  const [ modal, setModal ] = useState<LoginModal>(initModal);
  const { data: session, status } = useSession();
  const [ form, setForm ] = useState(FORM_INIT);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { ...form });
  }
  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await signUp(form.username, form.password);
    // try {
    //   await getUserData();
    //   setModal(false);
    // } catch {
    //   toast.error("Failed to signUp");
    // }
  }

  if (!modal) return null;

  if (status === "authenticated") {
    return (
      <p>Te has autenticado con el usuario {session?.user?.email}</p>
    )
  }

  return modal === 'signIn' ? (
    <>
      <div className="flex flex-col gap-5 text-center">
        <p className="text-2xl font-semibold leading-5">
          SignIn to your account
        </p>
        <p className="text-sm leading-4">
          You must be logged in to perform this action.{ status }
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <AuthGoogle />
        <AuthFacebook />
        <AuthGithub />
      </div>

      <div className="flex w-full items-center gap-2 text-sm text-neutral">
        <div className="h-px w-full bg-neutral"></div>
        OR
        <div className="h-px w-full bg-neutral"></div>
      </div>


      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            name="email"
            type="email"
            onChange={handleChange}
            defaultValue={form.username}
            className="grow"
            placeholder="Email Adress"
          />
        </label>
        {/* <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            name="password"
            type="password"
            onChange={handleChange}
            defaultValue={form.username}
            className="grow"
            placeholder="Password"
          />
        </label> */}
        <p className="text-sm">
          <a href="/forgot-password" className="text-primary">Reset your password?</a>
        </p>
        <button type="submit"
          className="btn btn-neutral w-full">
          Continue
        </button>
      </form>
      <div className="flex gap-2 text-center text-sm justify-center">
        Don&apos;t have an account?
        <button type='button' onClick={() => setModal('signUp')} className="font-medium text-primary">Sign up</button>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col gap-5 text-center">
        <p className="text-2xl font-semibold leading-5">
          Register a new account
        </p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitSignUp}>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="grow"
            placeholder="Email Adress"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="grow"
            placeholder="Password"
          />
        </label>
        <button type="submit"
          className="btn btn-primary w-full">
          Continue
        </button>
      </form>
      <div className="flex gap-2 text-center text-sm justify-center">
        I have already an account
        <button type='button' onClick={() => setModal('signIn')} className="font-medium text-primary">Sign in</button>
      </div>
    </>
    
  )
}

function AuthGoogle() {
  const [ formState, formAction ] = useFormState(authenticateGoogle, null);
  useEffect(() => {
    formState === "done" && redirect("/home");
  }, [formState]);
  return (
    <form action={formAction} className="w-full">
      <SubmitButton className="btn btn-glass btn-active w-full max-w-96">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
          className="h-[18px] w-[18px]" />
          Continue with Google
      </SubmitButton>
    </form>
  )
}
function AuthFacebook() {
  const [ formState, formAction ] = useFormState(authenticateFacebook, null);
  useEffect(() => {
    formState === "done" && redirect("/home");
  }, [formState]);
  return (
    <form action={formAction} className="w-full">
      <SubmitButton className="btn btn-glass btn-active w-full max-w-96">
        <img
          src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook"
          className="h-[18px] w-[18px]" />
          Continue with Facebook
      </SubmitButton>
    </form>
  )
}
function AuthGithub() {
  const [ formState, formAction ] = useFormState(authenticateGithub, null);
  useEffect(() => {
    formState === "done" && redirect("/home");
  }, [formState]);
  return (
    <form action={formAction} className="w-full">
      <SubmitButton className="btn btn-glass btn-active w-full max-w-96">
      <img
          src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
          className="h-[18px] w-[18px]" />
        Continue with GitHub
      </SubmitButton>
    </form>
  )
}