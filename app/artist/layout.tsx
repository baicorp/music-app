import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div>
      {/* <div className="lg:px-6 xl:px-10 p-4 bg-[#1c1c1c] sticky top-0">
        <Link href={"/"}>⬅️ Back</Link>
      </div> */}
      {children}
    </div>
  );
}
