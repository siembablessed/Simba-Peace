import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date("2025-12-13T14:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <div className="mt-8 p-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/20">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Countdown to Forever</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="bg-primary/10 rounded-lg p-3 mb-2">
              <span className="text-2xl md:text-3xl font-bold text-primary font-mono">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};