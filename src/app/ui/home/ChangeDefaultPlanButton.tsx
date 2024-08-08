'use client'

import { SimplePlan } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { ReplaceIcon, SquareMousePointerIcon } from "lucide-react"
import { Drawer } from "vaul"
import Card from "@/app/ui/Card"

type ChangeDefaultPlanButtonProps = {
  plans: SimplePlan[] | null;
}
export default function ChangeDefaultPlanButton({ plans }: ChangeDefaultPlanButtonProps) {
  console.log(plans)
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger className="btn btn-square rounded-lg">
        <ReplaceIcon className="size-4" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 z-[50]" />
        <Drawer.Content className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px] z-[50]">
          <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" />
          <div className="flex flex-col max-w-md mx-auto w-full p-4 pt-5 space-y-2">
            <Drawer.Title className="font-medium mb-4">
              Plans
            </Drawer.Title>
            { plans?.map(({id, name, is_current, tags}) => (
              <Card key={id}>
                <button className={cn("btn btn-ghost w-full p-0", is_current && "no-animation")}>
                  <span className="grow flex justify-start">
                    { name }
                  </span>
                  { is_current
                    ? <div className="badge badge-primary">selected</div>
                    : <SquareMousePointerIcon className="size-5" />
                  }
                </button>
                <div className="flex flex-wrap gap-1 w-full">
                  { tags?.map(([name, type]) => (
                    <div className="badge badge-secondary">{`${ name }:${ type }`}</div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}