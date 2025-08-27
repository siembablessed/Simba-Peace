import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "What time should I arrive?",
      answer: "Please arrive by 2:00 PM. The ceremony will begin promptly at 2:30 PM. We recommend arriving a few minutes early to find your seat and enjoy the pre-ceremony atmosphere."
    },
    {
      question: "Is there parking available at the venue?",
      answer: "Yes, Cardinals has ample parking available for all our guests. The parking is complimentary and located right at the venue for your convenience."
    },
    {
      question: "What is the dress code?",
      answer: "We've requested cocktail attire for our celebration. Ladies can wear cocktail dresses, and gentlemen can wear suits or dress shirts. We love our wedding colors (sage green and cream) if you'd like to incorporate them!"
    },
    {
      question: "Will there be vegetarian/dietary options?",
      answer: "Absolutely! We've made sure to include vegetarian options in our menu. If you have specific dietary requirements or allergies, please let us know in your RSVP so we can accommodate you."
    },
    {
      question: "Can I bring a plus-one?",
      answer: "Only Invited guests are allowed."
    },
    {
      question: "Will the ceremony be outdoors?",
      answer: "The ceremony and reception will both be held at Cardinals. The venue has both indoor and covered outdoor spaces, so you'll be comfortable regardless of the weather."
    },
    {
      question: "What time will the celebration end?",
      answer: "The reception will continue until late evening, around 11:00 PM. You're welcome to stay and celebrate with us as long as you'd like!"
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="section-spacing bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-wedding text-4xl md:text-5xl text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know to celebrate with us on our special day.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="wedding-card">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};