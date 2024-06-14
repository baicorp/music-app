"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Search } from "./svg";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("query"));
  const pathname = usePathname();
  const { push } = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("query", input!);
    push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    setInput(searchParams.get("query"));
  }, [searchParams]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden flex gap-2 md:gap-4 p-3 bg-transparent border-2 border-gray-400 rounded-md"
      >
        <input
          type="text"
          className="outline-none bg-transparent grow font-semibold"
          placeholder="Search music"
          value={input || ""}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onBlur={(e) => e.currentTarget.blur()}
        />
        <button type="submit">
          <Search active />
        </button>
      </form>
    </div>
  );
}
