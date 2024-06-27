'use client'

import { LoginModal, login_modal } from '@/lib/features/app';
import { useAppDispatch } from '@/lib/hooks';

type OpenLoginDialogProps = {
  state: LoginModal;
  children: React.ReactNode;
} & React.ComponentProps<'button'>

function OpenLoginDialog({ state, children, ...props}: OpenLoginDialogProps) {
  const dispatch = useAppDispatch()
  const loginModal = () => dispatch(login_modal(state));
  return (
    <button type='button' onClick={loginModal} {...props}>{ children }</button>
  )
}

export default OpenLoginDialog