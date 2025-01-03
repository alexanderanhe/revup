'use client'

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import { SocialButtons } from '@/app/ui/auth/SocialButtons';
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { Form, MultipleLoginModal } from '@/app/ui/auth/AuthPanel';
import Input from '@/app/ui/Input';
import { useTranslations } from 'next-intl';

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
  const [ form, setForm ] = useState<Form>(globalForm);
  const [ error, setError ] = useState<string>('');
  const [ showPassword, setShowPassword] = useState<boolean>(false);
  // const [ formState, formAction ] = useFormState(authenticate, { status: 'idle' });
  const searchParams = useSearchParams();
  const t = useTranslations("auth");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyName = event.target.name;
    if (keyName === 'email') setGlobalForm({ ...globalForm, email: event.target.value })
    setForm({ ...form, [keyName]: event.target.value });
  };

  // useEffect(() => {
  //   if (formState.status === 'success') {
  //     setGlobalForm(form);
  //     setModal('signIn');
  //     setForm(FORM_INIT);
  //   }
  // }, [formState]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.has('error')) {
      const message = params.get('error');
      setError(message ?? 'An error occurred');
    }
  }, [searchParams]);

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 w-full max-w-96 h-full mx-auto">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-1 text-center">
          <p>{ t("greeting") }</p>
          <h4 className="text-lg font-bold leading-5">
            { t("greetingWelcomeBck") }
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <Input>
            <EnvelopeIcon className="h-4 w-4 opacity-70" />
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="grow"
              placeholder={ t("email") }
              defaultValue={form.email}
              autoComplete="off"
            />
          </Input>
          <Input>
            <LockClosedIcon className="h-4 w-4 opacity-70" />
            <input
              type={showPassword ? "text" : "password"}
              name="password" onChange={handleChange}
              className="grow"
              placeholder={ t("password") }
              autoComplete="off"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-xs btn-ghost">
              { showPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" /> }
            </button>
          </Input>
          <p className="text-sm text-center">
            <button type='button' onClick={() => setModal('Forgot')} className="underline text-gray-400">{ t("resetPwd") }</button>
          </p>
          {/* {error || formState?.status === "error" ? <div className="label">
            <span className="label-text-alt text-error font-semibold">Error: { error || formState?.message }</span>
            <span className="label-text-alt"></span>
          </div> : null} */}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form>
          { Object.keys(form).map((key) => (
            <input key={key} type="hidden" name={key} value={form[key] ?? ''} />
          )) }
          <SubmitButton className="btn btn-primary w-full">
            <ArrowRightEndOnRectangleIcon className="size-4 opacity-70" />
            { t("loginBtn") }
          </SubmitButton>
        </form>
        
        <div className="flex w-full items-center gap-2 text-sm text-neutral">
          <div className="h-px w-full bg-[#DDDADA]"></div>
          <small className="text-sm font-semibold">{ t("o") }</small>
          <div className="h-px w-full bg-[#DDDADA]"></div>
        </div>

        <div className="flex items-center justify-center gap-8 w-full">
          <SocialButtons />
        </div>

        <div className="flex gap-2 text-center text-sm justify-center">
          { t("haveAlreadyAnAccount") }
          <button type='button' onClick={() => setModal('signUp')} className="font-medium text-secondary">{ t("registerLnk") }</button>
        </div>
      </div>
    </div>
  )
}