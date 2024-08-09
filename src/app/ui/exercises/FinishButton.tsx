'use client'

import { handleSetWorkoutCloseDay } from '@/lib/actions';
import { useFormState } from 'react-dom';
import SubmitButton from '@/app/ui/utils/SubmitButton';

export default function FinishButton({ text }: { text: string }) {
  const [ formStateWorkoutCloseDay, formActionWorkoutCloseDay ] = useFormState(handleSetWorkoutCloseDay, { status: 'idle' });
  return (
    <form action={formActionWorkoutCloseDay}>
      <SubmitButton className="btn btn-primary w-full">
        { text }
      </SubmitButton>
    </form>
  )
}