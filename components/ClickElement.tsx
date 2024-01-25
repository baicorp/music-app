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
        console.log("fetch id: ", id);
        setId(ids);
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}
