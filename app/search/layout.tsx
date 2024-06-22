import BackButton from "@/components/BackButton";
import React, { ReactElement, ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div className="relative bg-secondary border border-secondary rounded-lg overflow-y-auto grow">
      {children}
    </div>
  );
}
