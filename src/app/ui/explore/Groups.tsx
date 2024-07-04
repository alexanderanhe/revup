'use client'

import { GroupsWorkout } from "@/lib/definitions"
import Image from "next/image"
import { useEffect, useState } from "react"
import Card from "@/app/ui/Card"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/navigation"


type Image = {
  src: string;
  name: string;
}
const DEFAULT_FALLBACK_IMAGE: Image = {
  src: "/images/tags/abs.svg",
  name: "Default fallback image"
}
// images: https://www.simplyfitness.com/es/pages/abdominals-exercise-guides

function GroupItem({ group }: {
  group: GroupsWorkout
}) {
  const [image, setImage] = useState<Image>({
    name: group.name,
    src: `/images/tags/${group.defaultName}.svg`
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
    <button onClick={handleClick} className="w-full">
      <Card className="relative h-28">
        <div className="grid items-end justify-start w-full h-full z-[1] font-semibold">
          {group.name}
        </div>
        { image && (
          <Image
            src={image.src}
            alt={image.name}
            onError={() => setImage(DEFAULT_FALLBACK_IMAGE)}
            width={100}
            height={100}
            className="absolute inset-0 w-full h-full object-contain object-right rounded-lg"
            style={{ maskImage: "linear-gradient(to left, black -10%, transparent)"}}
          />
        )}
      </Card>
    </button>
  )
}

type GroupsProps = {
  groups: GroupsWorkout[] | null
}

export default function Groups({ groups }: GroupsProps) {
  return (
    groups?.map((group) => <GroupItem key={group.id} group={group} />)
  )
}