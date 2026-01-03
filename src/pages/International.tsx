import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Users, Star, Plane, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchInternationalPackages, type PackageItem } from "@/lib/hygraph";

const International = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { internationalPackages: fetchedPackages } = await fetchInternationalPackages();
        if (mounted) setPackages(fetchedPackages || []);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load packages");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium mb-6 shadow-sm">
              <Plane className="inline h-4 w-4 mr-2" />
              Explore The World
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              International Tour Packages
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Discover breathtaking destinations across the globe with our expertly crafted 
              international tour packages designed for unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {error && (
            <p className="text-center text-red-500 mb-8">{error}</p>
          )}
          
          {!loading && !error && packages.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  No International Packages Available
                </h3>
                <p className="text-muted-foreground mb-8">
                  We're currently working on adding exciting international destinations to our collection. 
                  Check back soon or contact us for custom international travel arrangements.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://wa.me/+918075456058?text=Hi%2C%20I'm%20interested%20in%20custom%20international%20travel%20packages"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us for Custom Packages
                  </a>
                </Button>
              </div>
            </div>
          )}

          {!loading && packages.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(loading ? Array.from({ length: 6 }) : packages).map((pkg: any, index) => (
              <Card key={loading ? index : pkg.id} className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden bg-muted">
                  {!loading && (
                    <img
                      src={pkg.image?.[0]?.url || ""}
                      alt={pkg.packageName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {!loading && pkg.bestTime && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                        {pkg.bestTime}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{loading ? "4.8" : "4.8"}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {loading ? "\u00A0" : pkg.packageName}
                  </h3>
                  {!loading && pkg.description?.html && (
                    <div 
                      className="text-muted-foreground text-sm mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: pkg.description.html }}
                    />
                  )}
                  
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {loading ? "\u00A0" : `${pkg.dayCount || 0} Days / ${pkg.nightCount || 0} Nights`}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {loading ? "\u00A0" : pkg.locations?.slice(0, 2).join(", ") || "Multiple destinations"}
                    </span>
                  </div>

                  {!loading && pkg.locations && pkg.locations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.locations.slice(0, 3).map((location, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground">Starting from</span>
                      <p className="text-xl font-bold text-primary">
                        {loading ? "\u00A0" : pkg.price ? `₹${pkg.price.toLocaleString()}` : "Contact for price"}
                      </p>
                    </div>
                    <Button variant="hero" size="sm" asChild>
                      <a
                        href={`https://wa.me/+918075456058?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(
                          loading ? "package" : pkg.packageName
                        )}%20package`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enquire Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Dream Destination Not Listed?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We create bespoke international travel experiences tailored to your wanderlust. 
              Let us craft your perfect global adventure.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://wa.me/+918075456058?text=Hi%2C%20I%20want%20to%20plan%20a%20custom%20international%20tour"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plan Custom Trip
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default International;
