import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import VideoModal from "@/components/testimonials/VideoModal";
import { fetchTestimonials, type TestimonialItem } from "@/lib/hygraph";

const isVideoMedia = (mimeType?: string | null, url?: string | null) => {
  if (mimeType) return mimeType.startsWith("video/");
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url);
};

const isImageMedia = (mimeType?: string | null, url?: string | null) => {
  if (mimeType) return mimeType.startsWith("image/");
  if (!url) return false;
  return /\.(png|jpe?g|webp|gif|avif|svg)(\?|#|$)/i.test(url);
};

const TestimonialsTeaser = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const hasAnyMedia = (testimonial?: TestimonialItem | null) =>
    Boolean((testimonial?.media || []).some((m) => Boolean(m?.url)));

  const handleOpenModal = (testimonial: TestimonialItem) => {
    if (!hasAnyMedia(testimonial)) return;
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            (() => {
              const testimonialHasMedia =
                !loading && Boolean((testimonial?.media || []).some((m: any) => Boolean(m?.url)));
              return (
            <Link
              key={loading ? index : testimonial.id}
              to="/testimonials"
              className="block animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className={`overflow-hidden group transition-smooth h-full ${testimonialHasMedia ? "hover:shadow-elevated" : "opacity-90"}`}>
                <div className="relative h-72 overflow-hidden bg-muted">
                  {!loading && (() => {
                    const media = testimonial.media || [];
                    const cover = media.find((m: any) => isImageMedia(m?.mimeType, m?.url));
                    if (cover?.url) {
                      return (
                        <img
                          src={cover.url}
                          alt={testimonial.travelerName || "Customer story"}
                          className="w-full h-full object-cover transition-smooth transform group-hover:scale-105"
                          loading="lazy"
                        />
                      );
                    }

                    const first = media[0];
                    if (first?.url && isVideoMedia(first?.mimeType, first?.url)) {
                      return (
                        <video
                          src={first.url}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          aria-label={testimonial.travelerName || "Customer story"}
                          muted
                        />
                      );
                    }

                    if (first?.url && isImageMedia(first?.mimeType, first?.url)) {
                      return (
                        <img
                          src={first.url}
                          alt={testimonial.travelerName || "Customer story"}
                          className="w-full h-full object-cover transition-smooth transform group-hover:scale-105"
                          loading="lazy"
                        />
                      );
                    }
                    return null;
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {testimonialHasMedia && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenModal(testimonial);
                        }}
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-elevated group-hover:scale-110 transition-smooth"
                        aria-label={`Play ${(testimonial?.travelerName || "customer")}'s story`}
                      >
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                      </button>
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
                        className="text-lg leading-relaxed text-foreground/90 pl-6 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: testimonial.description.html }}
                      />
                    ) : (
                      <p className="text-lg leading-relaxed text-foreground/90 pl-6 line-clamp-3">
                        {loading ? "\u00A0" : "Amazing experience with Scenic Stories!"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
              );
            })()
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

      {selectedTestimonial && isModalOpen && hasAnyMedia(selectedTestimonial) && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          media={selectedTestimonial.media || []}
          travelerName={selectedTestimonial.travelerName || undefined}
          travelerLocation={selectedTestimonial.travelerLocation || undefined}
          descriptionHtml={selectedTestimonial.description?.html || undefined}
        />
      )}
    </section>
  );
};

export default TestimonialsTeaser;
