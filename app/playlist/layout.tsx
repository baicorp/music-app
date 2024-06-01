import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div>
      <div className="py-5 bg-[#1c1c1c] px-4 lg:px-6 xl:px-10">
        <Link href={"/"} className="flex gap-2 w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <p>Back</p>
        </Link>
      </div>
      {children}
    </div>
  );
}
