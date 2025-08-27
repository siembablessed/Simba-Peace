import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Heart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import engagement1 from "@/assets/engagement-1.jpg";
import engagement2 from "@/assets/engagement-2.jpg";
import engagement3 from "@/assets/engagement-3.jpg";

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(false); // desktop default: false
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isShutterActive, setIsShutterActive] = useState(false); // for camera flash
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const photos = [engagement1, engagement2, engagement3].map((src, i) => ({
    src,
    alt: `Photo ${i + 1}`,
    caption: [
      "Our beautiful engagement at Moongate, Belgravia",
      "Capturing moments of pure joy and love",
      "Golden hour magic with my forever person"
    ][i],
    location: ["Moongate, Belgravia", "Studio Session", "Golden Hour"][i]
  }));

  // Detect mobile vs desktop
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    setIsAutoSliding(isMobile);
  }, []);

  // Auto-cycle highlight with camera shutter
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setIsShutterActive(true); // flash overlay
      setTimeout(() => setIsShutterActive(false), 150); // short shutter duration

      setHighlightedIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoSliding, photos.length]);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    setSelectedImage(direction === 'prev'
      ? (selectedImage > 0 ? selectedImage - 1 : photos.length - 1)
      : (selectedImage < photos.length - 1 ? selectedImage + 1 : 0));
  };

  // Touch/swipe
  const handleTouchStart = (e: React.TouchEvent) => touchStartX.current = e.touches[0].clientX;
  const handleTouchMove = (e: React.TouchEvent) => touchEndX.current = e.touches[0].clientX;
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) navigateImage('next');
    if (touchEndX.current - touchStartX.current > 75) navigateImage('prev');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowLeft') navigateImage('prev');
      else if (e.key === 'ArrowRight') navigateImage('next');
      else if (e.key === 'Escape') closeLightbox();
      else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoSliding((prev) => !prev);
      }
    };
    if (selectedImage !== null) document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  return (
    <section id="gallery" className="section-spacing bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section header omitted for brevity */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative">
          {photos.map((photo, index) => {
            const isHighlighted = highlightedIndex === index;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-romantic cursor-pointer transition-all duration-500 hover:shadow-elegant hover:scale-[1.02] bg-background/50 backdrop-blur-sm border border-border/20"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 select-none pointer-events-none"
                  />

                  {/* Camera shutter flash */}
                  {isShutterActive && isHighlighted && (
                    <div className="absolute inset-0 bg-white opacity-80 animate-[shutter_0.15s_ease-in-out] pointer-events-none"></div>
                  )}

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300
                    ${isHighlighted ? "opacity-40" : "opacity-60 group-hover:opacity-40"}`} 
                  />

                  {/* Decorative corners */}
                  {["top-4 left-4","top-4 right-4","bottom-4 left-4","bottom-4 right-4"].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-8 h-8 border-white/30 transition-all duration-300 ${isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100"} ${i===0?"border-l-2 border-t-2 rounded-tl-lg":i===1?"border-r-2 border-t-2 rounded-tr-lg":i===2?"border-l-2 border-b-2 rounded-bl-lg":"border-r-2 border-b-2 rounded-br-lg"}`}></div>
                  ))}

                  {/* Caption and Click to view */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm border border-primary/30">
                        {photo.location}
                      </span>
                    </div>
                    <p className={`font-medium text-lg mb-1 transition-opacity duration-300 
                      ${isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100 delay-100"}`}>
                      {photo.caption}
                    </p>
                    <div className={`flex items-center gap-2 transition-opacity duration-300 
                      ${isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100 delay-200"}`}>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <span className="text-sm text-white/80">Click to view</span>
                    </div>
                  </div>

                  {/* Center camera icon */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 
                    ${isHighlighted ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"}`}>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
