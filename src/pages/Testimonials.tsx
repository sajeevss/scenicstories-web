import { useState, useMemo, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoModal from "@/components/testimonials/VideoModal";
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

  const handleOpenModal = (testimonial: TestimonialItem) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedTestimonial) return;
    const currentIndex = items.findIndex((t) => t.id === selectedTestimonial.id);
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + items.length) % items.length
        : (currentIndex + 1) % items.length;
    setSelectedTestimonial(items[newIndex]);
  };

  const currentIndex = selectedTestimonial
    ? items.findIndex((t) => t.id === selectedTestimonial.id)
    : -1;

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
              <div
                key={loading ? index : testimonial.id}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-smooth cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => !loading && handleOpenModal(testimonial)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!loading) handleOpenModal(testimonial);
                  }
                }}
                aria-label={`View ${(testimonial?.travelerName || "customer")}'s story`}
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
      {selectedTestimonial && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          videoUrl={selectedTestimonial.video?.[0]?.url}
          posterImage={getYoutubeThumbnail(selectedTestimonial.video?.[0]?.url || undefined) || undefined}
          travelerName={selectedTestimonial.travelerName || undefined}
          travelerLocation={selectedTestimonial.travelerLocation || undefined}
          quote={undefined}
          onPrevious={() => handleNavigate("prev")}
          onNext={() => handleNavigate("next")}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < items.length - 1}
        />
      )}
    </div>
  );
};

export default Testimonials;
