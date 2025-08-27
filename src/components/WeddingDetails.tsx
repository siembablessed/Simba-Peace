import { MapPin, Clock, Users, Utensils, Gift, CreditCard, Building2, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import venueImage from "@/assets/venue-image.jpg";
import scheduleImage from "@/assets/schedule-card.jpg";
import dressCodeImage from "@/assets/dress-code.jpg";
import menuImage from "@/assets/menu-card.jpg";
import giftRegistryImage from "@/assets/gift-registry.jpg";
import ecocashLogo from "@/assets/ecocash-logo.png";
import nedbankLogo from "@/assets/nedbank-logo.svg";

const FlipCard = ({ 
  detail, 
  isFlipped, 
  onFlip 
}: { 
  detail: any; 
  isFlipped: boolean; 
  onFlip: () => void; 
}) => {
  return (
    <div className="relative h-96 w-full perspective-1000">
      <div 
        className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="relative h-full">
            <img 
              src={detail.image} 
              alt={detail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                  <detail.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="text-center text-white">
                <h3 className="font-wedding text-2xl mb-2">{detail.subtitle}</h3>
                <p className="text-sm text-white/90 leading-relaxed mb-4">{detail.description}</p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                >
                  Click to view details
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="relative h-full bg-gradient-to-br from-primary/5 to-secondary/10 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <detail.icon className="w-6 h-6 text-primary mr-2" />
                <h3 className="font-wedding text-xl text-foreground">{detail.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlip();
                }}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <RotateCcw className="w-4 h-4 text-primary" />
              </Button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-semibold text-primary text-lg mb-3">{detail.subtitle}</h4>
              <ul className="space-y-3">
                {detail.content.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-foreground/80 flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WeddingDetails = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const handleCardFlip = (index: number) => {
    setFlippedCardIndex(flippedCardIndex === index ? null : index);
  };

  const details = [
    {
      icon: MapPin,
      title: "Venue",
      subtitle: "Cardinals, Kwekwe",
      description: "A beautiful venue in the heart of Kwekwe, perfect for our special celebration.",
      image: venueImage,
      content: [
        "Cardinals Restaurant & Events",
        "Kwekwe, Zimbabwe",
        "Elegant dining with beautiful gardens",
        "Full accessibility available"
      ]
    },
    {
      icon: Clock,
      title: "Schedule",
      subtitle: "December 13th, 2025",
      description: "Join us for a day filled with love, laughter, and celebration.",
      image: scheduleImage,
      content: [
        "2:00 PM - Guest Arrival",
        "2:30 PM - Ceremony Begins",
        "3:30 PM - Photos & Cocktails",
        "5:00 PM - Reception & Dinner",
        "8:00 PM - Dancing & Celebration"
      ]
    },
    {
      icon: Users,
      title: "Dress Code",
      subtitle: "Cocktail Attire",
      description: "Please join us in cocktail attire to celebrate this special occasion.",
      image: dressCodeImage,
      content: [
        "Cocktail dresses for ladies",
        "Suits or dress shirts for gentlemen", 
        "Colors: Sage green & cream encouraged",
        "Comfortable shoes for dancing"
      ]
    },
    {
      icon: Utensils,
      title: "Menu",
      subtitle: "Culinary Delights",
      description: "Enjoy a carefully curated menu featuring the finest local and international cuisine.",
      image: menuImage,
      content: [
        "Welcome cocktails & canapés",
        "Three-course plated dinner",
        "Vegetarian options available",
        "Wedding cake & desserts",
        "Full bar service"
      ]
    }
  ];

  return (
    <section id="wedding-details" className="section-spacing bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-wedding text-4xl md:text-5xl text-foreground mb-4">
            Wedding Details
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our special day.
          </p>
        </div>

        {/* Gift Registry Prominent Section */}
        <div className="mb-16 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/20 border border-primary/20 p-8 md:p-12 hover:shadow-elegant transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/15 transition-all duration-300"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/15 transition-all duration-300">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="font-wedding text-2xl md:text-3xl text-foreground mb-4">
                Gift Registry
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your presence is the greatest gift, but if you wish to give, we kindly request monetary contributions only.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/30 hover:bg-background/70 hover:border-primary/40 transition-all duration-300 cursor-pointer group/payment">
                      <div className="flex items-center justify-center mb-2">
                        <CreditCard className="w-5 h-5 text-primary mr-2" />
                        <h4 className="font-semibold text-foreground">Preferred Method</h4>
                      </div>
                      <p className="text-sm text-muted-foreground group-hover/payment:text-foreground transition-colors">Click to view payment options</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-2">
                      <DialogTitle className="font-wedding text-xl text-foreground">Payment Options</DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid md:grid-cols-2 gap-6 py-4">
                      {/* EcoCash */}
                      <div className="text-left">
                        <h5 className="font-semibold text-primary mb-3 flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          EcoCash
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div className="bg-secondary/30 rounded-lg p-3">
                            <p className="font-medium text-foreground">+263 776 137 244</p>
                            <p className="text-muted-foreground">Primary Number</p>
                          </div>
                          <div className="bg-secondary/30 rounded-lg p-3">
                            <p className="font-medium text-foreground">+263 772 824 382</p>
                            <p className="text-muted-foreground">Alternative Number</p>
                          </div>
                        </div>
                      </div>

                      {/* Bank Transfer */}
                      <div className="text-left">
                        <h5 className="font-semibold text-primary mb-3 flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          Bank Transfer
                        </h5>
                        <div className="bg-secondary/30 rounded-lg p-3 text-sm">
                          <div className="space-y-1">
                            <p><span className="font-medium">Bank:</span> Nedbank</p>
                            <p><span className="font-medium">Account:</span> Simba & Peace Wedding</p>
                            <p><span className="font-medium">Number:</span> 12345678901</p>
                            <p><span className="font-medium">Branch:</span> Kwekwe</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-center text-muted-foreground text-sm mt-4">
                      Thank you for your generous contribution to our new beginning
                    </p>
                  </DialogContent>
                </Dialog>
                
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  <div className="flex items-center justify-center mb-2">
                    <Building2 className="w-5 h-5 text-primary mr-2" />
                    <h4 className="font-semibold text-foreground">No Physical Gifts</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Your love and presence are enough</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
         {/* Wedding Details Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
          {details.map((detail, index) => (
            <FlipCard 
              key={index} 
              detail={detail} 
              isFlipped={flippedCardIndex === index}
              onFlip={() => handleCardFlip(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};