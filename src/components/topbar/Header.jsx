import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-black/95 via-black/90 to-black/95 shadow-2xl shadow-blue-500/10 sticky top-0 z-50 backdrop-blur-sm border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
