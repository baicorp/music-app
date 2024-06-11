import React from "react";

const tagNameList = [
  { id: 1, name: "FULL TIME" },
  { id: 2, name: "REMOTE" },
  { id: 3, name: "PART TIME" },
];
export default async function Page() {
  return (
    <div className="bg-[#232323] border border-[#343434] flex flex-col gap-4 justify-center items-center grow rounded-lg">
      <div className="bg-[#cfcae0] p-1 rounded-3xl h-fit">
        <div className="w-[350px] bg-white rounded-[20px] shadow-xl shadow-[#8a7ab890] p-9">
          <div className="flex gap-2 items-center font-semibold text-[#1c1c1c]">
            <Arc />
            <p className="text-lg">Arc</p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="text-[#1c1c1c] text-xl font-semibold">
              Product Designer
            </p>
            <p className="text-gray-400 font-semibold">$3,000-3,500 net</p>
          </div>
          <div className="flex gap-1 mt-3">
            {tagNameList.map((data) => (
              <Tag key={data.id} tagName={data.name} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-center text-[#8a7ab8] pt-3 pb-2 font-semibold text-sm">
            POSTED 3 DAY AGO
          </p>
        </div>
      </div>
    </div>
  );
}

function Arc() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.9234 66.4665L38.4647 50.6062C32.7048 49.3834 26.9092 45.822 23.6314 41.4889L15.7457 58.0615C20.128 61.7772 25.3891 64.6976 30.9234 66.4665Z"
        fill="#1A007F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.3955 41.0137C58.607 45.6555 53.3458 49.0982 47.7165 50.4397L55.2341 66.2525C60.7209 64.4006 65.8514 61.409 70.2812 57.5745L62.3955 41.0137Z"
        fill="#4E000A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7457 58.0615L11.8034 66.3478C9.79635 70.5622 11.3046 75.75 15.4375 77.9462C19.8198 80.2731 25.2116 78.4567 27.3256 74.0286L30.9234 66.4665C25.3665 64.6763 20.2111 61.8212 15.7457 58.0615Z"
        fill="#1A007F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.0487 22.9216C77.4894 22.81 76.9193 22.753 76.3492 22.753C72.2365 22.753 68.6642 25.6817 67.859 29.7121C67.0276 33.8671 65.08 37.7372 62.3959 41.0256L70.2698 57.5982C77.538 51.2944 82.9061 42.7113 84.83 33.1073C85.7682 28.4062 82.7279 23.8475 78.0487 22.9216Z"
        fill="#FF9396"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.7165 50.4397C46.0301 50.8433 44.3085 51.0573 42.5865 51.0573C41.2445 51.0573 39.8543 50.903 38.4647 50.6062C32.7048 49.3834 26.9092 45.822 23.6314 41.4889C22.812 40.4086 22.1476 39.2808 21.6845 38.1292C19.8912 33.7012 14.8438 31.5643 10.414 33.345C5.98418 35.1376 3.84648 40.183 5.6279 44.6111C7.65872 49.6446 11.2446 54.2626 15.7457 58.0615C20.2075 61.8212 25.3589 64.6751 30.9122 66.4665C34.7245 67.6892 38.6792 68.3659 42.5746 68.3659C46.8975 68.3659 51.1611 67.618 55.2227 66.2528L47.7165 50.4397Z"
        fill="#002DC8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.4275 66.312L62.397 41.0139L62.3851 41.0258C62.3851 41.0258 62.3851 41.0139 62.397 41.0139L50.9484 16.9385C49.5161 13.9291 46.4675 12.0024 43.1339 12C39.7967 12 36.7564 13.9232 35.3194 16.9385L23.6451 41.4888C26.9229 45.8219 32.7185 49.3833 38.4784 50.6061L42.255 42.6759C42.6113 41.928 43.6802 41.928 44.0364 42.6759L47.7299 50.4399L58.941 74.0166C60.3721 77.032 63.4278 78.9611 66.7674 78.9552C67.5394 78.9552 68.3113 78.8483 69.0714 78.6347C74.285 77.1982 76.7553 71.2031 74.4275 66.312Z"
        fill="#FF536A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.9234 66.4665L38.4647 50.6062C32.7048 49.3834 26.9092 45.822 23.6314 41.4889L15.7457 58.0615C20.128 61.7772 25.3891 64.6976 30.9234 66.4665Z"
        fill="#1A007F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.3955 41.0137C58.607 45.6555 53.3458 49.0982 47.7165 50.4397L55.2341 66.2525C60.7209 64.4006 65.8514 61.409 70.2812 57.5745L62.3955 41.0137Z"
        fill="#4E000A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7457 58.0615L11.8034 66.3478C9.79635 70.5622 11.3046 75.75 15.4375 77.9462C19.8198 80.2731 25.2116 78.4567 27.3256 74.0286L30.9234 66.4665C25.3665 64.6763 20.2111 61.8212 15.7457 58.0615Z"
        fill="#1A007F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.0487 22.9216C77.4894 22.81 76.9193 22.753 76.3492 22.753C72.2365 22.753 68.6642 25.6817 67.859 29.7121C67.0276 33.8671 65.08 37.7372 62.3959 41.0256L70.2698 57.5982C77.538 51.2944 82.9061 42.7113 84.83 33.1073C85.7682 28.4062 82.7279 23.8475 78.0487 22.9216Z"
        fill="#FF9396"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.7165 50.4397C46.0301 50.8433 44.3085 51.0573 42.5865 51.0573C41.2445 51.0573 39.8543 50.903 38.4647 50.6062C32.7048 49.3834 26.9092 45.822 23.6314 41.4889C22.812 40.4086 22.1476 39.2808 21.6845 38.1292C19.8912 33.7012 14.8438 31.5643 10.414 33.345C5.98418 35.1376 3.84648 40.183 5.6279 44.6111C7.65872 49.6446 11.2446 54.2626 15.7457 58.0615C20.2075 61.8212 25.3589 64.6751 30.9122 66.4665C34.7245 67.6892 38.6792 68.3659 42.5746 68.3659C46.8975 68.3659 51.1611 67.618 55.2227 66.2528L47.7165 50.4397Z"
        fill="#002DC8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.4275 66.312L62.397 41.0139L62.3851 41.0258C62.3851 41.0258 62.3851 41.0139 62.397 41.0139L50.9484 16.9385C49.5161 13.9291 46.4675 12.0024 43.1339 12C39.7967 12 36.7564 13.9232 35.3194 16.9385L23.6451 41.4888C26.9229 45.8219 32.7185 49.3833 38.4784 50.6061L42.255 42.6759C42.6113 41.928 43.6802 41.928 44.0364 42.6759L47.7299 50.4399L58.941 74.0166C60.3721 77.032 63.4278 78.9611 66.7674 78.9552C67.5394 78.9552 68.3113 78.8483 69.0714 78.6347C74.285 77.1982 76.7553 71.2031 74.4275 66.312Z"
        fill="#FF536A"
      />
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
