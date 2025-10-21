import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kerala.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          Discover India's Most<br />Scenic Stories
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90 animate-slide-up">
          Authentic travel experiences across Kerala, South India, and sacred destinations — curated by trusted local experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button variant="hero" size="lg" asChild>
            <Link to="/packages">
              View Packages <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 md:h-16 fill-background"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
