"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBox() {
  const [input, setInput] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`?keywords=${input.trim()}`);
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
