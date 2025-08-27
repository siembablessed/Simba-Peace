import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import venueMapImage from "@/assets/venue-map.png";
import { motion } from "framer-motion";

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
      content: "Secure on-site parking available",
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
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-wedding text-4xl md:text-5xl text-foreground mb-4">
            Venue Information
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about reaching Cardinals for our
            celebration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group h-full flex-1"
          >
            <img
              src={venueMapImage}
              alt="Map showing Cardinals venue location in Kwekwe"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />

            <div className="absolute top-6 left-6">
              <h3 className="text-white text-2xl font-bold mb-1">Kwekwe</h3>
              <p className="text-white/80 text-sm">Cardinals Location</p>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <Button
                onClick={handleGetDirections}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex flex-col space-y-6"
          >
            {venueDetails.map((detail, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              >
                <Card
                  className="relative px-6 py-6 rounded-2xl border border-primary/20 
                             bg-white dark:bg-zinc-900 backdrop-blur-sm shadow-lg 
                             transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center">
                      <detail.icon className="w-6 h-6" />
                    </div>

                    {/* Text */}
                    <div>
                      <CardHeader className="p-0 mb-1">
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {detail.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                          {detail.content}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
