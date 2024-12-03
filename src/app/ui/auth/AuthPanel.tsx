'use client'

import { useEffect, useState } from 'react';

// import { useSession } from 'next-auth/react';
import { LoginModal } from '@/lib/features/app';
// import SignIn from '@/app/ui/auth/SignIn';
// import SignUp from '@/app/ui/auth/SignUp';
// import ForgotPassword from '@/app/ui/auth/ForgotPassword';
// import WelcomeBack from '@/app/ui/auth/WelcomeBack';
import Loader from '@/app/ui/utils/Loader';
import { PAGES } from '@/lib/routes';

const FORM_INIT = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  stay_signed_in: "false",
  redirectTo: PAGES.HOME,
}

export type Form = {
  [key: string]: string | undefined;
};

export type MultipleLoginModal = LoginModal | 'Forgot';
type AuthPanelProps = {
  modal: LoginModal;
}

export default function AuthPanel({ modal: initModal }: AuthPanelProps) {
  const [ modal, setModal ] = useState<MultipleLoginModal>(initModal);
  const [ form, setForm ] = useState<Form>(FORM_INIT);
  // const { status } = useSession();
  const props = {
    setModal,
    globalForm: form,
    setGlobalForm: setForm,
  }

  if (!modal) return null;

  if (status === "loading") {
    return <Loader show />;
  }

  // if (status === "authenticated") {
  //   return <WelcomeBack {...props} />;
  // }

  switch(modal) {
    // case 'signIn':
    //   return <SignIn {...props} />;
    // case 'signUp':
    //   return <SignUp {...props} />;
    // case 'Forgot':
    //   return <ForgotPassword {...props} />;
    default:
      return null;
  }
}