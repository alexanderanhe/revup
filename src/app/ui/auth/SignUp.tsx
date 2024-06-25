'use client'

import { AuthFacebook, AuthGithub, AuthGoogle } from '@/app/ui/auth/SocialButtons';
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { LoginModal } from '@/lib/features/app';
import { PAGES } from '@/lib/routes';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const FORM_INIT = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  confirm: ""
}

type Form = {
  [key: string]: string | undefined;
};

type SignUpProps = {
  setModal: (modal: LoginModal) => void;
}

export default function SignUp({ setModal }: SignUpProps) {
  const { data: session, status } = useSession();
  const [ form, setForm ] = useState<Form>(FORM_INIT);
  const [ showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <h4>Hey there,</h4>
          <p className="text-lg font-black leading-5">
            Create an Account
          </p>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <UserIcon className="h-4 w-4 opacity-70" />
          <input type="text" name="name" onChange={handleChange} className="grow" placeholder="First Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <UserIcon className="h-4 w-4 opacity-70" />
          <input type="text" name="lastname" onChange={handleChange} className="grow" placeholder="Last Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <EnvelopeIcon className="h-4 w-4 opacity-70" />
          <input type="text" name="email" onChange={handleChange} className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <LockClosedIcon className="h-4 w-4 opacity-70" />
          <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} className="grow" value="password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-xs btn-ghost">
            { showPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" /> }
          </button>
        </label>
        <label className="flex items-start gap-3">
          <input className="checkbox" type="checkbox" name="confirm" />
          <span className="grown text-sm text-gray-400">
            { 'By continuing you accept our ' }
            <a href={PAGES.PRIVACY} className="underline">Privacy Policy</a>
            { ' and ' }
            <a href={PAGES.TERMS} className="underline">Terms of Use</a>
          </span>
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form onSubmit={handleSubmitSignUp}>
          { Object.keys(form).map((key) => (
            <input key={key} type="hidden" name={key} value={form[key] ?? ''} />
          )) }
          <SubmitButton className="btn btn-primary w-full">
            Register
          </SubmitButton>
        </form>
        <div className="flex w-full items-center gap-2 text-sm text-neutral">
          <div className="h-px w-full bg-neutral"></div>
          OR
          <div className="h-px w-full bg-neutral"></div>
        </div>
        <div className="flex items-center justify-center gap-3 w-full">
          <AuthGoogle />
          <AuthFacebook />
          <AuthGithub />
        </div>
        <div className="flex gap-2 text-center text-sm justify-center">
          I have already an account
          <button type='button' onClick={() => setModal('signIn')} className="font-medium text-secondary">Sign in</button>
        </div>
      </div>
    </div>
  )
}