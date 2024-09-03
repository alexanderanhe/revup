'use client';

import { handleDeleteImage } from "@/lib/actions";
import { useFormState } from "react-dom";
import SubmitButton from "../utils/SubmitButton";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

type DeleteImageProps = {
  imageId: string;
  className?: string;
}
export default function DeleteImage({imageId, ...props}: DeleteImageProps) {
  const [ formState, formAction ] = useFormState(handleDeleteImage, {status: 'idle'});
  const formRef = useRef<HTMLFormElement>(null);
  const handleClick = () => {
    toast('Do you really want to do this?', {
      action: {
        label: 'Delete',
        onClick: () => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }));
        },
      },
    });
  };

  useEffect(() => {
    if (formState.status === 'success') {
      toast.success('Image deleted');
    } else if (formState.status === 'error') {
      toast.error('Error deleting image');
    }
  }, [formState.status]);
  return (
    <form action={formAction} ref={formRef}>
      <input type='hidden' name='imageId' placeholder='Image ID' value={imageId} />
      <button onClick={handleClick} {...props}>
        <Trash2Icon className='size-4' />
      </button>
      <SubmitButton className="hidden">Delete</SubmitButton>
    </form>
  )
}