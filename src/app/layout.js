import Header from "@/components/topbar/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getBatchData } from "@/api/service";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "South Flower",
  description: "Website",
};

export default async function RootLayout({ children }) {

  const features = [
    { name: "about_content", amount: 4 },
    { name: "about_setup" },
  ];

  const data = await getBatchData(features);

  const aboutContent = data?.about_content?.data || [];
  const setup = data?.about_setup?.data || null;

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Header setup={setup} aboutContent={aboutContent} />
        {children}
        <Footer setup={setup} aboutContent={aboutContent} />
      </body>
    </html>
  );
}
