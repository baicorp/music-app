import React from "react";

export default function page({ params }: { params: { artistId: string } }) {
  return (
    <div className="text-2xl font-semibold py-4 lg:px-6 xl:px-10">
      {params.artistId}
    </div>
  );
}
