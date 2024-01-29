"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("query"));
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("query", input!);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden flex gap-4 bg-white text-black rounded-md"
      >
        <input
          type="text"
          className="outline-none bg-transparent grow p-3"
          placeholder="Search music"
          value={input || ""}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit" className="bg-orange-500 p-3">
          🔍
        </button>
      </form>
    </div>
  );
}
