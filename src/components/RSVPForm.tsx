import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send, X, Calendar, Download } from "lucide-react";

interface RSVPFormProps {
  onClose: () => void;
}

export const RSVPForm = ({ onClose }: RSVPFormProps) => {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    attending: "",
    guestCount: 1,
    dietaryRequirements: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const { toast } = useToast();

  const handleCalendarExport = () => {
    const eventDate = new Date("2025-12-13T14:00:00");
    const endDate = new Date("2025-12-13T22:00:00");
    const reminderDate = new Date("2025-12-12T14:00:00"); // Day before
    
    // Create .ics file content with reminder
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Event//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Simba & Peacemaker Wedding
DESCRIPTION:Join us for the wedding celebration of Simba & Peacemaker at Cardinals Restaurant & Events
LOCATION:Cardinals Restaurant & Events, Kwekwe, Zimbabwe
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Wedding reminder - Simba & Peacemaker's wedding is tomorrow!
TRIGGER:${reminderDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // Create and download .ics file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'simba-peacemaker-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    const startDate = new Date("2025-12-13T14:00:00").toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date("2025-12-13T22:00:00").toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Simba & Peacemaker Wedding')}&dates=${startDate}/${endDate}&details=${encodeURIComponent('Join us for the wedding celebration of Simba & Peacemaker at Cardinals Restaurant & Events. Don\'t forget to set a reminder!')}&location=${encodeURIComponent('Cardinals Restaurant & Events, Kwekwe, Zimbabwe')}&reminder=1440`; // 1440 minutes = 1 day
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([{
          guest_name: formData.guestName,
          email: formData.email,
          phone: formData.phone,
          attending: formData.attending === "yes",
          guest_count: formData.guestCount,
          dietary_requirements: formData.dietaryRequirements,
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "RSVP Submitted Successfully!",
        description: formData.attending === "yes" 
          ? "Thank you for confirming your attendance. We can't wait to celebrate with you!" 
          : "Thank you for letting us know. We'll miss you on our special day.",
      });

      // Show calendar options if attending
      if (formData.attending === "yes") {
        setShowCalendarOptions(true);
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast({
        title: "Error",
        description: "There was an issue submitting your RSVP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto wedding-card animate-scale-in">
        <CardHeader className="text-center pb-6 border-b border-border/10 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 p-0 hover:bg-primary/10"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="font-wedding text-3xl text-foreground">
            RSVP to Our Wedding
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Please let us know if you'll be joining us on December 13th, 2025
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Full Name *</Label>
                <Input
                  id="guestName"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+263 XX XXX XXXX"
              />
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">Will you be attending? *</Label>
              <RadioGroup 
                value={formData.attending} 
                onValueChange={(value) => setFormData({ ...formData, attending: value })}
                className="grid gap-3"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/20 hover:bg-primary/5 transition-colors">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="cursor-pointer font-medium">
                    Yes, I'll be there!
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/20 hover:bg-primary/5 transition-colors">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer font-medium">
                    Sorry, can't make it
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.attending === "yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Number of Guests</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Requirements</Label>
                  <Input
                    id="dietary"
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                    placeholder="Vegetarian, allergies, etc."
                  />
                 </div>
               </>
             )}
            
            <div className="space-y-2">
              <Label htmlFor="message">Special Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your excitement or well wishes..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-6 border-t border-border/10">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={loading}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !formData.guestName || !formData.attending}
                className="bg-primary hover:bg-primary-soft px-6"
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit RSVP
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Calendar Options Modal */}
      {showCalendarOptions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <Card className="w-full max-w-md wedding-card animate-scale-in">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-wedding text-2xl text-foreground flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Add to Calendar
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Don't forget our special day! Add it to your calendar with a reminder.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button
                  onClick={() => {
                    handleCalendarExport();
                    setShowCalendarOptions(false);
                    onClose();
                  }}
                  className="w-full justify-start gap-3 h-12"
                  variant="outline"
                >
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Download .ics file</div>
                    <div className="text-xs text-muted-foreground">Works with most calendar apps</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => {
                    handleGoogleCalendar();
                    setShowCalendarOptions(false);
                    onClose();
                  }}
                  className="w-full justify-start gap-3 h-12"
                  variant="outline"
                >
                  <Calendar className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Add to Google Calendar</div>
                    <div className="text-xs text-muted-foreground">Opens in your browser</div>
                  </div>
                </Button>
              </div>
              
              <div className="text-center pt-4 border-t border-border/10">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowCalendarOptions(false);
                    onClose();
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip for now
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                Both options include a reminder 1 day before the event
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};