import { Loading } from "@/components/svg";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center grow bg-secondary">
      <Loading />
    </div>
  );
}
