"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function Test() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("vId") as string) || "hello";

  const { data, isLoading } = useSWR(query, () =>
    fetch(`http://127.0.0.1:5000/search?query=${query}`).then((data) =>
      data.json()
    )
  );

  return (
    <div>
      <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
