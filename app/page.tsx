import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import Overview from "./components/Overview";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Amenities from "./components/Amenities";
import EOI from "./components/EOI";
import Configuration from "./components/Configuration";
import Connectivity from "./components/Connectivity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyBar from "./components/StickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <Overview />
        <About />
        <Highlights />
        <Amenities />
        <EOI />
        <Configuration />
        <Connectivity />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
