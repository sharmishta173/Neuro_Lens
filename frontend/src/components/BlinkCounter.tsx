import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BlinkCounterProps {
  count: number;
  rate: number; // blinks per minute
}

const BlinkCounter = ({ count, rate }: BlinkCounterProps) => {
  const isHealthy = rate >= 15 && rate <= 20; // Normal blink rate: 15-20 per minute
  const isLow = rate < 15;

  return (
    <Card className="border-2 border-primary/30 backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 shadow-[0_0_30px_hsl(193_100%_50%_/_0.2)] hover:scale-105 transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-card/50 border-2 border-primary/20 text-primary">
              <Eye className="w-6 h-6 animate-glow-pulse" />
            </div>
            <h3 className="text-lg font-semibold">Blink Detection</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isHealthy ? "bg-green-400/20 text-green-400" :
            isLow ? "bg-yellow-400/20 text-yellow-400" :
            "bg-red-400/20 text-red-400"
          }`}>
            {isHealthy ? "HEALTHY" : isLow ? "LOW" : "HIGH"}
          </div>
        </div>

        <div className="space-y-4">
          {/* Blink count */}
          <div className="text-center p-6 rounded-xl bg-card/30 border border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">Total Blinks</div>
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {count}
            </div>
          </div>

          {/* Blink rate */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-card/20 border border-primary/10">
              <div className="text-xs text-muted-foreground mb-1">Rate/Min</div>
              <div className="text-2xl font-bold text-primary">{rate}</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/20 border border-primary/10">
              <div className="text-xs text-muted-foreground mb-1">Normal</div>
              <div className="text-2xl font-bold text-green-400">15-20</div>
            </div>
          </div>

          {/* Info */}
          <div className="text-xs text-muted-foreground text-center pt-2">
            {isHealthy && "Your blink rate is healthy! Keep it up."}
            {isLow && "Blink more frequently to prevent dry eyes."}
            {!isHealthy && !isLow && "You're blinking too frequently."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlinkCounter;
