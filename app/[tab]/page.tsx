import React from "react";

export default function page({ params }: { params: { tab: string } }) {
  return <div>{params.tab}</div>;
}
