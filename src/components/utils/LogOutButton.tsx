'use client'

import { signOut } from "next-auth/react"

type LogOutButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<'button'>

export default function LogOutButton({ children, ...props}: LogOutButtonProps) {
  const handleLogOut = () => {
    signOut({ callbackUrl: '/' })
  }
  return (
    <button type="button" onClick={handleLogOut} {...props}>{ children }</button>
  )
}