import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div>
      <BackButton />
      {children}
    </div>
  );
}
