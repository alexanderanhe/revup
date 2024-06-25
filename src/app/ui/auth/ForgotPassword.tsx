'use client'

import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import SubmitButton from '../utils/SubmitButton';
import { MultipleLoginModal } from './AuthPanel';

type Form = {
  [key: string]: string | undefined;
};

type ForgotPasswordProps = {
  setModal: (modal: MultipleLoginModal) => void;
  email?: string;
}

function ForgotPassword({ setModal, email }: ForgotPasswordProps) {
  const [ form, setForm ] = useState<Form>({ email });

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
          <SubmitButton className="btn btn-neutral w-full">
            Send
            <PaperAirplaneIcon className="h-4 w-4 opacity-70" />
          </SubmitButton>
        </form>
      </div>
      <div className="flex gap-2 text-center text-sm justify-center">
        I have already an account
        <button type='button' onClick={() => setModal('signIn')} className="font-medium text-secondary">Sign in</button>
      </div>
    </div>
  )
}

export default ForgotPassword