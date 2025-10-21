import { Award, Heart, Users, Globe } from "lucide-react";
import backwatersTour from "@/assets/backwaters-tour.jpg";

const values = [
  {
    icon: Heart,
    title: "Authentic Experiences",
    description: "We believe in showing you the real India, not just tourist spots.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description: "Every traveler gets personalized attention and customized planning.",
  },
  {
    icon: Award,
    title: "Trusted Expertise",
    description: "Years of experience helping travelers explore India safely.",
  },
  {
    icon: Globe,
    title: "Pan-India Network",
    description: "Reliable partnerships across all major destinations in India.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Scenic Stories</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Your trusted companion for discovering India's most beautiful destinations.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in Kerala, the heart of India's natural beauty, Scenic Stories Tours and Travels began with a simple mission: to help travelers experience the authentic essence of India.
              </p>
              <p>
                Over the years, we've grown from a small Kerala-based operator to a trusted name for tours across South India and beyond. Our deep connections with local communities, hotels, and transportation providers ensure that every journey is smooth, safe, and memorable.
              </p>
              <p>
                What sets us apart is our genuine care for travelers. We don't just sell packages — we craft experiences. Whether you're seeking spiritual enlightenment at ancient temples, peaceful moments on Kerala's backwaters, or adventurous treks in the Himalayas, we're here to make it happen.
              </p>
            </div>
          </div>
          <div className="animate-scale-in">
            <img
              src={backwatersTour}
              alt="Kerala backwaters"
              className="rounded-2xl shadow-soft w-full h-auto"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Kerala Base */}
        <div className="bg-secondary/30 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Why Kerala-Based?</h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-6">
            Being based in Kerala gives us unique advantages. We know every backwater, every hill station, every temple, and every authentic restaurant. But our expertise doesn't stop there — our network spans all of India, from the temples of Tamil Nadu to the peaks of Uttarakhand.
          </p>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            This combination of local expertise and pan-India reach means you get the best of both worlds: the insider knowledge of a local guide and the comprehensive coverage of a national operator.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's plan your next adventure together. Contact us today and discover why thousands of travelers trust Scenic Stories.
          </p>
          <a
            href="https://wa.me/+918075456058?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Scenic%20Stories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary-dark transition-smooth shadow-soft hover:shadow-lg transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
