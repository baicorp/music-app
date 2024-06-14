import React from "react";

const tagNameList = [
  { id: 1, name: "NextJs" },
  { id: 2, name: "TailwindCSS" },
];
export default async function Page() {
  return (
    <div className="bg-secondary border border-secondary flex flex-col gap-4 justify-center items-center grow rounded-lg">
      <div className="bg-[#cfcae0] p-1 rounded-3xl h-fit">
        <div className="w-[350px] bg-white rounded-[20px] shadow-xl shadow-[#8a7ab890] p-9">
          <div className="flex gap-2 items-center font-semibold text-[#1c1c1c]">
            <Branding />
            <p className="text-lg">Music App Project</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-[#1c1c1c] text-xl font-semibold">
              Bagus Atok Illah
            </p>
            <p className="text-gray-400 font-semibold">Personal project</p>
          </div>
          <div className="flex gap-1 mt-3">
            {tagNameList.map((data) => (
              <Tag key={data.id} tagName={data.name} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-center text-[#8a7ab8] pt-3 pb-2 font-semibold text-sm">
            January 22, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Branding() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#c084fc"
      className="w-10"
    >
      <path d="M480-300q75 0 127.5-52.5T660-480q0-75-52.5-127.5T480-660q-75 0-127.5 52.5T300-480q0 75 52.5 127.5T480-300Zm0-140q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </svg>
  );
}

function Tag({ tagName }: { tagName: string }) {
  return (
    <div className="bg-white shadow-sm shadow-gray-400 text-purple-500 px-[7px] py-[3px] rounded-lg text-[11px] font-semibold">
      {tagName}
    </div>
  );
}
