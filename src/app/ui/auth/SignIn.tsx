'use client'

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';

import { AuthFacebook, AuthGithub, AuthGoogle } from '@/app/ui/auth/SocialButtons';
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Form, MultipleLoginModal } from '@/app/ui/auth/AuthPanel';
import Input from '@/app/ui/Input';
import { authenticate } from '@/lib/actions';

const FORM_INIT = {
  email: "",
  password: ""
}

type SignInProps = {
  setModal: (modal: MultipleLoginModal) => void;
  globalForm: Form;
  setGlobalForm: (form: Form) => void;
}

export default function SignIn({ setModal, globalForm, setGlobalForm }: SignInProps) {
  const { data: session, status } = useSession();
  const [ form, setForm ] = useState<Form>(globalForm);
  const [ showPassword, setShowPassword] = useState<boolean>(false);
  const [ formState, formAction ] = useFormState(authenticate, undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyName = event.target.name;
    if (keyName === 'email') setGlobalForm({ ...globalForm, email: event.target.value })
    setForm({ ...form, [keyName]: event.target.value });
  };

  useEffect(() => {
    if (formState === 'done') {
      setGlobalForm(form);
      setModal('signIn');
      setForm(FORM_INIT);
    }
  }, [formState]);

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 w-full max-w-96 h-full">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-1 text-center">
          <p>Hey there,</p>
          <h4 className="text-lg font-bold leading-5">
            Welcome back
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <Input>
            <EnvelopeIcon className="h-4 w-4 opacity-70" />
            <input type="text" name="email" onChange={handleChange} className="grow" placeholder="Email" defaultValue={form.email} autoComplete="off" />
          </Input>
          <Input>
            <LockClosedIcon className="h-4 w-4 opacity-70" />
            <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} className="grow" placeholder="Password" autoComplete="off" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-xs btn-ghost">
              { showPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" /> }
            </button>
          </Input>
          <p className="text-sm text-center">
            <button type='button' onClick={() => setModal('Forgot')} className="underline text-gray-400">Reset your password?</button>
          </p>
          { formState ?? ''}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form action={formAction}>
          { Object.keys(form).map((key) => (
            <input key={key} type="hidden" name={key} value={form[key] ?? ''} />
          )) }
          <SubmitButton className="btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full">
            <ArrowRightEndOnRectangleIcon className="size-4 opacity-70" />
            Log In
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
          Don&apos;t have an account?
          <button type='button' onClick={() => setModal('signUp')} className="font-medium text-secondary">Register</button>
        </div>
      </div>
    </div>
  )
}