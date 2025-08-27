import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah & David",
      relationship: "Best Friends",
      message:
        "Watching Simba and Peace together is like witnessing pure magic. Their love is infectious and genuine, and we couldn't be happier to celebrate this beautiful milestone with them!",
      rating: 5,
    },
    {
      name: "The Johnson Family",
      relationship: "Family Friends",
      message:
        "We've known both families for years, and seeing Simba and Peacemaker find each other has been a joy to witness. They're perfect for each other and we're honored to be part of their special day.",
      rating: 5,
    },
    {
      name: "Marcus & Lisa",
      relationship: "College Friends",
      message:
        "From their first date to this beautiful engagement, we've been cheering them on. They bring out the best in each other and their love story gives us all hope for true love!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="section-spacing bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-wedding text-4xl md:text-5xl text-foreground mb-4">
            Words from Loved Ones
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our friends and family have to say about our journey together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden px-5 py-6 rounded-2xl border border-white/20 
                         bg-white/30 dark:bg-white/10 backdrop-blur-md shadow-lg 
                         transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-primary/30 hover:scale-[1.02] h-full"
            >
              {/* Optional Watermark Icon */}
              <Quote className="absolute left-3 top-1/2 -translate-y-1/2 w-28 h-28 text-primary/10 pointer-events-none" />

              <CardContent className="relative z-10 flex flex-col h-full p-0">
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                </div>

                <p className="text-foreground leading-relaxed mb-6 flex-grow whitespace-pre-line">
                  "{testimonial.message}"
                </p>

                <div className="mt-auto">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.relationship}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-card rounded-full shadow-soft border border-border/20">
            <Quote className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground font-medium">
              "Love is not just looking at each other, it's looking in the same direction."
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
