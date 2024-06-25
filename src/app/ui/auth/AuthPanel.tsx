'use client'

import { useState } from 'react';

import { useSession } from 'next-auth/react';
import { LoginModal } from '@/lib/features/app';
import SignIn from '@/app/ui/auth/SignIn';
import SignUp from '@/app/ui/auth/SignUp';
import ForgotPassword from '@/app/ui/auth/ForgotPassword';
import WelcomeBack from '@/app/ui/auth/WelcomeBack';

export type MultipleLoginModal = LoginModal | 'Forgot';
type AuthPanelProps = {
  modal: LoginModal;
}

export default function AuthPanel({ modal: initModal }: AuthPanelProps) {
  const [ modal, setModal ] = useState<MultipleLoginModal>(initModal);
  const { data: session, status } = useSession();
  const props = {
    setModal
  }

  if (!modal) return null;

  if (status === "authenticated") {
    return <WelcomeBack {...props} session={session} />;
  }

  switch(modal) {
    case 'signIn':
      return <SignIn {...props} />;
    case 'signUp':
      return <SignUp {...props} />;
    case 'Forgot':
      return <ForgotPassword {...props} />;
    default:
      return null;
  }
}