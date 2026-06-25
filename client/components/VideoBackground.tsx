import { useState, useEffect, useRef } from "react";
import VideoPreloader from "./VideoPreloader";
import { BACKGROUND_VIDEOS } from "@/data/backgroundVideos";

export default function VideoBackground() {
  const [showPreloader, setShowPreloader] = useState(false);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("TheGlam_preloader_shown");

    if (!hasSeenPreloader) {
      setShowPreloader(true);

      const timer = setTimeout(() => {
        setIsPreloaderExiting(true);

        const removeTimer = setTimeout(() => {
          setShowPreloader(false);
          localStorage.setItem("TheGlam_preloader_shown", "true");
        }, 1000);

        return () => clearTimeout(removeTimer);
      }, 8000);

      return () => clearTimeout(timer);
    } else {
      setShowPreloader(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => {
      const playOnInteraction = () => {
        video.play();
        document.removeEventListener("click", playOnInteraction);
        document.removeEventListener("touchstart", playOnInteraction);
      };
      document.addEventListener("click", playOnInteraction);
      document.addEventListener("touchstart", playOnInteraction);
    });
  }, [currentVideoIndex]);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % BACKGROUND_VIDEOS.length);
  };

  return (
    <>
      {showPreloader && <VideoPreloader isExiting={isPreloaderExiting} />}

      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {!videoError ? (
          <video
            ref={videoRef}
            key={BACKGROUND_VIDEOS[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={BACKGROUND_VIDEOS[currentVideoIndex]} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple/20 via-cosmic-dark to-cosmic-blue/20"></div>
        )}
      </div>
    </>
  );
}
