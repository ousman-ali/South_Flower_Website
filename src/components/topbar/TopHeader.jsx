export default function TopHeader() {
  return (
    <div className="hidden md:flex w-full bg-gray-100 py-2 px-4 justify-between text-sm">
      <div className="flex space-x-4">
        <span>📞 +251 900 000 000</span>
        <span>📧 info@example.com</span>
      </div>

      <div className="flex space-x-3">
        <span>🌐 FB</span>
        <span>🌐 IG</span>
        <span>🌐 X</span>
      </div>
    </div>
  );
}
