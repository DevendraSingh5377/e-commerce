import Hero from "../../components/home/Hero";
import BrandStrip from "../../components/home/BrandStrip";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import StatsSection from "../../components/home/StatsSection";
import CategoriesSection from "../../components/home/CategoriesSection";
import FadeInSection from "../../components/common/FadeInSection";


const Home = () => {
  return (
<>
  <Hero />

  <FadeInSection>
    <BrandStrip />
  </FadeInSection>

  <FadeInSection>
    <WhyChooseUs />
  </FadeInSection>

  <StatsSection />

  <FadeInSection>
    <CategoriesSection />
  </FadeInSection>


</>
  );
};

export default Home;