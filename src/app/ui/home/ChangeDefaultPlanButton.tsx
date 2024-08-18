'use client'

import { PlusIcon, ReplaceIcon } from "lucide-react"
import { Drawer } from "vaul"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl";
import { handleSetCurrentPlan } from "@/lib/actions"

import PlanItem from "@/app/ui/home/PlanItem"
import SubmitButton from "@/app/ui/utils/SubmitButton"

import { Plan } from "@/lib/definitions"
import { useEffect, useState } from "react";
type ChangeDefaultPlanButtonProps = {
  plans: Plan[] | null;
}
export default function ChangeDefaultPlanButton({ plans }: ChangeDefaultPlanButtonProps) {
  const t = useTranslations('Home');
  const [open, setOpen] = useState<boolean>(false);
  const [ formState, formAction ] = useFormState(handleSetCurrentPlan, null);

  useEffect(() => {
    if (formState?.status === "success") {
      setOpen(false);
    }
  }, [formState])

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground>
      <Drawer.Trigger onClick={() => setOpen(true)} className="btn btn-square rounded-lg">
        <ReplaceIcon className="size-4" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 z-[50]" />
        <Drawer.Content className="fixed flex flex-col bg-base-100 border border-base-300 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-[50]">
          <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
          <div className="content-grid grid-rows-[auto_1fr_auto] h-full">
            <Drawer.Title className="font-medium mb-4">
              { t("changePlanTitle") }
            </Drawer.Title>
            <div className="grid auto-rows-min gap-2 overflow-y-auto max-h-full">
              { formState?.status === 'error' && (
                <div className="label">
                  <span className="label-text-alt text-error font-semibold">{ formState?.message }</span>
                  <span className="label-text-alt"></span>
                </div>
              )}
              { plans?.map((plan) => plan.is_current ? (
                <div key={plan.id} className="relative w-full">
                  <span className="absolute top-2 right-2 badge badge-primary z-[1]">selected</span>
                  <PlanItem plan={plan} />
                </div>
              ) : (
                <form action={formAction} key={plan.id}>
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <SubmitButton className="btn p-0 h-auto w-full" pendingAbsolute>
                    <PlanItem plan={plan} />
                  </SubmitButton>
                </form>
              ))}
            </div>
            <div className="grid grid-rows-auto gap-2 pb-10">
              <button type="button" disabled className="btn btn-neutral w-full">
                { t("changePlanNewBtn") }
                <PlusIcon className="size-4" />
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}