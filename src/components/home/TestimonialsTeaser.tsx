import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchTestimonials, type TestimonialItem } from "@/lib/hygraph";

function getYoutubeThumbnail(url?: string) {
  if (!url) return null;
  try {
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop();
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    }
    if (url.includes("youtube.com")) {
      const id = new URL(url).searchParams.get("v");
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    }
    return null;
  } catch {
    return null;
  }
}

const TestimonialsTeaser = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { testimonials } = await fetchTestimonials(2);
        if (mounted) setItems(testimonials || []);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load testimonials");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const teaserItems = useMemo(() => (loading ? Array.from({ length: 2 }) : items), [loading, items]);
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Journeys. Real Smiles.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from travelers who've experienced the magic of India with Scenic Stories.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teaserItems.map((testimonial: any, index) => (
            <Link
              key={loading ? index : testimonial.id}
              to="/testimonials"
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-smooth animate-fade-in block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                {!loading && (() => {
                  const videoUrl: string | undefined = testimonial.video?.[0]?.url;
                  const thumb = getYoutubeThumbnail(videoUrl);
                  if (thumb) {
                    return (
                      <img
                        src={thumb}
                        alt={testimonial.travelerName || "Customer story"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        loading="lazy"
                      />
                    );
                  }
                  if (videoUrl) {
                    return (
                      <video
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        aria-label={testimonial.travelerName || "Customer story"}
                      />
                    );
                  }
                  return null;
                })()}
                {!loading && testimonial.video?.length ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-smooth">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-smooth shadow-soft">
                      <Play className="h-7 w-7 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{loading ? "\u00A0" : testimonial.travelerName}</h3>
                    <p className="text-sm text-muted-foreground">{loading ? "\u00A0" : testimonial.travelerLocation}</p>
                  </div>
                </div>
                {!loading && (
                  <div
                    className="text-muted-foreground italic"
                    dangerouslySetInnerHTML={{ __html: testimonial.description?.html || "" }}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/testimonials">Read More Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsTeaser;

