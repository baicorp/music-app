import Loading from "@/components/Loading";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center grow bg-secondary border border-secondary rounded-lg">
      <Loading />
    </div>
  );
}
