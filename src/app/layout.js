import Header from "@/components/topbar/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "South Flower",
  description: "Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
