export default function Navbar() {
  return (
    <nav className="flex items-center space-x-8 text-lg">
      <a href="/" className="hover:text-blue-600 transition">
        Home
      </a>
      <a href="/about" className="hover:text-blue-600 transition">
        About
      </a>
      <a href="/services" className="hover:text-blue-600 transition">
        Services
      </a>
      <a href="/products" className="hover:text-blue-600 transition">
        Products
      </a>
      <a href="/contact" className="hover:text-blue-600 transition">
        Contact
      </a>
    </nav>
  );
}
