// src/components/FloatingParticles.js
import React from "react";

/**
 * FloatingParticles - decorative, non-interactive background dots
 * Matches original App.js particle behavior.
 */
const FloatingParticles = ({ count = 20 }) => {
  const dots = Array.from({ length: count });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 6 + Math.random() * 18;
        const delay = Math.random() * 6;
        const dur = 6 + Math.random() * 10;
        return (
          <div
            key={i}
            className="rounded-full opacity-30 animate-float"
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: "linear-gradient(180deg,#8b5cf6,#06b6d4)",
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              filter: "blur(6px)",
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles;
