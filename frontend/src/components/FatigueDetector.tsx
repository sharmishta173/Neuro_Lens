import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface FatigueDetectorProps {
  blinkRate: number;
  isMonitoring: boolean;
  onFatigueDetected: () => void;
}

const FatigueDetector = ({ blinkRate, isMonitoring, onFatigueDetected }: FatigueDetectorProps) => {
  useEffect(() => {
    if (!isMonitoring) return;

    // Check for fatigue indicators every 15 seconds
    const fatigueInterval = setInterval(() => {
      // Detect fatigue based on very low blink rate (< 8 per minute)
      if (blinkRate < 8) {
        onFatigueDetected();
        
        // Show fatigue warning
        toast({
          title: "⚠️ Fatigue Detected",
          description: "Your blink rate is very low. Consider taking a break to rest your eyes.",
          variant: "destructive",
        });

        // Browser notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("NeuroLens - Fatigue Alert", {
            body: "Drowsiness detected. Time for a break!",
            icon: "/favicon.ico",
            badge: "/favicon.ico",
          });
        }
      }
      
      // Detect possible drowsiness (blink rate 8-10 range)
      else if (blinkRate >= 8 && blinkRate < 10) {
        toast({
          title: "😴 Low Blink Rate",
          description: "You might be getting tired. Consider taking a short break.",
        });
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(fatigueInterval);
  }, [isMonitoring, blinkRate, onFatigueDetected]);

  return null; // This is a logic-only component
};

export default FatigueDetector;
