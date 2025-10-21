import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import TestimonialsTeaser from "@/components/home/TestimonialsTeaser";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <FeaturedPackages />
      <TestimonialsTeaser />
      <CTASection />
    </div>
  );
};

export default Home;
