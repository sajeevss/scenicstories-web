import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 gradient-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Plan Your Dream Trip?
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          Let our travel experts help you create unforgettable memories. Contact us today via WhatsApp or email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="accent" size="lg" asChild>
            <a
              href="https://wa.me/+918075456058?text=Hi%2C%20I%20want%20to%20plan%20a%20trip%20with%20Scenic%20Stories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
            asChild
          >
            <a href="mailto:scenicstory@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
