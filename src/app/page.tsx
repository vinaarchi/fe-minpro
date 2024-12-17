import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";
import Navbar from "@/components/Navbar";
import Hero from "@/section/heroSlider";
import EventList from "@/section/listEvent";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <EventList />
      <Footer />
      <Footer2 />
    </div>
  );
};

export default Home;
