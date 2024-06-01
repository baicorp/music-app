import React, { ReactElement, ReactNode } from "react";
import BackButton from "@/components/BackButton";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div className="relative h-svh overflow-y-auto flex-grow">
      <BackButton />
      {children}
    </div>
  );
}
