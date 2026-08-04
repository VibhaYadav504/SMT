import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { monthlyData } from "./chartData";

const GrowthChart = () => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-200
        hover:shadow-xl
      "
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-100 opacity-40 blur-3xl transition-all duration-500 group-hover:scale-125" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Analytics
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Student Growth
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Monthly student registrations across the platform.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp size={18} />
                <span className="font-semibold">+18.5%</span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Compared to last year
              </p>
            </div>

            <div className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg">
              2026
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="studentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#f97316"
                    stopOpacity={0.45}
                  />
                  <stop
                    offset="95%"
                    stopColor="#f97316"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 12px 30px rgba(15,23,42,0.12)",
                }}
              />

              <Area
                type="monotone"
                dataKey="students"
                stroke="#f97316"
                strokeWidth={4}
                fill="url(#studentGradient)"
                activeDot={{
                  r: 7,
                  fill: "#f97316",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default GrowthChart;