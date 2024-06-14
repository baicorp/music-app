import { Lost } from "@/components/svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-secondary border border-secondary grow rounded-lg flex flex-col justify-center items-center gap-6 p-4">
      <h1 className="text-6xl md:text-8xl font-extrabold md:mb-3">404</h1>
      <h2 className="text-xl md:text-4xl mb-8 text-center">
        Whoops! Are you lost, curious soul ?
      </h2>
      <Lost />
      <div className="mt-4">
        <Link
          href="/"
          className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold md:text-xl transition duration-300 ease-in-out"
        >
          Guide Me Home
        </Link>
      </div>
    </div>
  );
}
