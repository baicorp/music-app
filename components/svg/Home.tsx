import React from "react";

export default function Home({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={`${active ? "#fff" : "#6e6e6e"}`}
    >
      <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
    </svg>
  );
}
