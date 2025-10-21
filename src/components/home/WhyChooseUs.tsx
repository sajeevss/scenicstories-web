import { Shield, DollarSign, Users, Map } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Network",
    description: "Years of experience with verified partners across India, ensuring your safety and comfort.",
  },
  {
    icon: DollarSign,
    title: "Affordable Packages",
    description: "Budget-friendly options without compromising on quality or experience.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Local experts who know the best routes, hidden gems, and authentic experiences.",
  },
  {
    icon: Map,
    title: "All-India Access",
    description: "From Kerala backwaters to Himalayan peaks — we cover all of India's scenic destinations.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Scenic Stories?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're more than just a travel company — we're your trusted companion for creating unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-soft transition-smooth transform hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
