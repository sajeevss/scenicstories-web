import { MapPinned, Hotel, Ticket, Calendar } from "lucide-react";

const services = [
  {
    icon: MapPinned,
    title: "Tour Planning Assistance",
    description: "Our experienced team helps you plan every detail of your journey, from route selection to timing, ensuring you make the most of your trip.",
    features: [
      "Personalized itinerary creation",
      "Route optimization for best experiences",
      "Timing advice for festivals and seasons",
      "Local insights and recommendations",
    ],
  },
  {
    icon: Hotel,
    title: "Hotel & Cab Booking",
    description: "We coordinate comfortable accommodations and reliable transportation throughout your journey, working with our trusted network of partners.",
    features: [
      "Budget to luxury hotel options",
      "Clean, well-maintained vehicles",
      "Experienced local drivers",
      "24/7 support during travel",
    ],
  },
  {
    icon: Ticket,
    title: "Attraction Tickets & Passes",
    description: "Skip the queues with pre-arranged tickets and entry passes for monuments, temples, parks, and other attractions.",
    features: [
      "Monument entry tickets",
      "Temple darshan arrangements",
      "National park permits",
      "Special event access",
    ],
  },
  {
    icon: Calendar,
    title: "Custom Itinerary Design",
    description: "Every traveler is unique. We create bespoke itineraries that match your interests, pace, and budget perfectly.",
    features: [
      "Flexible scheduling",
      "Interest-based customization",
      "Budget-conscious planning",
      "Group and solo travel options",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From planning to execution, we handle every aspect of your journey so you can focus on creating memories.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                  <service.icon className="h-12 w-12 md:h-16 md:w-16 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center md:justify-start text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 gradient-primary rounded-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our team is ready to answer any questions you have about our services. Reach out via WhatsApp or email and we'll get back to you promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+918075456058?text=Hi%2C%20I%20have%20questions%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-md font-medium hover:bg-white/90 transition-smooth"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:sajeev@scenicstories.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-primary transition-smooth backdrop-blur-sm"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
