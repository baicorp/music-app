import React from "react";

export default function Next({
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
        width: width ? width : "24px",
        height: height ? height : "24px",
      }}
    >
      <path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z" />
    </svg>
  );
}
