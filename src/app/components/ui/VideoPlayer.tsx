"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "@/app/lib/client-utils";
import NextImage from "next/image";

interface VideoPlayerProps {
  videoUrl?: string;
  fallbackImageUrl: string;
  title: string;
}

export default function VideoPlayer({
  videoUrl,
  fallbackImageUrl,
  title,
}: VideoPlayerProps) {
  const [videoError, setVideoError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const video = videoRef.current;

      const handleCanPlay = () => {
        video.play().catch((error) => {
          video.currentTime = 0;
          console.error("Autoplay failed:", error);
        });
      };

      const handleError = (e: Event) => {
        console.error("Video loading error:", e);
        setVideoError(true);
      };

      const handleEnded = () => {
        if (!videoError) {
          video.currentTime = 0;
          video.play().catch(console.error);
        }
      };

      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);
      video.addEventListener("ended", handleEnded);
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
        video.removeEventListener("ended", handleEnded);
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
      };
    }
  }, [videoUrl, videoError]);

  return (
    <div className="relative w-full h-full min-h-0 rounded-lg overflow-hidden bg-background-tertiary">
      {/* Video Player */}
      {videoUrl && !videoError && (
        <motion.video
          ref={videoRef}
          className={`w-full h-full transition-all duration-300 ${
            isFullscreen
              ? "object-contain"
              : "object-cover sm:object-contain md:object-cover"
          }`}
          playsInline
          loop
          autoPlay
          muted
          controls
          controlsList="nodownload"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </motion.video>
      )}

      {/* Image - Only shown if no video URL or video error */}
      {(!videoUrl || videoError) && (
        <div className="relative w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
          <NextImage
            src={fallbackImageUrl}
            alt={`${title} preview`}
            fill
            className="object-cover sm:object-contain md:object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
}
