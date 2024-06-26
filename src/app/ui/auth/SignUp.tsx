'use client'

import { AuthFacebook, AuthGithub, AuthGoogle } from '@/app/ui/auth/SocialButtons';
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { LoginModal } from '@/lib/features/app';
import { PAGES } from '@/lib/routes';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Input from '@/app/ui/Input';
import { useFormState } from 'react-dom';
import { registerUser } from '@/lib/actions';

const FORM_INIT = {
  name: "",
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
  const [ form, setForm ] = useState<Form>(FORM_INIT);
  const [ showPassword, setShowPassword] = useState<boolean>(false);
  const [ formState, formAction ] = useFormState(registerUser, undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 h-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 text-center">
          <p>Hey there,</p>
          <h4 className="text-lg font-bold leading-5">
            Create an Account
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <Input>
            <UserIcon className="h-4 w-4 opacity-70" />
            <input type="text" name="name" onChange={handleChange} className="grow" placeholder="Name" />
          </Input>
          <Input>
            <EnvelopeIcon className="h-4 w-4 opacity-70" />
            <input type="text" name="email" onChange={handleChange} className="grow" placeholder="Email" />
          </Input>
          <Input>
            <LockClosedIcon className="h-4 w-4 opacity-70" />
            <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} className="grow" placeholder="Password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-xs btn-ghost">
              { showPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" /> }
            </button>
          </Input>
          { formState ?? ''}
          <label className="flex items-start text-xs gap-3">
            <input className="checkbox" type="checkbox" name="confirm" />
            <span className="grown text-sm text-gray-400">
              { 'By continuing you accept our ' }
              <a href={PAGES.PRIVACY} className="underline">Privacy Policy</a>
              { ' and ' }
              <a href={PAGES.TERMS} className="underline">Terms of Use</a>
            </span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form action={formAction}>
          { Object.keys(form).map((key) => (
            <input key={key} type="hidden" name={key} value={form[key] ?? ''} />
          )) }
          <SubmitButton className="btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full">
            Register
          </SubmitButton>
        </form>
        
        <div className="flex w-full items-center gap-2 text-sm text-neutral">
          <div className="h-px w-full bg-[#DDDADA]"></div>
          <small className="text-sm">Or</small>
          <div className="h-px w-full bg-[#DDDADA]"></div>
        </div>

        <div className="flex items-center justify-center gap-8 w-full">
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