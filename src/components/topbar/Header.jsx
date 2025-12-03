import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import ClientOnly from "../clientOnly/ClientOnly";

export default function Header() {
  return (
    <>
      <ClientOnly>
        <TopHeader />
        <Navbar />
      </ClientOnly>
    </>
  );
}
