import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 bg-orange-600/10 rounded-full blur-3xl top-0 -right-48 animate-pulse-slow"></div>
      <div className="absolute w-80 h-80 bg-orange-500/5 rounded-full blur-3xl -bottom-20 -left-20"></div>

      <div className="relative z-10 backdrop-blur-sm bg-black/20 p-10 rounded-2xl border border-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.1)] max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
          404
        </h1>
        <div className="w-16 h-1 bg-orange-500/20 mx-auto my-4"></div>
        <p className="text-gray-400 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          asChild
          variant="outline"
          className="border-orange-500/20 text-orange-400 hover:text-orange-300 hover:bg-orange-950/30 hover:border-orange-500/30"
        >
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
