'use client'

import { useSearchParams } from "next/navigation";
import Input from "@/app/ui/Input";
import { usePathname, useRouter } from "@/navigation";

type SearchProps = {
  placeholder: string;
  selector: string;
}

export default function Search({ placeholder, selector }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(selector, term);
    } else {
      params.delete(selector);
    }

    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="grid w-full">
      <Input>
        <input
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          defaultValue={searchParams.get(selector) ?? ''}
          className="w-full" />
      </Input>
    </div>
  )
}