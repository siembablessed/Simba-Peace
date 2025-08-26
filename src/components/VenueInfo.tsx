
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import venueMapImage from "@/assets/venue-map.jpg";

export const VenueInfo = () => {
  const venueDetails = [
    {
      icon: MapPin,
      title: "Address",
      content: "Cardinals Restaurant & Events\nKwekwe, Zimbabwe"
    },
    {
      icon: Phone,
      title: "Contact",
      content: "+263 XX XXX XXXX\ninfo@cardinals.co.zw"
    },
    {
      icon: Clock,
      title: "Parking",
      content: "On-site parking"
    },
    {
      icon: Navigation,
      title: "Directions",
      content: "Located in central Kwekwe\nEasy access from main roads"
    }
  ];

  const handleGetDirections = () => {
    // In a real app, this would open Google Maps with the venue location
    window.open('https://maps.google.com/?q=Cardinals+Kwekwe+Zimbabwe', '_blank');
  };

  return (
    <section id="venue-info" className="section-spacing bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-wedding text-4xl md:text-5xl text-foreground mb-4">
            Venue Information
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about getting to Cardinals for our special celebration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <img 
              src={venueMapImage} 
              alt="Map showing Cardinals venue location in Kwekwe" 
              className="w-full h-96 object-cover rounded-2xl shadow-romantic"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            <div className="absolute top-6 left-6">
              <h3 className="text-white text-2xl font-bold mb-1">Kwekwe</h3>
              <p className="text-white/80 text-sm">Cardinals Location</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <Button 
                onClick={handleGetDirections}
                className="w-full bg-primary hover:bg-primary-soft text-primary-foreground font-medium py-3 rounded-full shadow-elegant transition-all duration-300 hover:scale-105"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {venueDetails.map((detail, index) => (
              <Card key={index} className="wedding-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <detail.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {detail.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {detail.content}
                  </p>
                </CardContent>
              </Card>
            ))}
            
          </div>
        </div>
      </div>
    </section>
  );
};
