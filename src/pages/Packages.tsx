import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, IndianRupee, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPackages, type PackageItem } from "@/lib/hygraph";

const Packages = () => {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { packages } = await fetchPackages();
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
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tour Packages</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore our curated collection of tours across India. Each package is designed to give you authentic experiences with comfortable accommodations and expert guidance.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(loading ? Array.from({ length: 6 }) : items).map((pkg: any, index) => (
            <Card
              key={loading ? index : pkg.id}
              className="overflow-hidden group hover:shadow-soft transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                {!loading && (
                  <img
                    src={pkg.image?.[0]?.url || ""}
                    alt={pkg.packageName}
                    className="w-full h-full object-cover transition-smooth transform group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{loading ? "\u00A0" : pkg.packageName}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1 text-primary flex-shrink-0" />
                  {loading ? "\u00A0" : (pkg.locations || []).join(" • ")}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {!loading && (
                  <div
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: pkg.description?.html || "" }}
                  />
                )}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    {loading ? "\u00A0" : `${pkg.dayCount ?? 0} Days / ${pkg.nightCount ?? 0} Nights`}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    {loading ? "\u00A0" : (pkg.bestTime ? `Best: ${pkg.bestTime}` : "")}
                  </div>
                  <div className="flex items-center text-lg font-semibold text-primary pt-2">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    <span className="text-base">
                      {loading
                        ? "\u00A0"
                        : new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(pkg.price || 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full" asChild>
                  <a
                    href={`https://wa.me/+918075456058?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(
                      loading ? "package" : pkg.packageName
                    )}%20package.%20Can%20you%20share%20more%20details%3F`}
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-secondary/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Can't Find Your Perfect Trip?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We specialize in creating custom itineraries tailored to your interests, budget, and schedule. Contact us for a personalized travel plan.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a
              href="https://wa.me/+918075456058?text=Hi%2C%20I'd%20like%20to%20create%20a%20custom%20tour%20package"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Custom Package
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;

