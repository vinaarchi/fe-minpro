import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryEvent from "@/section/categoryEvent";
import Creator from "@/section/creator";

import EventList from "@/section/listEvent";
import TopEvents from "@/section/topEvents";

const Home = () => {
  return (
    <div>
      <Hero />
      <EventList />
      <TopEvents />
      <Creator />
      <CategoryEvent />
      <Footer />
    </div>
  );
};

export default Home;
