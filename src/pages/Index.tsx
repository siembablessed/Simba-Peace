import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { WeddingHero } from "@/components/WeddingHero";
import { LoveStory } from "@/components/LoveStory";
import { WeddingDetails } from "@/components/WeddingDetails";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VenueInfo } from "@/components/VenueInfo";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { RSVPForm } from "@/components/RSVPForm";

const Index = () => {
  const [showRSVP, setShowRSVP] = useState(false);

  const handleRSVPClick = () => {
    setShowRSVP(true);
  };

  const handleRSVPClose = () => {
    setShowRSVP(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onRSVPClick={handleRSVPClick} />
      <WeddingHero onRSVPClick={handleRSVPClick} />
      <LoveStory />
      <WeddingDetails />
      <PhotoGallery />
      <VenueInfo />
      <Testimonials />
      <FAQ />
      <Footer />
      
      {showRSVP && <RSVPForm onClose={handleRSVPClose} />}
    </div>
  );
};

export default Index;
