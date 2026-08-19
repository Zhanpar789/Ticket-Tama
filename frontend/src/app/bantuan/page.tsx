import Footer from "@/components/Footer";
import HelpCenter from "@/components/HelpCenter";
import Navbar from "@/components/Navbar";

export default function BantuanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <HelpCenter />
      </main>
      <Footer />
    </>
  );
}
