import Link from "next/link";
import { Button } from "components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center bg-white">
      <h1 className="text-[100px] font-bold text-[#D99800] drop-shadow-md mb-2">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-[#D99800] mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or may have been moved. Let's
        get you back on track.
      </p>
      <Link href="/">
        <Button className="bg-[#D99800] text-white hover:bg-[#b67e00] transition-all">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
