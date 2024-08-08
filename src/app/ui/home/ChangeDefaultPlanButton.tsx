'use client'

import { ReplaceIcon, SquareMousePointerIcon } from "lucide-react"
import { Drawer } from "vaul"
import PlanItem from "@/app/ui/home/PlanItem"

import { Plan } from "@/lib/definitions"
import SubmitButton from "../utils/SubmitButton"

type ChangeDefaultPlanButtonProps = {
  plans: Plan[] | null;
}
export default function ChangeDefaultPlanButton({ plans }: ChangeDefaultPlanButtonProps) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger className="btn btn-square rounded-lg">
        <ReplaceIcon className="size-4" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 z-[50]" />
        <Drawer.Content className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-[50]">
          <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
          <div className="content-grid grid-rows-[auto_1fr_auto] h-full">
            <Drawer.Title className="font-medium mb-4">
              Plans
            </Drawer.Title>
            <div className="overflow-y-auto max-h-full">
              { plans?.map((plan) => plan.is_current ? (
                <div key={plan.id} className="relative w-full">
                  <span className="absolute top-2 right-2 badge badge-primary z-[1]">selected</span>
                  <PlanItem plan={plan} />
                </div>
              ) : (
                <form action={""} key={plan.id}>
                  <SubmitButton className="btn p-0">
                    <PlanItem plan={plan} />
                  </SubmitButton>
                </form>
              ))}
            </div>
            <div className="grid grid-rows-auto gap-2 pb-10">
              <button type="button" className="btn btn-neutral w-full">Create a new one</button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}