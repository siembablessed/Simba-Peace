import { Heart, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Wedding Details */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Heart className="w-5 h-5" />
              <h3 className="font-wedding text-xl">Simba & Peacemaker</h3>
            </div>
            <p className="text-primary-foreground/80 mb-2">December 13th, 2025</p>
            <p className="text-primary-foreground/80">Cardinals, Kwekwe</p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">+263772 824 382</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">simba.peace@wedding.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">Cardinals, Kwekwe, Zimbabwe</span>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div>
            <h3 className="font-semibold text-lg mb-4">With Gratitude</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Thank you for being part of our love story. Your presence and support mean the world to us as we begin this beautiful journey together.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            Made with ❤️ for Simba & Peacemaker's Special Day
          </p>
        </div>
      </div>
    </footer>
  );
};