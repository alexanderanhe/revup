'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Share2Icon } from 'lucide-react'
import { toast } from 'sonner';

type ShareButtonProps = {
  children?: React.ReactNode;
}

function ShareButton({ children }: ShareButtonProps) {

  const handleSharing = async () => {
    try {
      await navigator
        .share({
          title: "Hey check this app!",
          text: "Something coool",
          url: "https://bray.fit",
        })
        .then(() =>
          console.log("Hooray! Your content was shared to tha world")
        );
    } catch (error) {
      toast.error(`Oops! I couldn't share to the world because: ${error}`);
    }
  };

  if (!navigator.canShare) return null;
  return (
    <button
      type='button'
      onClick={handleSharing}
      className="btn btn-ghost w-full"
    >
      <Share2Icon className="size-5 text-primary" />
      <span className="grow flex justify-start">{ children }</span>
      <ArrowRightIcon className="size-5" />
    </button>
  )
}

export default ShareButton