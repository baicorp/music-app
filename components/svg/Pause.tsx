import React from "react";

export default function Pause({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#e8eaed"
      style={{
        width: width ? width : "32px",
        height: height ? height : "32px",
      }}
      className="md:w-10 md:h-10"
    >
      <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
    </svg>
  );
}
