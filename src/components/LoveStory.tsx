import { Calendar, MapPin, Heart, Sparkles, Coffee, Plane } from "lucide-react";

export const LoveStory = () => {
  const milestones = [
    {
      icon: Sparkles,
      title: "Sparks Flew",
      date: "August 2023",
      description: "It was love at first sight when our paths crossed in August. The universe conspired to bring two souls together, and from that very first glance, we both knew our lives were about to change forever.",
      color: "text-primary"
    },
    {
      icon: Coffee,
      title: "The Magic Begins",
      date: "A few days later",
      description: "Our first date at 5 Avenue wasn't just dinner—it was destiny unfolding. Hours melted away like minutes as we discovered we shared the same dreams, the same laughter, and an undeniable chemistry that lit up the entire restaurant.",
      color: "text-primary"
    },
    {
      icon: Plane,
      title: "Adventures Across Continents",
      date: "Throughout 2024",
      description: "From spontaneous weekend getaways to planned adventures across different cities, we became each other's favorite travel companion. Every sunset we watched together, every new place we discovered, only strengthened the bond between our hearts.",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "A Night to Remember",
      date: "The Proposal",
      description: "Under the starlit sky at Moongate in Belgravia, surrounded by the soft glow of candlelight, Simba took Peace's hand and asked her to be his forever. With tears of joy and hearts full of love, she said yes to a lifetime of adventures together.",
      color: "text-primary"
    }
  ];

  return (
    <section id="love-story" className="section-spacing bg-secondary/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating flower-like shapes */}
        <div className="absolute top-1/4 left-1/3 transform rotate-12">
          <div className="w-8 h-8 bg-primary/10 rounded-full relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/15 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/15 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary/15 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary/15 rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 right-1/4 transform -rotate-12">
          <div className="w-6 h-6 bg-accent/15 rounded-full relative">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-accent/20 rounded-full"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-accent/20 rounded-full"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-accent/20 rounded-full"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-accent/20 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-wedding text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Our Love Story
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            They say when you know, you know. Our story is proof that sometimes the universe has perfect timing, bringing together two hearts meant to beat as one.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                  <milestone.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${milestone.color || 'text-primary'}`} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <p className="text-primary font-medium mb-3 text-sm sm:text-sm uppercase tracking-wide">
                    {milestone.date}
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-base sm:text-base font-medium">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};