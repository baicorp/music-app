// "use client";

// import React from "react";
// import { useGlobalVal, useMusic } from "@/hooks";
// import {
//   ArrowDown,
//   Lyrics,
//   Next,
//   Play,
//   Previous,
//   QueueListButton,
//   ThreeDot,
// } from "../svg";
// import Link from "next/link";

// export default function FullPlayer() {
//   const { trackData } = useMusic();
//   const { isFullPlayer, setFullPlayer } = useGlobalVal();

//   function handleClose() {
//     setFullPlayer((prev) => !prev);
//   }

//   console.log(trackData?.thumbnail);

//   return (
//     <div
//       className={`absolute ${
//         isFullPlayer ? "top-2" : "top-[1000px]"
//       } left-2 right-2 bottom-2 flex flex-col justify-between bg-gradient-to-br from-black to-slate-800 p-6 rounded-lg z-50 transition-all duration-200 md:hidden`}
//     >
//       <div className="flex justify-between mb-10">
//         <button onClick={handleClose} title="close">
//           <ArrowDown />
//         </button>
//         <button title="menu">
//           <ThreeDot />
//         </button>
//       </div>
//       <div>
//         {trackData?.thumbnail[1] ? (
//           <img
//             src={
//               trackData?.thumbnail[1] ||
//               "https://images.unsplash.com/photo-1500239038240-9b3b8bac73c3?q=80&w=300&h=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             }
//             alt="Song cover"
//             className="w-full aspect-square rounded-lg object-center object-contain"
//           />
//         ) : (
//           <div className="w-full aspect-square rounded-lg bg-gray-300 animate-pulse"></div>
//         )}
//       </div>
//       <div className="flex flex-col">
//         <div>
//           <p className="text-xl font-bold">{trackData?.title}</p>
//         </div>
//         <div>
//           {
//             <Link
//               href={`/artist/${trackData?.artists[0]?.browseId}`}
//               onClick={() => setFullPlayer((prev) => !prev)}
//             >
//               {trackData?.artists[0]?.name}
//             </Link>
//           }
//         </div>
//       </div>
//       <div className="flex flex-col gap-1">
//         <div className="bg-[#ffffff33] rounded-full overflow-hidden">
//           <div className="h-[3px] w-1/2 bg-white"></div>
//         </div>
//         <div className="flex justify-between text-gray-300">
//           <span className="text-xs">0:00</span>
//           <span className="text-xs">
//             {trackData?.duration || (
//               <div className="w-7 h-3 aspect-square rounded-md bg-gray-300 animate-pulse"></div>
//             )}
//           </span>
//         </div>
//       </div>
//       <div className="flex justify-center items-center gap-8">
//         <Previous width="40px" height="40px" />
//         <div className="p-2 bg-[#ffffff33] rounded-full">
//           <Play width="50px" height="50px" />
//         </div>
//         <Next width="40px" height="40px" />
//       </div>
//       <div className="flex justify-around items-center mt-5">
//         <Lyrics />
//         <QueueListButton />
//       </div>
//     </div>
//   );
// }
