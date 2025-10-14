import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface WebcamMonitorProps {
  isActive: boolean;
  onToggle: () => void;
}

const WebcamMonitor = ({ isActive, onToggle }: WebcamMonitorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (isActive && !stream) {
      startWebcam();
    } else if (!isActive && stream) {
      stopWebcam();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive]);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      setStream(mediaStream);
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      toast({
        title: "Webcam activated",
        description: "Eye monitoring is now active",
      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setHasPermission(false);
      toast({
        title: "Camera access denied",
        description: "Please enable camera permissions to use NeuroLens",
        variant: "destructive",
      });
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-card/50 backdrop-blur-sm shadow-[0_0_30px_hsl(193_100%_50%_/_0.2)]">
        {/* Video display */}
        <div className="relative aspect-video bg-muted/20">
          {isActive && stream ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Scanning overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-2 border-primary/50 rounded-2xl">
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                </div>
                {/* Scanning line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[slide-down_2s_ease-in-out_infinite]" 
                     style={{ animation: "slide-down 2s ease-in-out infinite" }} />
              </div>
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                <span className="text-xs text-primary font-medium">MONITORING</span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
                <CameraOff className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Camera Inactive</h3>
                <p className="text-muted-foreground max-w-md">
                  {hasPermission === false
                    ? "Camera access denied. Please enable camera permissions in your browser settings."
                    : "Click the button below to start monitoring your eye health"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {isActive ? "Real-time eye tracking active" : "Ready to monitor"}
            </div>
            <Button
              onClick={onToggle}
              variant={isActive ? "destructive" : "default"}
              className={
                isActive
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-[0_0_20px_hsl(193_100%_50%_/_0.3)]"
              }
            >
              {isActive ? (
                <>
                  <CameraOff className="w-4 h-4 mr-2" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Start Monitoring
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamMonitor;
