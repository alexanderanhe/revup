'use client'

import { signOut } from "next-auth/react"
import React from "react";

type LogOutButtonProps = {
  type?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function LogOutButton({ type, children, ...props}: LogOutButtonProps) {
  const handleLogOut = () => {
    signOut({ callbackUrl: '/' })
  }
  return React.createElement(
    type ?? 'button',
    {
      ...props,
      onClick: handleLogOut,
    },
    children
  );
}