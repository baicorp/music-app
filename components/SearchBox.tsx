"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("keywords") || "");
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("keywords", input);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 items-center p-4 rounded-lg bg-white text-black">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="outline-none bg-transparent"
          placeholder="search by title or artist"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit">🔍</button>
      </form>
    </div>
  );
}
