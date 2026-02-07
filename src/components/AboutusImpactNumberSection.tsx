import  { useEffect, useState } from 'react';

interface ImpactStat {
  endValue: number;
  label: string;
  suffix?: string;
}

interface Props {
  stats?: ImpactStat[];
}

const defaultStats: ImpactStat[] = [
  { endValue: 14, label: 'Years of Innovation' },
  { endValue: 45, label: 'Countries Served' },
  { endValue: 50000, label: 'Healthcare Professionals', suffix: '+' },
  { endValue: 20000, label: 'Patient Lives Impacted', suffix: '+' },
];

function AboutusImpactNumberSection({ stats = defaultStats }: Props) {
  return (
    <section className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white relative overflow-hidden text-white py-16 md:py-24 px-5 sm:px-8 lg:px-12 text-center">


      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 md:mb-6">
          Our Impact by Numbers
        </h2>

        <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-6 md:mb-10">
          The numbers tell our story of growth, innovation, and positive impact on healthcare worldwide.
        </p>

        {/* Thin underline like in screenshot */}
        <div className="w-24 h-0.5 bg-white/70 mx-auto mb-12 md:mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl py-8  shadow-lg border border-white/20"
            >
              <CounterCard
                endValue={stat.endValue}
                label={stat.label}
                suffix={stat.suffix}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Animated Counter Card (logic unchanged) ────────────────────────────────
interface CounterProps {
  endValue: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function CounterCard({
  endValue,
  label,
  suffix = '',
  duration = 2200,
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = 16; // ~60fps
    const steps = Math.floor(duration / stepTime);
    const increment = endValue / steps;

    const timer = setInterval(() => {
      start += increment;
      const nextValue = Math.min(Math.floor(start), endValue);
      setCount(nextValue);

      if (nextValue >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight mb-2 min-h-[90px] md:min-h-[110px] flex items-center justify-center">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-base sm:text-lg md:text-xl font-medium opacity-95 px-2 ">
        {label}
      </div>
    </div>
  );
}

export default AboutusImpactNumberSection;