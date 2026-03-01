import { useEffect, useState, useRef } from "react";
import { TrendingUp, Sparkles } from "lucide-react";

type DataKey = "clients" | "revenue" | "employees" | "countries";

interface DataPoint {
  year: number;
  clients: number;
  revenue: number;
  employees: number;
  countries: number;
}

interface SeriesConfig {
  key: DataKey;
  label: string;
  color: string;
  glow: string;
  bg: string;
}

const RAW_DATA: DataPoint[] = [
  { year: 2010, clients: 12,   revenue: 80,   employees: 8,    countries: 1  },
  { year: 2011, clients: 35,   revenue: 210,  employees: 18,   countries: 2  },
  { year: 2012, clients: 80,   revenue: 430,  employees: 35,   countries: 3  },
  { year: 2013, clients: 150,  revenue: 720,  employees: 62,   countries: 5  },
  { year: 2014, clients: 260,  revenue: 1050, employees: 110,  countries: 7  },
  { year: 2015, clients: 390,  revenue: 1380, employees: 175,  countries: 9  },
  { year: 2016, clients: 540,  revenue: 1750, employees: 260,  countries: 12 },
  { year: 2017, clients: 720,  revenue: 2100, employees: 370,  countries: 15 },
  { year: 2018, clients: 950,  revenue: 2500, employees: 510,  countries: 19 },
  { year: 2019, clients: 1200, revenue: 2900, employees: 680,  countries: 23 },
  { year: 2020, clients: 1380, revenue: 3100, employees: 790,  countries: 25 },
  { year: 2021, clients: 1600, revenue: 3600, employees: 940,  countries: 28 },
  { year: 2022, clients: 1900, revenue: 4200, employees: 1120, countries: 31 },
  { year: 2023, clients: 2200, revenue: 4900, employees: 1350, countries: 35 },
];

const SERIES: SeriesConfig[] = [
  { key: "clients",   label: "Clients",   color: "#a78bfa", glow: "rgba(167,139,250,0.4)", bg: "rgba(167,139,250,0.08)" },
  { key: "revenue",   label: "Revenue",   color: "#34d399", glow: "rgba(52,211,153,0.4)",  bg: "rgba(52,211,153,0.08)"  },
  { key: "employees", label: "Employees", color: "#60a5fa", glow: "rgba(96,165,250,0.4)",  bg: "rgba(96,165,250,0.08)"  },
  { key: "countries", label: "Countries", color: "#f87171", glow: "rgba(248,113,113,0.4)", bg: "rgba(248,113,113,0.08)" },
];

const W = 720, H = 340;
const PAD = { top: 28, right: 28, bottom: 52, left: 62 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;

function normalize(val: number, min: number, max: number): number {
  return (val - min) / (max - min || 1);
}

// Catmull-Rom spline → smooth bezier path
function buildSmoothPath(points: DataPoint[], xs: number[], ys: number[]): string {
  if (points.length < 2) return "";
  const pts: [number, number][] = points.map((_d, i) => [xs[i], ys[i]]);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  const t = 0.35;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[Math.max(0, i - 2)];
    const p1 = pts[i - 1];
    const p2 = pts[i];
    const p3 = pts[Math.min(pts.length - 1, i + 1)];
    const cp1x = p1[0] + (p2[0] - p0[0]) * t;
    const cp1y = p1[1] + (p2[1] - p0[1]) * t;
    const cp2x = p2[0] - (p3[0] - p1[0]) * t;
    const cp2y = p2[1] - (p3[1] - p1[1]) * t;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function buildAreaPath(points: DataPoint[], xs: number[], ys: number[]): string {
  const line = buildSmoothPath(points, xs, ys);
  if (!line) return "";
  return `${line} L ${xs[xs.length - 1]},${PAD.top + CHART_H} L ${xs[0]},${PAD.top + CHART_H} Z`;
}

function AnimatedLine({ d, color, strokeWidth = 2.8, delay = 0 }: {
  d: string; color: string; strokeWidth?: number; delay?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, [d]);

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={
        len != null && len > 0
          ? {
              strokeDasharray: `${len}`,
              strokeDashoffset: `${len}`,
              animation: `drawLine 1.9s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
            }
          : { opacity: 0 }
      }
    />
  );
}

export default function GrowthLineChart() {
  const [visible, setVisible] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; data: DataPoint | null; show: boolean;
  }>({ x: 0, y: 0, data: null, show: false });
  const [activeSeries, setActiveSeries] = useState<Set<DataKey>>(
    new Set(SERIES.map((s) => s.key))
  );
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(t);
  }, []);

  const allVals = SERIES.flatMap((s) => RAW_DATA.map((d) => d[s.key]));
  const maxY = Math.max(...allVals) * 1.12;

  const xs = RAW_DATA.map((_, i) => PAD.left + (i / (RAW_DATA.length - 1)) * CHART_W);
  const getYs = (key: DataKey): number[] =>
    RAW_DATA.map((d) => PAD.top + CHART_H - normalize(d[key], 0, maxY) * CHART_H);

  const gridTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: PAD.top + CHART_H - t * CHART_H,
    label: t === 0 ? "0" : Math.round(t * maxY).toLocaleString(),
  }));

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX - PAD.left;
    const step = CHART_W / (RAW_DATA.length - 1);
    const idx = Math.max(0, Math.min(RAW_DATA.length - 1, Math.round(mouseX / step)));
    setHoverIndex(idx);
    setTooltip({ x: xs[idx] - PAD.left, y: CHART_H / 2, data: RAW_DATA[idx], show: true });
  };

  const toggleSeries = (key: DataKey) => {
    setActiveSeries((prev) => {
      const next = new Set(prev);
      if (next.has(key) && next.size > 1) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const activeSorted = SERIES.filter((s) => activeSeries.has(s.key));

  return (
    <div style={{
      fontFamily: "'Outfit', system-ui, sans-serif",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
     background: "linear-gradient(to bottom, #FFD9AE 0%, #FFFFFF 50%)",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes areaIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes headingIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          40%       { transform: translate(14px,-18px) scale(1.05); }
          70%       { transform: translate(-8px,10px) scale(0.96); }
        }
        @keyframes pulseRing {
          0%   { r: 5; opacity: 0.6; }
          100% { r: 14; opacity: 0; }
        }
        @keyframes borderSpin {
          from { background-position: 0% 50%; }
          to   { background-position: 100% 50%; }
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #1c1917 0%, #1c1917 30%,
            #a78bfa 46%, #60a5fa 52%, #34d399 58%,
            #1c1917 74%, #1c1917 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear 1s infinite;
        }

        .pill-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 999px;
          font-size: 12px; font-weight: 500; cursor: pointer;
          border: 1.5px solid transparent;
          transition: opacity 0.2s, transform 0.18s, box-shadow 0.18s;
          font-family: 'Outfit', sans-serif;
        }
        .pill-btn:hover  { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
        .pill-btn.off    { opacity: 0.28; }
      `}</style>

      {/* Page background blobs */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        {[
          { w:600, h:600, top:"-12%", left:"-10%", c:"rgba(167,139,250,0.10)", d:"12s", delay:"0s" },
          { w:500, h:500, bottom:"-8%", right:"-8%", c:"rgba(52,211,153,0.09)", d:"17s", delay:"2s" },
          { w:380, h:380, top:"38%", right:"18%", c:"rgba(96,165,250,0.07)", d:"21s", delay:"5s" },
        ].map((b, i) => (
          <div key={i} style={{
            position:"absolute", width:b.w, height:b.h,
            top: (b as any).top, left: (b as any).left,
            bottom: (b as any).bottom, right: (b as any).right,
            borderRadius:"50%",
            background:`radial-gradient(circle, ${b.c} 0%, transparent 65%)`,
            animation:`floatBlob ${b.d} ease-in-out ${b.delay} infinite`,
          }} />
        ))}
      </div>

      <div style={{ width:"100%", maxWidth:900, position:"relative", zIndex:1, animation:"fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>

        {/* ── Heading section ── */}
        <div style={{ textAlign:"center", marginBottom:"clamp(24px, 4vw, 64px)", paddingTop:48, paddingInline:"clamp(16px, 4vw, 32px)", animation:"headingIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(28px, 5.5vw, 60px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "clamp(12px, 2vw, 32px)",
            background: "linear-gradient(to right, #7c2d12, #ea580c, #b45309)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Our Remarkable Journey
          </h1>

          <p style={{
            margin: "0 auto",
            fontSize: "clamp(14px, 1.8vw, 20px)",
            color: "#4b5563",
            maxWidth: 560,
            lineHeight: 1.65,
          }}>
            14 years of growth across clients, revenue, people &amp; global reach
          </p>

          <div style={{
            width: "clamp(64px, 8vw, 96px)",
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(to right, #f97316, #f59e0b)",
            margin: "clamp(16px, 2.5vw, 32px) auto 0",
          }} />
        </div>

        {/* ── Gradient border glow frame ── */}
        <div style={{
          position: "relative",
          borderRadius: 32,
          padding: 2.5,
          background: "linear-gradient(135deg, rgba(167,139,250,0.7) 0%, rgba(96,165,250,0.5) 30%, rgba(52,211,153,0.6) 65%, rgba(248,113,113,0.5) 100%)",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.6) inset",
            "0 0 48px rgba(167,139,250,0.18)",
            "0 0 80px rgba(52,211,153,0.12)",
            "0 28px 72px rgba(0,0,0,0.10)",
          ].join(", "),
        }}>
          {/* Outer glow halo */}
          <div style={{
            position:"absolute", inset:-20,
            borderRadius:48,
            background:"linear-gradient(135deg, rgba(167,139,250,0.12), rgba(52,211,153,0.10), rgba(96,165,250,0.08))",
            filter:"blur(24px)",
            zIndex:-1,
            pointerEvents:"none",
          }} />

          {/* White card */}
          <div style={{
            background:"#ffffff",
            borderRadius:30,
            padding:"32px 32px 24px",
            position:"relative",
            overflow:"hidden",
          }}>

            {/* Inner ambient blobs */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
              <div style={{ position:"absolute", width:280, height:280, top:-70, right:-70, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", filter:"blur(40px)" }} />
              <div style={{ position:"absolute", width:240, height:240, bottom:-50, left:-50, borderRadius:"50%", background:"radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter:"blur(40px)" }} />
            </div>

            {/* Card header */}
            <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:42, height:42, borderRadius:14, background:"linear-gradient(135deg, rgba(167,139,250,0.16), rgba(52,211,153,0.10))", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <TrendingUp size={18} color="#a78bfa" />
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#1c1917" }}>Growth Metrics</div>
                  <div style={{ fontSize:12, color:"#a8a29e", marginTop:1 }}>2010 – 2023</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, color:"#a8a29e", marginBottom:5 }}>Overall Progress</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:88, height:5, borderRadius:999, background:"#f1f0ef", overflow:"hidden" }}>
                    <div style={{
                      height:"100%", borderRadius:999,
                      background:"linear-gradient(to right, #a78bfa, #60a5fa, #34d399)",
                      width: visible ? "100%" : "0%",
                      transition:"width 2.8s cubic-bezier(0.22,1,0.36,1) 0.7s",
                    }} />
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:"#a78bfa" }}>100%</span>
                </div>
              </div>
            </div>

            {/* Series pills */}
            <div style={{ position:"relative", display:"flex", gap:8, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
              {SERIES.map((s) => (
                <button
                  key={s.key}
                  className={`pill-btn ${activeSeries.has(s.key) ? "" : "off"}`}
                  style={{
                    background: s.bg,
                    color: s.color,
                    borderColor: activeSeries.has(s.key) ? `${s.color}50` : "#e7e5e4",
                  }}
                  onClick={() => toggleSeries(s.key)}
                >
                  <div style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />
                  {s.label}
                </button>
              ))}
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}>
                <Sparkles size={12} color="#c4b5a8" />
                <span style={{ fontSize:11, color:"#c4b5a8" }}>hover to explore</span>
              </div>
            </div>

            {/* SVG chart */}
            <div style={{ position:"relative" }}>
              <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                style={{ width:"100%", height:"auto", overflow:"visible", cursor:"crosshair", display:"block" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { setHoverIndex(null); setTooltip((t) => ({ ...t, show:false })); }}
              >
                <defs>
                  {SERIES.map((s) => (
                    <linearGradient key={s.key} id={`ag-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={s.color} stopOpacity="0.22" />
                      <stop offset="80%"  stopColor={s.color} stopOpacity="0.03" />
                      <stop offset="100%" stopColor={s.color} stopOpacity="0"    />
                    </linearGradient>
                  ))}
                </defs>

                {/* Grid */}
                {gridTicks.map((g, i) => (
                  <g key={i}>
                    <line
                      x1={PAD.left} y1={g.y} x2={W - PAD.right} y2={g.y}
                      stroke={i === 0 ? "#e7e5e4" : "#f0edea"}
                      strokeWidth={1}
                      strokeDasharray={i === 0 ? "0" : "5 5"}
                    />
                    <text x={PAD.left - 10} y={g.y + 4} textAnchor="end" fontSize={10} fill="#c4b5a8" fontFamily="Outfit,sans-serif">
                      {g.label}
                    </text>
                  </g>
                ))}

                {/* X-axis labels */}
                {RAW_DATA.map((d, i) =>
                  i % 2 === 0 ? (
                    <text key={i} x={xs[i]} y={H - PAD.bottom + 20} textAnchor="middle" fontSize={10} fill="#c4b5a8" fontFamily="Outfit,sans-serif">
                      {d.year}
                    </text>
                  ) : null
                )}

                {/* Area fills — appear after lines finish drawing */}
                {visible && activeSorted.map((s, si) => (
                  <path
                    key={`area-${s.key}`}
                    d={buildAreaPath(RAW_DATA, xs, getYs(s.key))}
                    fill={`url(#ag-${s.key})`}
                    style={{
                      opacity: 0,
                      animation: `areaIn 1.2s ease ${0.4 + si * 0.2 + 1.8}s forwards`,
                    }}
                  />
                ))}

                {/* Lines: soft glow layer + crisp top layer */}
                {visible && activeSorted.map((s, si) => {
                  const pathD = buildSmoothPath(RAW_DATA, xs, getYs(s.key));
                  const delay = 0.3 + si * 0.2;
                  return (
                    <g key={`lg-${s.key}`}>
                      <AnimatedLine d={pathD} color={s.glow} strokeWidth={7}  delay={delay} />
                      <AnimatedLine d={pathD} color={s.color} strokeWidth={2.6} delay={delay} />
                    </g>
                  );
                })}

                {/* Hover crosshair */}
                {hoverIndex !== null && (
                  <>
                    <line
                      x1={xs[hoverIndex]} y1={PAD.top}
                      x2={xs[hoverIndex]} y2={PAD.top + CHART_H}
                      stroke="#d6d3d0" strokeWidth={1} strokeDasharray="4 4"
                    />
                    <rect
                      x={xs[hoverIndex] - 22} y={H - PAD.bottom + 6}
                      width={44} height={17} rx={5}
                      fill="#f5f4f2"
                    />
                    <text x={xs[hoverIndex]} y={H - PAD.bottom + 19} textAnchor="middle" fontSize={10} fill="#78716c" fontWeight={600} fontFamily="Outfit,sans-serif">
                      {RAW_DATA[hoverIndex].year}
                    </text>
                  </>
                )}

                {/* Hover dots */}
                {hoverIndex !== null && activeSorted.map((s) => {
                  const cx = xs[hoverIndex];
                  const cy = getYs(s.key)[hoverIndex];
                  return (
                    <g key={`hd-${s.key}`}>
                      <circle cx={cx} cy={cy} r={5} fill={s.color} opacity={0.25}>
                        <animate attributeName="r" from="5" to="14" dur="0.55s" fill="freeze" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="0.55s" fill="freeze" />
                      </circle>
                      <circle cx={cx} cy={cy} r={5} fill="#fff" stroke={s.color} strokeWidth={2.5}
                        style={{ filter:`drop-shadow(0 0 4px ${s.color}90)` }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {tooltip.show && tooltip.data && (
                <div style={{
                  position:"absolute",
                  left: tooltip.x + PAD.left + 14,
                  top: tooltip.y + PAD.top,
                  background:"#fff",
                  border:"1px solid #ede9e6",
                  borderRadius:14,
                  padding:"12px 16px",
                  pointerEvents:"none",
                  minWidth:148,
                  zIndex:20,
                  boxShadow:"0 12px 32px rgba(0,0,0,0.10)",
                  transform:"translateY(-50%)",
                  transition:"left 0.12s, top 0.12s",
                }}>
                  <div style={{ fontSize:11, color:"#a8a29e", marginBottom:10, fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase" }}>
                    {tooltip.data.year}
                  </div>
                  {activeSorted.map((s) => (
                    <div key={s.key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:14, marginBottom:6 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <div style={{ width:7, height:7, borderRadius:"50%", background:s.color, boxShadow:`0 0 5px ${s.color}80` }} />
                        <span style={{ fontSize:12, color:"#78716c" }}>{s.label}</span>
                      </div>
                      <span style={{ fontSize:13, fontWeight:700, color:"#1c1917" }}>
                        {tooltip.data![s.key].toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress dots */}
            <div style={{ display:"flex", justifyContent:"center", gap:5, marginTop:16, position:"relative" }}>
              {RAW_DATA.map((_d, i) => (
                <div key={i} style={{
                  height:5, borderRadius:999,
                  background: hoverIndex === i ? "linear-gradient(to right,#a78bfa,#34d399)" : "#ede9e6",
                  width: hoverIndex === i ? 22 : 5,
                  transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: hoverIndex === i ? "0 0 8px rgba(167,139,250,0.45)" : "none",
                }} />
              ))}
            </div>

          </div>
        </div>
        {/* end glow frame */}

      </div>
    </div>
  );
}