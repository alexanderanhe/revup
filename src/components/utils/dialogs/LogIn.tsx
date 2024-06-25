'use client'

import { Drawer } from 'vaul';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { LoginModal, login_modal } from '@/lib/features/app';
import type { RootState } from '@/lib/store';
import FooterDialog from './Footer';
import AuthPanel from '@/app/ui/auth/AuthPanel';

const LogInDialog = () => {
  const modal = useAppSelector((state: RootState) => state.app.loginModal)
  const dispatch = useAppDispatch()

  const setModal = (state: LoginModal) => dispatch(login_modal(state));

  if (!modal) return null;

  return (
    <Drawer.Root
      open={!!modal}
      onOpenChange={(state) => setModal(state ? modal : false)}
      shouldScaleBackground
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[10]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[10px] h-[96%] backdrop-blur transition-colors duration-500 bg-base-200/90 z-[10] mt-24">
          <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-8 mt-4" />
          <div className="flex flex-col overflow-auto rounded-t-[10px] flex-1">
            <div className="flex flex-col gap-5 flex-1 max-w-md mx-auto w-full p-4">
              <AuthPanel modal={modal} />
            </div>
          </div>
          <FooterDialog />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default LogInDialog;