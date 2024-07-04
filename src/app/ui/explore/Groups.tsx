'use client'

import { useState } from "react"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"

import { usePathname, useRouter } from "@/navigation"
import Card from "@/app/ui/Card"
import { GroupsWorkout } from "@/lib/definitions"


type Image = {
  src: string;
  name: string;
}
const DEFAULT_FALLBACK_IMAGE: Image = {
  src: "/images/tags/default.svg",
  name: "Default fallback image"
}
// images: https://www.simplyfitness.com/es/pages/abdominals-exercise-guides

function GroupItem({ group }: {
  group: GroupsWorkout
}) {
  const [image, setImage] = useState<Image>({
    name: group.name,
    src: `/images/tags/${group.defaultname}.svg`
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  
  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.append("tags", group.id);
    push(`${pathname}?${params.toString()}`);
  }

  return (
    <Card className="btn btn-ghost relative h-28 w-full" onClick={handleClick}>
      <div className="grid grid-cols-[1fr_auto] w-full">
        <div className="grid items-end justify-start w-full h-full z-[1] font-semibold">
          <span className="[&::first-letter]:capitalize">{group.name}</span>
        </div>
        <ArrowRightIcon className="size-5" />
      </div>
      { image && (
        <Image
          src={image.src}
          alt={image.name}
          onError={() => setImage(DEFAULT_FALLBACK_IMAGE)}
          width={100}
          height={100}
          className="absolute inset-0 w-full h-full object-contain object-right rounded-lg text-primary fill-primary"
          style={{ maskImage: "linear-gradient(to left, black -10%, transparent)"}}
        />
      )}
    </Card>
  )
}

export default function Groups({ groups }: {
  groups: GroupsWorkout[] | null
}) {
  return (
    <section className="w-full p-0">
      {groups?.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </section>

  )
}