import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import venueMapImage from "@/assets/venue-map.png";

export const VenueInfo = () => {
  const venueDetails = [
    {
      icon: Phone,
      title: "Contact",
      content: "+263 776 137 244\n+263 772 824 382",
    },
    {
      icon: Clock,
      title: "Parking",
      content: "On-site parking",
    },
    {
      icon: Navigation,
      title: "Directions",
      content: "Located in central Kwekwe\nEasy access from main roads",
    },
  ];

  const handleGetDirections = () => {
    window.open(
      "https://maps.google.com/?q=Cardinals+Kwekwe+Zimbabwe",
      "_blank"
    );
  };

  return (
    <section id="venue-info" className="section-spacing bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-wedding text-4xl md:text-5xl text-foreground mb-4">
            Venue Information
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about getting to Cardinals for our
            special celebration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Map */}
          <div className="relative group h-full flex-1">
            <img
              src={venueMapImage}
              alt="Map showing Cardinals venue location in Kwekwe"
              className="w-full h-full object-cover rounded-2xl shadow-romantic"
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

          {/* Info Cards */}
          <div className="flex flex-col space-y-4 h-full">
            {venueDetails.map((detail, index) => (
              <Card
                key={index}
                className="relative overflow-hidden px-5 py-4 rounded-2xl border border-white/20 
                           bg-white/30 dark:bg-white/10 backdrop-blur-md shadow-lg 
                           transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-primary/30 hover:scale-[1.02]
                           flex-1"
              >
                {/* Watermark Icon */}
                <detail.icon
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-28 h-28 text-primary/10 pointer-events-none"
                />

                <div className="relative z-10">
                  <CardHeader className="p-0 mb-1">
                    <CardTitle className="text-lg text-foreground">
                      {detail.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground whitespace-pre-line text-sm">
                      {detail.content}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
