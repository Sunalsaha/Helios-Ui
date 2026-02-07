import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface InnovationVideoProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  description?: string;
  className?: string;
}

const AboutusVedioSection = ({
  videoUrl = "/about.mp4",
  posterUrl = "/video-poster.jpg",
  title = "The Future of Medical Technology",
  description = "Discover how our innovations are shaping the future of healthcare.",
  className = ""
}: InnovationVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(true);     // renamed for clarity
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Initial load
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []); // ← only once on mount

  // Sync playing state with actual video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Play prevented:", err);
          setIsPlaying(false); // important: stay in sync
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Sync mute state
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

return (
  <section className={`py-16 sm:py-20 md:py-24 lg:py-32 
    bg-gradient-to-b from-orange-200 to-white 
    relative overflow-hidden ${className}`}>
    <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent pb-2">
            Innovation in Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Watch how HELIOS Medical Systems is transforming healthcare through 
            cutting-edge technology and innovative solutions.
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-6 sm:mt-8"></div>
        </div>




      
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-white-500 to-orange-500 rounded-2xl sm:rounded-3xl blur-lg opacity-20"></div>
            <div className="relative aspect-video bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-orange-200">
              {!videoError ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  preload="auto"
                  poster={posterUrl}
                  muted={isMuted}           // controlled by state
                  onClick={togglePlayPause} // optional: click video to play/pause
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-500/10">
                  <div className="text-center text-white">
                    <div className="w-16 sm:w-24 h-16 sm:h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                      <Play className="w-8 sm:w-12 h-8 sm:h-12" />
                    </div>
                    <p className="text-base sm:text-lg">Video content unavailable</p>
                    <p className="text-sm opacity-75">Please check your connection</p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Controls */}
              {!videoError && (
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex gap-2">
                  <button
                    onClick={togglePlayPause}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-orange-500/20 transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 sm:w-5 h-4 sm:h-5" /> : <Play className="w-4 sm:w-5 h-4 sm:h-5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-orange-500/20 transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 sm:w-5 h-4 sm:h-5" /> : <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />}
                  </button>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <h3 className="text-white text-lg sm:text-2xl font-bold mb-2 sm:mb-3">
                    {title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-lg">
                    {description}
                  </p>
                </div>
              </div>

              {/* Loading overlay */}
              {!videoLoaded && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-500/10">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <p className="text-lg">Loading video...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusVedioSection;