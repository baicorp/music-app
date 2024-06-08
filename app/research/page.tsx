import { BASE_URL } from "@/constant/constant";
import React from "react";

export default async function Page() {
  // const res = await fetch(`${BASE_URL}/api/yt`);
  // const data = await res.json();

  return (
    <>
      <pre>
        {/* <code>{JSON.stringify(data, null, 2)}</code> */}
        <code>hello world</code>
      </pre>
    </>
  );
}
