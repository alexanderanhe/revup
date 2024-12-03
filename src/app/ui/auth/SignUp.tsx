'use client'

import { SocialButtons } from '@/app/ui/auth/SocialButtons';
import SubmitButton from '@/app/ui/utils/SubmitButton';
import { LoginModal } from '@/lib/features/app';
import { PAGES } from '@/lib/routes';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Input from '@/app/ui/Input';
import { useFormState } from 'react-dom';
// import { registerUser } from '@/lib/actions';
import { Form } from '@/app/ui/auth/AuthPanel';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const FORM_INIT = {
  name: "",
  email: "",
  password: "",
  confirm: ""
}

type SignUpProps = {
  setModal: (modal: LoginModal) => void;
  globalForm: Form;
  setGlobalForm: (form: Form) => void;
}

export default function SignUp({ setModal, globalForm, setGlobalForm }: SignUpProps) {
  const [ form, setForm ] = useState<Form>(globalForm);
  const [ showPassword, setShowPassword] = useState<boolean>(false);
  // const [ formState, formAction ] = useFormState(registerUser, undefined);
  const t = useTranslations("auth");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // useEffect(() => {
  //   if (formState === 'done') {
  //     toast.success('Check your email for further instructions');
  //     setGlobalForm(form);
  //     setModal('signIn');
  //     setForm(FORM_INIT);
  //   }
  // }, [formState]);

  return (
    <div className="grid grid-rows-[1fr_auto] form-control gap-3 w-full max-w-96 mx-auto h-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 text-center">
          <p>{ t("greeting") }</p>
          <h4 className="text-lg font-bold leading-5">
          { t("register") }
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <Input>
            <UserIcon className="h-4 w-4 opacity-70" />
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="grow"
              placeholder={ t("name") }
              autoComplete="off"
            />
          </Input>
          <Input>
            <EnvelopeIcon className="h-4 w-4 opacity-70" />
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="grow"
              placeholder={ t("email") }
              autoComplete="off"
            />
          </Input>
          <Input>
            <LockClosedIcon className="h-4 w-4 opacity-70" />
            <input
              type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className="grow"
                placeholder={ t("password") }
                autoComplete="off"
              />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-xs btn-ghost">
              { showPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" /> }
            </button>
          </Input>
          {/* { formState ?? ''} */}
          <label className="flex items-start text-xs gap-3">
            <input className="checkbox" type="checkbox" name="confirm" />
            <span className="grown text-sm text-gray-400">
              { t("acceptText") }
              <a href={PAGES.PRIVACY} className="underline">{ t("acceptPrivacyText") }</a>
              { t("acceptAndText") }
              <a href={PAGES.TERMS} className="underline">{ t("acceptTermsText") }</a>
            </span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <form>
          { Object.keys(form).map((key) => (
            <input key={key} type="hidden" name={key} value={form[key] ?? ''} />
          )) }
          <SubmitButton className="btn btn-primary w-full">
          { t("registerBtn") }
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
          { t("ihaveAlreadyAnAccount") }
          <button type='button' onClick={() => setModal('signIn')} className="font-medium text-secondary">{ t("signInLnk") }</button>
        </div>
      </div>
    </div>
  )
}