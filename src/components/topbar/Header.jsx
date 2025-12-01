import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
