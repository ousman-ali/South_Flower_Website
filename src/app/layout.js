import Header from "@/components/topbar/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "South Flower",
  description: "Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Header />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
