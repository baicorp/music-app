"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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
        className="overflow-hidden flex gap-4 bg-transparent border-2 border-gray-400 rounded-md"
      >
        <input
          type="text"
          className="outline-none bg-transparent grow p-3 font-semibold"
          placeholder="Search music"
          value={input || ""}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit" className="p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
