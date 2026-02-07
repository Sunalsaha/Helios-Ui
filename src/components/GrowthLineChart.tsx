import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveLine } from "@nivo/line";
import { TrendingUp } from "lucide-react";

interface GrowthDataPoint {
  year: number;
  clients: number;
  revenue: number;
  employees: number;
  countries: number;
}

interface GrowthGraphProps {
  data: GrowthDataPoint[];
  visible: boolean;
}

const GrowthLineChart: React.FC<GrowthGraphProps> = ({ data, visible }) => {
  const [animatedData, setAnimatedData] = useState<GrowthDataPoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Format data for Nivo
  const series = [
    {
      id: "Clients",
      color: "#fb923c",
      data: animatedData.map((d) => ({ x: d.year, y: d.clients })),
    },
    {
      id: "Revenue",
      color: "#facc15",
      data: animatedData.map((d) => ({ x: d.year, y: d.revenue })),
    },
    {
      id: "Employees",
      color: "#fbbf24",
      data: animatedData.map((d) => ({ x: d.year, y: d.employees })),
    },
    {
      id: "Countries",
      color: "#f97316",
      data: animatedData.map((d) => ({ x: d.year, y: d.countries })),
    },
  ];

  // Sequential data animation
  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex <= data.length) {
            setAnimatedData(data.slice(0, nextIndex));
            return nextIndex;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [visible, data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 relative overflow-hidden pb-14"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-2xl animate-glow-slow" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-xl animate-glow-slow animation-delay-1000" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <motion.div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Our Remarkable Journey
              </h3>
              <p className="text-gray-600">14 years of exponential growth</p>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={visible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-right origin-left"
          >
            <div className="text-sm text-gray-500 mb-1">Growth Progress</div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-orange-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2.5,
                    delay: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
              <span className="text-sm font-bold text-orange-600">100%</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Chart container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 1, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: "400px" }}
        >
          <ResponsiveLine
            data={series}
            margin={{ top: 50, right: 110, bottom: 80, left: 80 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              stacked: false,
              min: "auto",
              max: "auto",
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: "Year",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Count",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            pointSize={12}
            pointColor={{ theme: "background" }}
            pointBorderWidth={4}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            enableSlices="x"
            animate={true}
            motionConfig={{
              mass: 1,
              tension: 120,
              friction: 14,
              duration: 1000,
              precision: 0.001,
            }}
            curve="cardinal"
            lineWidth={5}
            enableGridX={false}
            enableGridY={true}
            gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
            colors={(d) => d.color}
            enableArea={true}
            areaOpacity={0.1}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 5,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.85,
                symbolSize: 14,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(251, 146, 60, 0.1)",
                      itemOpacity: 1,
                      symbolSize: 16,
                    },
                  },
                ],
              },
            ]}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fill: "#6b7280",
                    fontWeight: 500,
                  },
                },
                legend: {
                  text: {
                    fontSize: 14,
                    fill: "#374151",
                    fontWeight: 600,
                  },
                },
              },
              grid: {
                line: {
                  stroke: "#f3f4f6",
                  strokeWidth: 1,
                },
              },
              tooltip: {
                container: {
                  background: "white",
                  border: "2px solid #fb923c",
                  borderRadius: "12px",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  fontSize: "14px",
                  fontWeight: 500,
                },
              },
            }}
            sliceTooltip={({ slice }) => (
              <div className="bg-white p-4 rounded-xl border-2 border-orange-200 shadow-xl">
                <div className="font-bold text-gray-800 mb-2">
                  Year: {slice.points[0].data.x}
                </div>
                {slice.points.map((point) => (
                  <div
                    key={point.id}
                    className="flex items-center space-x-2 mb-1"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: point.seriesColor }}
                    />
                    <span className="font-medium text-gray-700">
                      {point.seriesId}:
                    </span>
                    <span className="font-bold text-orange-600">
                      {point.data.yFormatted}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
        </motion.div>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 flex justify-center space-x-2"
        >
          {data.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index < currentIndex
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 scale-110"
                  : "bg-orange-200"
              }`}
              initial={{ scale: 0.5 }}
              animate={{ scale: index < currentIndex ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes glow-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-glow-slow {
          animation: glow-slow 4s ease-in-out infinite;
        }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </motion.div>
  );
};

export default GrowthLineChart;
