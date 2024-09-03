'use client'

import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';
import { ClipboardCheckIcon, ClipboardCopyIcon } from 'lucide-react';

interface CopyTextProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

function CopyText({ text, children, ...props }: CopyTextProps) {
  const [iconToShow, setIconToShow] = useState<'copy' | 'copied'>('copy');

  const handleShare = () => {
    copy(text);
    setIconToShow('copied');
    toast('Text copied to clipboard')
    setTimeout(() => setIconToShow('copy'), 5000);
  }
  return (
    <button
      type='button'
      onClick={handleShare}
      {...props}
    >
      {iconToShow === 'copy' ? (
        children ?? <ClipboardCopyIcon className='size-4' />
      ) : (
        <ClipboardCheckIcon className='size-4 text-success' />
      )}
    </button>
  )
}

export default CopyText