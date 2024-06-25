'use client'

import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { AuthFacebook, AuthGithub, AuthGoogle } from '@/app/ui/auth/SocialButtons';
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { MultipleLoginModal } from './AuthPanel';

const FORM_INIT = {
  email: "",
  password: ""
}

type Form = {
  [key: string]: string | undefined;
};

type SignInProps = {
  setModal: (modal: MultipleLoginModal) => void;
}

export default function SignIn({ setModal }: SignInProps) {
  const { data: session, status } = useSession();
  const [ form, setForm ] = useState<Form>(FORM_INIT);
  const [ showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <h4>Hey there,</h4>
          <p className="text-lg font-black leading-5">
            Welcome back
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <p className="text-sm text-center">
            <button type='button' onClick={() => setModal('Forgot')} className="underline text-gray-400">Reset your password?</button>
          </p>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form onSubmit={handleSubmit}>
          { Object.keys(form).map((key) => (
            <input key={key} type="hidden" name={key} value={form[key] ?? ''} />
          )) }
          <SubmitButton className="btn btn-primary w-full">
            <ArrowRightEndOnRectangleIcon className="h-4 w-4 opacity-70" />
            Log In
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
          Don&apos;t have an account?
          <button type='button' onClick={() => setModal('signUp')} className="font-medium text-secondary">Register</button>
        </div>
      </div>
    </div>
  )
}