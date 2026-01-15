import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: { url: string; mimeType?: string | null }[];
  travelerName?: string;
  travelerLocation?: string;
  descriptionHtml?: string;
  quote?: string;
}

const VideoModal = ({
  isOpen,
  onClose,
  media,
  travelerName,
  travelerLocation,
  descriptionHtml,
  quote,
}: VideoModalProps) => {
  const normalizedMedia = useMemo(() => (media || []).filter((m) => Boolean(m?.url)), [media]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen]);

  const totalSlides = 1 + normalizedMedia.length;
  const activeMediaIndex = activeIndex - 1;
  const activeItem = activeMediaIndex >= 0 ? normalizedMedia[activeMediaIndex] : undefined;

  const isVideo = (item?: { url: string; mimeType?: string | null } | null) => {
    if (!item?.url) return false;
    if (item.mimeType) return item.mimeType.startsWith("video/");
    if (item.url.includes("youtube.com") || item.url.includes("youtu.be") || item.url.includes("vimeo.com")) {
      return true;
    }
    return /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(item.url);
  };

  const showPrevious = totalSlides > 1;
  const showNext = totalSlides > 1;

  const onPrevious = () => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const onNext = () => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, normalizedMedia.length]);

  if (!isOpen) return null;
  if (totalSlides <= 0) return null;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()
        : new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
    }
    return url;
  };

  const renderActiveSlide = () => {
    if (activeIndex === 0) {
      return (
        <div className="w-full h-full bg-card">
          <div className="h-full overflow-y-auto overscroll-contain p-6">
            {(travelerName || travelerLocation) && (
              <div className="mb-4">
                {travelerName && <h3 className="font-semibold text-2xl">{travelerName}</h3>}
                {travelerLocation && (
                  <p className="text-sm text-muted-foreground mt-1">{travelerLocation}</p>
                )}
              </div>
            )}

            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>

            {descriptionHtml ? (
              <div
                className="text-muted-foreground text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ) : quote ? (
              <p className="text-muted-foreground italic">"{quote}"</p>
            ) : null}
          </div>
        </div>
      );
    }

    if (!activeItem?.url) return null;
    if (isVideo(activeItem)) {
      if (
        activeItem.url.includes("youtube.com") ||
        activeItem.url.includes("youtu.be") ||
        activeItem.url.includes("vimeo.com")
      ) {
        return (
          <iframe
            src={getEmbedUrl(activeItem.url)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={travelerName ? `${travelerName}'s story` : "Customer story"}
          />
        );
      }

      return (
        <video
          src={activeItem.url}
          className="w-full h-full object-contain"
          controls
          playsInline
        />
      );
    }

    return (
      <img
        src={activeItem.url}
        alt={travelerName || "Customer story"}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-5xl mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Buttons */}
        {showPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 bg-card rounded-full shadow-soft hover:shadow-lg hover:bg-primary/10 transition-smooth"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {showNext && (
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 bg-card rounded-full shadow-soft hover:shadow-lg hover:bg-primary/10 transition-smooth"
            aria-label="Next media"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Video Container */}
        <div className="bg-card rounded-xl overflow-hidden shadow-soft">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-smooth shadow-soft"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative bg-black h-[70vh] max-h-[520px] min-h-[320px]">
            <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
              {activeIndex === 0 ? (
                <div className="w-full h-full">{renderActiveSlide()}</div>
              ) : (
                renderActiveSlide()
              )}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="px-6 py-3 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                {activeIndex + 1} / {totalSlides}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VideoModal;
