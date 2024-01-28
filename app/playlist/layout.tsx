import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div>
      <div className="pl-4 py-5 bg-[#1c1c1c]">
        <Link href={"/"}>⬅️ Back</Link>
      </div>
      {children}
    </div>
  );
}
