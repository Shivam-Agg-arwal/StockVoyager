import React, { useState, useEffect, useRef } from "react";
import GamingCentre from "./GamingCentre";
import './GamingHub.css';

const GamingHub = () => {
    const [showContent, setShowContent] = useState(false);
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
        setShowContent(true);
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.playbackRate = 2.0; // Speed up the video by 2 times

            const cropDuration = 10; // Duration to play in seconds
            const handleTimeUpdate = () => {
                if (videoElement.currentTime >= cropDuration) {
                    videoElement.pause();
                    handleVideoEnd();
                }
            };

            videoElement.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, []);

    return (
        <div className="w-full min-h-screen gradient-background">
            {!showContent ? (
                <div className="video-container">
                    <video
                        ref={videoRef}
                        width="100%"
                        controls
                        autoPlay
                        muted
                        playsInline
                    >
                        <source src="https://res.cloudinary.com/du41brgak/video/upload/v1719473394/Gamer_StockVoyager/ljatsojujyzhq7m1ota0.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <div className="bulge-in">
                    <div className="text-center font-bold text-8xl w-full">
                        GAMING HUB
                    </div>
                    <GamingCentre />
                </div>
            )}
        </div>
    );
};

export default GamingHub;
