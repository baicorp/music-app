import BackButton from "@/components/BackButton";
import React, { ReactElement, ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  return (
    <div className="bg-secondary relative overflow-y-auto grow rounded-lg border border-secondary">
      <BackButton />
      {children}
    </div>
  );
}
