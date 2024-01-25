"use client";
import useMusic from "@/hooks/useMusic";
import React, { ReactElement } from "react";

export default function ClickElement({
  children,
  ids,
}: {
  children: ReactElement | ReactElement[];
  ids: string;
}) {
  const { id, setId } = useMusic();

  return (
    <div
      onClick={() => {
        setId((prev) => (prev = ids));
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}
