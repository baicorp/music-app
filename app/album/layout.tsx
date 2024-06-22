import React, { ReactElement, ReactNode } from "react";
import BackButton from "@/components/BackButton";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div className="relative bg-secondary border border-secondary rounded-lg overflow-y-auto grow">
      <BackButton />
      {children}
    </div>
  );
}
