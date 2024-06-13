'use client'

import { useState } from 'react';
import { toast } from 'sonner';
import { Drawer } from 'vaul';

import { signIn, useSession } from 'next-auth/react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { LoginModal, login_modal } from '@/lib/features/app';
import type { RootState } from '@/lib/store';
import FooterDialog from './Footer';

const FORM_INIT = {
  username: "",
  password: ""
}

const LogInDialog = () => {
  const { data: session, status } = useSession();
  const [ form, setForm ] = useState(FORM_INIT);
  const modal = useAppSelector((state: RootState) => state.app.loginModal)
  const dispatch = useAppDispatch()

  const setModal = (state: LoginModal) => dispatch(login_modal(state));

  const handleSignIn = (provider: string) => () => {
    toast.promise(signIn(provider), {
      loading: `Autenticando con ${provider}...`,
      success: () => {
        return 'Inicio de sesi&oacute;n exitoso!';
      },
      error: 'Error',
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', { ...form });
  }
  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await signUp(form.username, form.password);
    // try {
    //   await getUserData();
    //   setModal(false);
    // } catch {
    //   toast.error("Failed to signUp");
    // }
  }
  if (!modal) return null;

  return (
    <Drawer.Root
      open={!!modal}
      onOpenChange={(state) => setModal(state ? modal : false)}
      shouldScaleBackground
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[10]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-base-200 flex flex-col rounded-t-[10px] h-[96%] z-[10] mt-24">
          <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-8 mt-4" />
          <div className="flex flex-col overflow-auto rounded-t-[10px] flex-1">
            <div className="flex flex-col gap-5 flex-1 max-w-md mx-auto w-full p-4">
              { modal === 'signIn' ? (
                <>
                  <div className="flex flex-col gap-5 text-center">
                    <p className="text-2xl font-semibold leading-5">
                      SignIn to your account
                    </p>
                    <p className="text-sm leading-4">
                      You must be logged in to perform this action.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleSignIn('github')}
                      className="btn btn-glass btn-active"
                      disabled={status === 'loading'}
                    >
                      <img
                        src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                        className="h-[18px] w-[18px]" />
                      Continue with GitHub
                    </button>

                    <button
                      type="button"
                      onClick={handleSignIn('google')}
                      className="btn btn-glass btn-active"
                      disabled={status === 'loading'}
                    >
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                        className="h-[18px] w-[18px]" />
                        Continue with Google
                    </button>
                  </div>

                  <div className="flex w-full items-center gap-2 text-sm text-neutral">
                    <div className="h-px w-full bg-neutral"></div>
                    OR
                    <div className="h-px w-full bg-neutral"></div>
                  </div>


                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2">
                      Email
                      <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        defaultValue={form.username}
                        className="grow"
                        placeholder="Email Adress"
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      Password
                      <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        defaultValue={form.username}
                        className="grow"
                        placeholder="Password"
                      />
                    </label>
                    <p className="text-sm">
                      <a href="/forgot-password" className="text-primary">Reset your password?</a>
                    </p>
                    <button type="submit"
                      className="btn btn-neutral w-full">
                      Continue
                    </button>
                  </form>
                  <div className="flex gap-2 text-center text-sm justify-center">
                    Don't have an account?
                    <button type='button' onClick={() => setModal('signUp')} className="font-medium text-primary">Sign up</button>
                  </div>
                </>
              ) : (
                <>
                <div className="flex flex-col gap-5 text-center">
                    <p className="text-2xl font-semibold leading-5">
                      Register a new account
                    </p>
                  </div>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmitSignUp}>
                    <label className="input input-bordered flex items-center gap-2">
                      Email
                      <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        className="grow"
                        placeholder="Email Adress"
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      Password
                      <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        className="grow"
                        placeholder="Password"
                      />
                    </label>
                    <button type="submit"
                      className="btn btn-primary w-full">
                      Continue
                    </button>
                  </form>
                  <div className="flex gap-2 text-center text-sm justify-center">
                    I have already an account
                    <button type='button' onClick={() => setModal('signIn')} className="font-medium text-primary">Sign in</button>
                  </div>
                </>
                
              )}
            </div>
          </div>
          <FooterDialog />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default LogInDialog;