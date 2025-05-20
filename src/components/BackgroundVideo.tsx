import React, { useEffect, useState } from 'react';
import './BackgroundVideo.css';

const videoList = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4',
  '/videos/video4.mp4',
  '/videos/video5.mp4',
];

const BackgroundVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    }, 12000); // every 12s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video-background-container">
      <video
        key={videoList[currentVideo]}
        src={videoList[currentVideo]}
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      />
      <div className="video-overlay">
        <h1 className="video-brand">VOG-LUXE</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
