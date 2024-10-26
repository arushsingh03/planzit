"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const GalaxyBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random(),
          speed: Math.random() * 2 + 0.5,
        });
      }
      setStars(newStars);
    };

    generateStars();

    const animationInterval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: (star.x + star.speed * 0.1) % 100,
          opacity: 0.3 + Math.sin((Date.now() / 1000) * star.speed) * 0.7,
        }))
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-transparent">
      <div className="absolute inset-0">
        {stars.map((star: Star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GalaxyBackground;
