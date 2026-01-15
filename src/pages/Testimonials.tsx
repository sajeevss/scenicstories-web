import { useState, useMemo, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const Testimonials = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { testimonials } = await fetchTestimonials();
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

  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedTestimonials = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [currentPage, items]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Stories</h1>
          <p className="text-xl text-muted-foreground mb-2">Real journeys. Real smiles.</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our travelers share moments from their trips across India. Each journey tells its
            own scenic story.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}

        {/* Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {(loading ? Array.from({ length: 4 }) : paginatedTestimonials).map((testimonial: any, index) => (
              (() => {
                const testimonialHasMedia = !loading && hasAnyMedia(testimonial);
                return (
              <div
                key={loading ? index : testimonial.id}
                className={`group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-smooth animate-scale-in ${testimonialHasMedia ? "cursor-pointer" : "cursor-default opacity-90"}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => testimonialHasMedia && handleOpenModal(testimonial)}
                role="button"
                tabIndex={testimonialHasMedia ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (testimonialHasMedia) handleOpenModal(testimonial);
                  }
                }}
                aria-label={
                  testimonialHasMedia
                    ? `View ${(testimonial?.travelerName || "customer")}'s story`
                    : `${testimonial?.travelerName || "Customer"} story (no media)`
                }
              >
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {!loading && (() => {
                    const media = testimonial.media || [];
                    const cover = media.find((m: any) => isImageMedia(m?.mimeType, m?.url));
                    if (cover?.url) {
                      return (
                        <img
                          src={cover.url}
                          alt={testimonial.travelerName || "Customer story"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
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
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                          loading="lazy"
                        />
                      );
                    }

                    return null;
                  })()}
                  {!loading && (testimonial.media || []).some((m: any) => isVideoMedia(m?.mimeType, m?.url)) ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-smooth">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-smooth shadow-soft">
                        <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="p-5">
                  {!loading && (testimonial.travelerName || testimonial.travelerLocation) && (
                    <div className="mb-3">
                      {testimonial.travelerName && (
                        <h3 className="font-semibold text-lg">{testimonial.travelerName}</h3>
                      )}
                      {testimonial.travelerLocation && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.travelerLocation}
                        </p>
                      )}
                    </div>
                  )}
                  {!loading && testimonial.description?.html ? (
                    <div 
                      className="text-muted-foreground text-sm italic line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: testimonial.description.html }}
                    />
                  ) : loading ? (
                    <p className="text-muted-foreground text-sm italic line-clamp-3">
                      "\u00A0"
                    </p>
                  ) : null}
                </div>
              </div>
                );
              })()
            ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(page)}
                  className="w-10 h-10"
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="gradient-primary rounded-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Create Your Own Story?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied travelers who've explored India with Scenic Stories. Your
            adventure awaits!
          </p>
          <a
            href="https://wa.me/+918075456058?text=Hi%2C%20I'd%20like%20to%20plan%20a%20trip%20with%20Scenic%20Stories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary rounded-md font-medium hover:bg-white/90 transition-smooth shadow-soft"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {selectedTestimonial && isModalOpen && hasAnyMedia(selectedTestimonial) && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          media={selectedTestimonial.media || []}
          travelerName={selectedTestimonial.travelerName || undefined}
          travelerLocation={selectedTestimonial.travelerLocation || undefined}
          descriptionHtml={selectedTestimonial.description?.html || undefined}
          quote={undefined}
        />
      )}
    </div>
  );
};

export default Testimonials;
