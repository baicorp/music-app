"use client";

import { GlobalContext } from "@/context/GlobalProvider";
import { useContext } from "react";

export default function useGlobalVal() {
  const globalVal = useContext(GlobalContext);
  if (!globalVal) {
    throw new Error("useGlobalVal must be inside a GlobalProvider");
  }
  return globalVal;
}
