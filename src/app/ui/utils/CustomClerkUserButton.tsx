'use client';

// import { PAGES } from "@/lib/routes";
import { SignedIn, UserButton } from "@clerk/nextjs";
// import { HelpCircleIcon, User2Icon, UserRoundCog } from 'lucide-react';

export default function CustomClerkUserButton() {
  return (
    <SignedIn>
      <UserButton />
    </SignedIn>
  )
}