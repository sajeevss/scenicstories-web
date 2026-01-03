import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/sceniclogo.webp";
import msmeLogo from "@/assets/msme-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src={logo} alt="Scenic Stories" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground">
              Authentic travel experiences across Kerala, South India, and sacred destinations.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/p/Scenic-Stories-61557832313060/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/scenicstoriestours?igsh=NDJwcmk4bmUwZXc="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/domestic" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Domestic Tours
                </Link>
              </li>
              <li>
                <Link to="/international" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  International Tours
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Kerala Backwaters</li>
              <li>South India Temples</li>
              <li>Himalayan Pilgrimages</li>
              <li>Varanasi & Ganga</li>
              <li>Golden Triangle</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Vadakke Vaimeethi Rd, Eroor North, Eroor, Kochi, Kerala 682306</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+918075456058" className="hover:text-primary transition-smooth">
                  +91 80754 56058
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:sajeev@scenicstories.com" className="hover:text-primary transition-smooth">
                  sajeev@scenicstories.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* UDYAM Registration */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <img 
                src={msmeLogo} 
                alt="Ministry of Micro, Small & Medium Enterprises" 
                className="h-12 w-auto opacity-80"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Recognised by Ministry of Micro, Small and Medium Enterprises
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              UDYAM REGISTRATION NUMBER: UDYAM-KL-02-0042175
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Scenic Stories Tours and Travels. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
