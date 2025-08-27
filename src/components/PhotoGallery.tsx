
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Heart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import engagement1 from "@/assets/engagement-1.jpg";
import engagement2 from "@/assets/engagement-2.jpg";
import engagement3 from "@/assets/engagement-3.jpg";

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const photos = [
    {
      src: engagement1,
      alt: "Simba and Peacemaker engagement photo 1",
      caption: "Our beautiful engagement at Moongate, Belgravia",
      location: "Moongate, Belgravia"
    },
    {
      src: engagement2,
      alt: "Simba and Peacemaker engagement photo 2", 
      caption: "Capturing moments of pure joy and love",
      location: "Studio Session"
    },
    {
      src: engagement3,
      alt: "Simba and Peacemaker engagement photo 3",
      caption: "Golden hour magic with my forever person",
      location: "Golden Hour"
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : photos.length - 1);
    } else {
      setSelectedImage(selectedImage < photos.length - 1 ? selectedImage + 1 : 0);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (selectedImage !== null && isAutoSliding) {
      autoSlideRef.current = setTimeout(() => {
        navigateImage('next');
      }, 5000); // 5 seconds
    }

    return () => {
      if (autoSlideRef.current) {
        clearTimeout(autoSlideRef.current);
      }
    };
  }, [selectedImage, isAutoSliding]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swipe left - next image
      navigateImage('next');
    }
    if (touchEndX.current - touchStartX.current > 75) {
      // Swipe right - previous image
      navigateImage('prev');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoSliding(!isAutoSliding);
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImage, isAutoSliding]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <section id="gallery" className="section-spacing bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <Heart className="w-5 h-5 text-primary animate-pulse" />
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <h2 className="font-wedding text-4xl md:text-6xl text-foreground mb-6 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent pb-2">
            Our Journey in Pictures
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Every picture tells our story of love, laughter, and the beautiful moments that led us here.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {photos.map((photo, index) => (
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
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    KhtmlUserSelect: 'none',
                    MsUserSelect: 'none'
                  } as React.CSSProperties}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm border border-primary/30">
                      {photo.location}
                    </span>
                  </div>
                  <p className="font-medium text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <span className="text-sm text-white/80">Click to view</span>
                  </div>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-sm font-medium">More memories to be made on our special day</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        {/* Enhanced Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in select-none"
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
          >
            {/* Enhanced Close Button */}
            <Button
              onClick={closeLightbox}
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 text-white hover:text-primary hover:bg-white/20 transition-all duration-300 z-10 w-14 h-14 rounded-full border border-white/20 backdrop-blur-sm hover:scale-110 hover:border-primary/50"
            >
              <X className="w-7 h-7" />
            </Button>

            {/* Auto-slide toggle */}
            <Button
              onClick={() => setIsAutoSliding(!isAutoSliding)}
              variant="ghost"
              size="sm"
              className="absolute top-6 left-6 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 z-10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm text-sm"
            >
              {isAutoSliding ? 'Pause' : 'Play'} Auto-slide
            </Button>

            {/* Enhanced Navigation Buttons */}
            <Button
              onClick={() => navigateImage('prev')}
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-primary hover:bg-white/20 transition-all duration-300 z-10 w-16 h-16 rounded-full border border-white/20 backdrop-blur-sm hover:scale-110 hover:border-primary/50"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              onClick={() => navigateImage('next')}
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-primary hover:bg-white/20 transition-all duration-300 z-10 w-16 h-16 rounded-full border border-white/20 backdrop-blur-sm hover:scale-110 hover:border-primary/50"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image Container */}
            <div className="max-w-6xl max-h-full flex flex-col items-center">
              <div className="relative">
                <img
                  src={photos[selectedImage].src}
                  alt={photos[selectedImage].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 select-none"
                  onClick={(e) => e.stopPropagation()}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    KhtmlUserSelect: 'none',
                    MsUserSelect: 'none'
                  } as React.CSSProperties}
                />
                
                {/* Auto-slide progress bar */}
                {isAutoSliding && (
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-[progress_5s_linear_infinite]"></div>
                  </div>
                )}
              </div>
              
              {/* Caption */}
              <div className="mt-6 text-center max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="px-4 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full backdrop-blur-sm border border-primary/30">
                    {photos[selectedImage].location}
                  </span>
                </div>
                <p className="text-white text-lg font-medium leading-relaxed">
                  {photos[selectedImage].caption}
                </p>
                <div className="flex items-center justify-center gap-4 mt-4 text-white/60">
                  <span className="text-sm">{selectedImage + 1} of {photos.length}</span>
                  <span className="text-xs">Swipe or use arrows to navigate • Space to pause</span>
                </div>
              </div>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === selectedImage ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
