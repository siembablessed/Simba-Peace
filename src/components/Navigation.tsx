import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onRSVPClick: () => void;
}

export const Navigation = ({ onRSVPClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { label: "Our Story", id: "love-story" },
    { label: "Details", id: "wedding-details" },
    { label: "Gallery", id: "gallery" },
    { label: "Venue", id: "venue-info" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      {/* Frosted navbar (always on top) */}
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
          isScrolled || isOpen
            ? "bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-elegant"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-foreground hover:text-primary-dark transition-colors duration-300"
            >
              <span className="font-wedding text-xl">S & P</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary-dark transition-all duration-300 font-medium relative group px-4 py-2 rounded-lg overflow-hidden hover:bg-primary-dark/5"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-dark/10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
                </button>
              ))}
              <Button
                onClick={onRSVPClick}
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                RSVP
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-2 text-foreground hover:text-primary-dark transition-all duration-300 hover:bg-primary-dark/5 rounded-lg"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (frosted behind navbar) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 
                     bg-white/30 dark:bg-black/40 
                     backdrop-blur-3xl shadow-2xl animate-fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* Stop clicks inside menu from closing */}
          <div
            className="container mx-auto px-6 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-2 mt-16">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-center text-foreground hover:text-primary-dark transition-all duration-300 font-medium py-4 px-6 rounded-xl hover:bg-primary-dark/5 w-full max-w-xs border border-transparent hover:border-primary-dark/20"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-border/30 mt-6 pt-6 w-full max-w-xs">
                <Button
                  onClick={() => {
                    onRSVPClick();
                    setIsOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-medium py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  RSVP Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
