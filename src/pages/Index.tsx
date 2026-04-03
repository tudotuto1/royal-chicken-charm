import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuHighlights from "@/components/MenuHighlights";
import FullMenu from "@/components/FullMenu";
import OrderBanner from "@/components/OrderBanner";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <MenuHighlights />
      <FullMenu />
      <OrderBanner />
      <Gallery />
      <Hours />
      <Reviews />
      <Footer />
    </main>
  );
};

export default Index;
