import React, { useState, useEffect } from "react";

const SIZE = 60;
const STROKE = 5;

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const radius = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percent = docHeight === 0 ? 0 : (scrollY / docHeight) * 100;
      setScrollPercent(percent);
      setVisible(scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Inline keyframes as a <style> tag */}
      <style>
        {`
          @keyframes jump {
            0%   { transform: translateY(0); }
            20%  { transform: translateY(-12px); }
            30%  { transform: translateY(-10px);}
            50%  { transform: translateY(0); }
            70%  { transform: translateY(-6px);}
            100% { transform: translateY(0);}
          }
        `}
      </style>
      <button
        onClick={scrollToTop}
        aria-label="Go to top"
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 1000,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.3s",
          animation: visible ? "jump 1.3s infinite" : "none"
        }}
      >
        <svg width={SIZE} height={SIZE}>
          {/* Background circle */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={STROKE}
            fill="none"
          />
          {/* Progress indicator */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={radius}
            stroke="#fc466b"
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (scrollPercent / 100) * circumference
            }
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
          {/* Up Arrow (SVG Path) */}
          <polyline
            points={`${SIZE / 2},${SIZE / 2 + 10} ${SIZE / 2},${SIZE / 2 - 8}`}
            stroke="#fc466b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <polyline
            points={`${SIZE / 2 - 8},${SIZE / 2} ${SIZE / 2},${SIZE / 2 - 8} ${SIZE / 2 + 8},${SIZE / 2}`}
            stroke="#fc466b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </>
  );
};

export default GoToTopButton;
