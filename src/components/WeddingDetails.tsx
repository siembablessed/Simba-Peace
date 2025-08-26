import { MapPin, Clock, Users, Utensils, Gift, CreditCard, Building2 } from "lucide-react";
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

export const WeddingDetails = () => {
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
            <Card key={index} className="wedding-card group hover:scale-105 transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={detail.image} 
                  alt={detail.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <detail.icon className="w-7 h-7 mb-2" />
                  <h3 className="font-semibold text-xl">{detail.title}</h3>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl font-wedding">
                  {detail.subtitle}
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {detail.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {detail.content.map((item, idx) => (
                    <li key={idx} className="text-sm text-foreground/80 flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};