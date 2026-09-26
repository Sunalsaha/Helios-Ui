// components/GrowthHighlights.tsx
import React, { useState } from 'react';
import { Calendar, Globe, Zap, Users, Briefcase } from "lucide-react";

interface FeatureItem {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
}

interface GrowthHighlightsProps {
  features?: FeatureItem[];
  className?: string;
}

const GrowthHighlights: React.FC<GrowthHighlightsProps> = ({
  features = [
    { icon: Calendar,  title: "Years of Excellence", desc: "Continuous innovation since 2010" },
    { icon: Globe,     title: "Global Expansion",    desc: "From 1 to 45 countries served" },
    { icon: Zap,       title: "Revenue Growth",      desc: "18,400% increase in 14 years" },
    { icon: Users,     title: "Team Expansion",      desc: "From 10 to 620 employees" },
    { icon: Briefcase, title: "Client Base",         desc: "From 50 to 2,500 clients" }
  ],
  className = ''
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className={`w-full ${className}`}>
      <style>{`
        .gh-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 0 1.5rem 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Clean, neutral surface */
        .gh-track-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06);
        }

        .gh-top-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #C45E1A;
        }

        /* Fades */
        .gh-fade-left, .gh-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 90px;
          z-index: 10;
          pointer-events: none;
        }
        .gh-fade-left  { left:  0; background: linear-gradient(to right, #FFFFFF 20%, transparent); }
        .gh-fade-right { right: 0; background: linear-gradient(to left,  #FFFFFF 20%, transparent); }

        /* Marquee */
        .gh-marquee-track {
          display: flex;
          align-items: center;
          padding: 22px 0;
          will-change: transform;
          animation: marqueeRoll 36s linear infinite;
          position: relative;
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
          padding: 8px 32px;
          cursor: default;
          flex-shrink: 0;
        }

        /* Icon box */
        .gh-icon-box {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #FFF4EB;
          border: 1px solid #F2DFC9;
        }

        /* Typography */
        .gh-text-title {
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: #1F2937;
          white-space: nowrap;
          line-height: 1.3;
        }

        .gh-text-desc {
          font-size: 12px;
          font-weight: 400;
          color: #6B7280;
          white-space: nowrap;
          line-height: 1.4;
          margin-top: 1px;
        }

        /* Separator */
        .gh-sep {
          flex-shrink: 0;
          width: 1px;
          height: 28px;
          background: #E5E7EB;
        }
      `}</style>

      <div className="gh-wrapper">
        <div
          className="gh-track-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="gh-top-accent" />
          <div className="gh-fade-left" />
          <div className="gh-fade-right" />

          <div className={`gh-marquee-track ${isPaused ? 'paused' : ''}`}>
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={i}>
                  <div className="gh-pill">
                    <div className="gh-icon-box">
                      <Icon
                        style={{ color: "#C45E1A", width: 18, height: 18 }}
                        strokeWidth={1.8}
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
        </div>
      </div>
    </div>
  );
};

export default GrowthHighlights;