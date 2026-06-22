import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import EventCards from "@/components/EventCards";
import HowItWorks from "@/components/HowItWorks";
import Subscription from "@/components/Subscription";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <HeroSection />
        <SearchSection />
        <EventCards />
        <HowItWorks />
        <Subscription />
      </main>
      <Footer />
    </>
  );
}
