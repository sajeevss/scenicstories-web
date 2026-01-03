import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchTestimonials, type TestimonialItem } from "@/lib/hygraph";

// Helper function to extract YouTube video ID and create thumbnail URL
const getYoutubeThumbnail = (url?: string): string | null => {
  if (!url) return null;
  
  let videoId = null;
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }
  
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

const TestimonialsTeaser = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { testimonials } = await fetchTestimonials(3);
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

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Customer Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            Real journeys. Real smiles.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-2">
            Watch our travelers share moments from their trips across India. Each journey tells its own scenic story.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {(loading ? Array.from({ length: 3 }) : items).map((testimonial: any, index) => (
            <Link
              key={loading ? index : testimonial.id}
              to="/testimonials"
              className="block animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="overflow-hidden group hover:shadow-elevated transition-smooth h-full">
                <div className="relative h-72 overflow-hidden bg-muted">
                  {!loading && (() => {
                    const videoUrl: string | undefined = testimonial.video?.[0]?.url;
                    const thumb = getYoutubeThumbnail(videoUrl);
                    if (thumb) {
                      return (
                        <img
                          src={thumb}
                          alt={testimonial.travelerName || "Customer story"}
                          className="w-full h-full object-cover transition-smooth transform group-hover:scale-105"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {!loading && testimonial.video?.length && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-elevated group-hover:scale-110 transition-smooth">
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Name and City Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{loading ? "\u00A0" : testimonial.travelerName}</h3>
                    <p className="text-base text-white/90 mb-3">{loading ? "\u00A0" : testimonial.travelerLocation}</p>
                    
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="relative">
                    <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                    {!loading && testimonial.description?.html ? (
                      <div 
                        className="text-lg leading-relaxed text-foreground/90 pl-6"
                        dangerouslySetInnerHTML={{ __html: testimonial.description.html }}
                      />
                    ) : (
                      <p className="text-lg leading-relaxed text-foreground/90 pl-6">
                        {loading ? "\u00A0" : "Amazing experience with Scenic Stories!"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/testimonials">
              Watch More Stories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsTeaser;
