// components/GrowthHighlights.tsx
import React, { useState } from 'react';
import { Calendar, Globe, Zap, Users, Briefcase } from "lucide-react";

interface FeatureItem {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  color: string;
  glow: string;
}

interface GrowthHighlightsProps {
  features?: FeatureItem[];
  className?: string;
}

const GrowthHighlights: React.FC<GrowthHighlightsProps> = ({
  features = [
    { icon: Calendar,  title: "Years of Excellence", desc: "Continuous innovation since 2010", color: "#C45E1A", glow: "#E8772A" },
    { icon: Globe,     title: "Global Expansion",    desc: "From 1 to 45 countries served",   color: "#D4721E", glow: "#F08030" },
    { icon: Zap,       title: "Revenue Growth",      desc: "18,400% increase in 14 years",    color: "#B84F10", glow: "#D96820" },
    { icon: Users,     title: "Team Expansion",      desc: "From 10 to 620 employees",         color: "#C96022", glow: "#E87830" },
    { icon: Briefcase, title: "Client Base",         desc: "From 50 to 2,500 clients",         color: "#D06818", glow: "#EC7E28" }
  ],
  className = ''
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className={`w-full ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .gh-wrapper {
          font-family: 'DM Sans', sans-serif;
          padding: 0 1.5rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ── Warm orange-to-white premium surface ── */
        .gh-track-container {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          background: linear-gradient(135deg,
            #FFF8F2 0%,
            #FFF2E6 30%,
            #FFEEDD 60%,
            #FFF5EC 100%
          );
          border: 1px solid rgba(200, 100, 30, 0.15);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.9) inset,
            0 4px 16px rgba(180, 80, 20, 0.08),
            0 24px 64px rgba(180, 80, 20, 0.1);
        }

        /* Silk-like diagonal sheen */
        .gh-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            112deg,
            rgba(255,255,255,0.55) 0%,
            rgba(255,255,255,0.0) 40%,
            rgba(255,255,255,0.0) 60%,
            rgba(255,255,255,0.3) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Delicate warm grid */
        .gh-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(190, 90, 20, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(190, 90, 20, 0.045) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
          pointer-events: none;
        }

        /* Orange scanning beam */
        .gh-scan-line {
          position: absolute;
          top: 0;
          left: -60%;
          width: 55%;
          height: 1.5px;
          background: linear-gradient(90deg,
            transparent,
            rgba(210,100,30,0.0) 8%,
            rgba(210,100,30,0.55) 38%,
            rgba(240,140,60,0.95) 50%,
            rgba(210,100,30,0.55) 62%,
            rgba(210,100,30,0.0) 92%,
            transparent
          );
          animation: scanLine 5.5s ease-in-out infinite;
          z-index: 5;
        }
        @keyframes scanLine {
          0%   { left: -55%; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* Top accent line */
        .gh-top-accent {
          position: absolute;
          top: 0; left: 6%; right: 6%;
          height: 1.5px;
          border-radius: 999px;
          background: linear-gradient(90deg,
            transparent,
            rgba(210,110,40,0.3) 20%,
            rgba(235,140,60,0.7) 50%,
            rgba(210,110,40,0.3) 80%,
            transparent
          );
          z-index: 4;
        }

        .gh-bottom-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,100,30,0.12), transparent);
        }

        /* Fades — match bg tones */
        .gh-fade-left, .gh-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 110px;
          z-index: 10;
          pointer-events: none;
        }
        .gh-fade-left  { left:  0; background: linear-gradient(to right, #FFF8F2 15%, transparent); }
        .gh-fade-right { right: 0; background: linear-gradient(to left,  #FFF5EC 15%, transparent); }

        /* Floating warm orbs */
        .gh-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(55px);
          pointer-events: none;
          top: 50%;
          transform: translateY(-50%);
        }
        .gh-orb-1 {
          width: 280px; height: 80px;
          background: radial-gradient(ellipse, rgba(220,110,40,0.14), transparent 70%);
          animation: orbDrift 10s ease-in-out infinite alternate;
        }
        .gh-orb-2 {
          width: 200px; height: 60px;
          background: radial-gradient(ellipse, rgba(245,170,80,0.12), transparent 70%);
          animation: orbDrift 10s ease-in-out infinite alternate-reverse;
          animation-delay: -5s;
        }
        @keyframes orbDrift {
          0%   { left: -2%; }
          100% { left: 78%; }
        }

        /* Marquee */
        .gh-marquee-track {
          display: flex;
          align-items: center;
          padding: 18px 0;
          will-change: transform;
          animation: marqueeRoll 32s linear infinite;
          position: relative;
          z-index: 2;
        }
        .gh-marquee-track.paused { animation-play-state: paused; }
        @keyframes marqueeRoll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marqueeRoll { 0%, 100% { transform: none; } }
        }

        /* Pill */
        .gh-pill {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 30px;
          cursor: default;
          flex-shrink: 0;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .gh-pill:hover { transform: translateY(-2px); }

        /* Icon box — glowing orange jewel on white */
        .gh-icon-box {
          position: relative;
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          background: linear-gradient(145deg, #FFFFFF 0%, #FFF0E4 100%);
          box-shadow:
            0 0 0 1px rgba(200, 100, 30, 0.18),
            0 2px 8px rgba(180, 80, 20, 0.1),
            inset 0 1px 0 rgba(255,255,255,1);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .gh-pill:hover .gh-icon-box {
          background: linear-gradient(145deg, #FFFFFF 0%, #FFE8D0 100%);
          box-shadow:
            0 0 0 1px rgba(200, 100, 30, 0.32),
            0 4px 18px rgba(180, 80, 20, 0.16),
            0 0 24px rgba(220, 120, 50, 0.14),
            inset 0 1px 0 rgba(255,255,255,1);
        }

        /* White shimmer sweep */
        .gh-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            rgba(255,255,255,0.6) 48%,
            rgba(255,255,255,0.85) 50%,
            rgba(255,255,255,0.6) 52%,
            transparent 100%
          );
          transform: translateX(-150%) skewX(-12deg);
        }
        .gh-pill:hover .gh-shimmer {
          animation: shimmerSlide 0.55s ease forwards;
        }
        @keyframes shimmerSlide {
          0%   { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(250%) skewX(-12deg); }
        }

        /* Orange ping dot */
        .gh-ping {
          position: absolute;
          top: -2px; right: -2px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #D06820;
          z-index: 2;
          box-shadow: 0 0 5px rgba(208, 104, 32, 0.5);
        }
        .gh-ping::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50%;
          background: #D06820;
          animation: pingOrange 2.5s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes pingOrange {
          0%       { transform: scale(1);   opacity: 0.7; }
          80%,100% { transform: scale(2.8); opacity: 0;   }
        }

        /* Typography */
        .gh-text-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #7A3510;
          white-space: nowrap;
          line-height: 1.2;
          transition: color 0.3s ease;
        }
        .gh-pill:hover .gh-text-title { color: #A84A18; }

        .gh-text-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.01em;
          color: rgba(150, 80, 30, 0.48);
          white-space: nowrap;
          line-height: 1.3;
          margin-top: 2px;
          transition: color 0.3s ease;
        }
        .gh-pill:hover .gh-text-desc { color: rgba(150, 80, 30, 0.72); }

        /* Diamond separator */
        .gh-sep {
          flex-shrink: 0;
          width: 4px; height: 4px;
          transform: rotate(45deg);
          background: rgba(200, 100, 30, 0.2);
          border: 1px solid rgba(200, 100, 30, 0.28);
        }
      `}</style>

      <div className="gh-wrapper">
        <div
          className="gh-track-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="gh-sheen" />
          <div className="gh-grid-bg" />
          <div className="gh-scan-line" />
          <div className="gh-top-accent" />
          <div className="gh-orb gh-orb-1" />
          <div className="gh-orb gh-orb-2" />
          <div className="gh-fade-left" />
          <div className="gh-fade-right" />

          <div className={`gh-marquee-track ${isPaused ? 'paused' : ''}`}>
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === i;
              return (
                <React.Fragment key={i}>
                  <div
                    className="gh-pill"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="gh-icon-box">
                      <div className="gh-shimmer" />
                      <div className="gh-ping" />
                      <Icon
                        style={{
                          color: isHovered ? item.glow : item.color,
                          width: 17, height: 17,
                          transition: 'color 0.3s ease',
                          filter: isHovered ? `drop-shadow(0 0 6px ${item.glow}80)` : 'none'
                        }}
                        strokeWidth={1.7}
                      />
                    </div>
                    <div>
                      <div className="gh-text-title">{item.title}</div>
                      <div className="gh-text-desc">{item.desc}</div>
                    </div>
                  </div>
                  <div className="gh-sep" />
                </React.Fragment>
              );
            })}
          </div>

          <div className="gh-bottom-line" />
        </div>
      </div>
    </div>
  );
};

export default GrowthHighlights;