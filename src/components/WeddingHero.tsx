import { Calendar, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import heroImage from "@/assets/wedding-hero.jpg";

interface WeddingHeroProps {
  onRSVPClick: () => void;
}

export const WeddingHero = ({ onRSVPClick }: WeddingHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-cover"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="fade-in-up">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6 drop-shadow-lg" />
          
          <h1 className="font-wedding text-5xl md:text-7xl lg:text-8xl text-foreground mb-4">
            Simbarashe
            <span className="block text-primary"> & </span>
            Peacemaker
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            Together with our families, we invite you to celebrate our love
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="flex items-center gap-3 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">December 13th, 2025</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-3 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">Cardinals, Kwekwe</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={onRSVPClick}
              size="lg" 
              className="bg-primary hover:bg-primary-soft text-primary-foreground font-medium px-8 py-3 rounded-full shadow-elegant transition-all duration-300 hover:scale-105"
            >
              RSVP Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('love-story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Story
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}

    </section>
  );
};