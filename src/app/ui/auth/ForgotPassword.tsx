'use client'

import { useEffect, useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import SubmitButton from '../utils/SubmitButton';
import { Form, MultipleLoginModal } from '@/app/ui/auth/AuthPanel';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
// import { forgetPassword } from '@/lib/actions';
import { useTranslations } from 'next-intl';

const FORM_INIT = {
  email: ""
}

type ForgotPasswordProps = {
  setModal: (modal: MultipleLoginModal) => void;
  globalForm: Form;
  setGlobalForm: (form: Form) => void;
}

export default function ForgotPassword({ setModal, globalForm, setGlobalForm}: ForgotPasswordProps) {
  const [ form, setForm ] = useState<Form>(globalForm);
  // const [ formState, formAction ] = useFormState(forgetPassword, undefined);
  const t = useTranslations("auth");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <p>{ t("greeting") }</p>
          <h4 className="text-lg font-bold leading-5">
            { t("greetingWelcomeBck") }
          </h4>
        </div>
        {/* <form className="flex flex-col gap-4" action={formAction}>
          <label className="input input-bordered flex items-center gap-2">
            <EnvelopeIcon className="h-4 w-4 opacity-70" />
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="grow"
              placeholder={ t("email") }
              defaultValue={form.email}
            />
          </label>
          {formState ?? ''}
          <SubmitButton className="btn btn-neutral w-full">
            { t("sendBtn") }
            <PaperAirplaneIcon className="h-4 w-4 opacity-70" />
          </SubmitButton>
        </form> */}
      </div>
      <div className="flex gap-2 text-center text-sm justify-center">
        { t("ihaveAlreadyAnAccount") }
        <button type='button' onClick={() => setModal('signIn')} className="font-medium text-secondary">{ t("signInLnk") }</button>
      </div>
    </div>
  )
}