import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPackages, type PackageItem } from "@/lib/hygraph";

const FeaturedPackages = () => {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { packages } = await fetchPackages(3);
        if (mounted) setItems(packages || []);
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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tour Packages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked journeys designed to showcase India's most beautiful and spiritual destinations.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(loading ? Array.from({ length: 3 }) : items).map((pkg: any, index) => (
            <Card
              key={loading ? index : pkg.id}
              className="overflow-hidden group hover:shadow-soft transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden bg-muted">
                {!loading && (
                  <img
                    src={pkg.image?.[0]?.url || ""}
                    alt={pkg.packageName}
                    className="w-full h-full object-cover transition-smooth transform group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                {!loading && pkg.bestTime && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.bestTime}
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{loading ? "\u00A0" : pkg.packageName}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1 text-primary flex-shrink-0" />
                  <span className="truncate">
                    {loading ? "\u00A0" : pkg.locations?.join(" • ") || "Multiple destinations"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  {loading ? "\u00A0" : `${pkg.dayCount || 0} Days / ${pkg.nightCount || 0} Nights`}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full" asChild>
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
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/domestic">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
