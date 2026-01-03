import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  posterImage?: string;
  travelerName?: string;
  travelerLocation?: string;
  quote?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  posterImage,
  travelerName,
  travelerLocation,
  quote,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: VideoModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!isOpen) return null;

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
        {hasPrevious && onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 bg-card rounded-full shadow-soft hover:shadow-lg hover:bg-primary/10 transition-smooth"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {hasNext && onNext && (
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 bg-card rounded-full shadow-soft hover:shadow-lg hover:bg-primary/10 transition-smooth"
            aria-label="Next video"
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

          <div className="relative aspect-video bg-muted">
            {videoUrl ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={travelerName ? `${travelerName}'s story` : "Customer story"}
              />
            ) : posterImage ? (
              <img
                src={posterImage}
                alt={travelerName || "Customer story"}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {/* Caption */}
          {(travelerName || travelerLocation || quote) && (
            <div className="p-6">
              {(travelerName || travelerLocation) && (
                <div className="mb-3">
                  {travelerName && (
                    <h3 id="video-modal-title" className="font-semibold text-lg">
                      {travelerName}
                    </h3>
                  )}
                  {travelerLocation && (
                    <p className="text-sm text-muted-foreground">{travelerLocation}</p>
                  )}
                </div>
              )}
              {quote && (
                <p className="text-muted-foreground italic">"{quote}"</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
