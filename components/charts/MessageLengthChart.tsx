"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../ui/Card";

interface DataPoint {
  date: string;
  length: number;
}

interface MessageLengthChartProps {
  data: DataPoint[];
}

export function MessageLengthChart({ data }: MessageLengthChartProps) {
  return (
    <Card variant="default" className="p-6 h-[300px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-text-primary">Message Length Trend</h3>
        <p className="text-sm text-text-secondary">Average words per message</p>
      </div>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLength" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#3E5A73"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              stroke="#3E5A73"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                color: "var(--color-text-primary)",
              }}
              itemStyle={{ color: "var(--color-text-primary)" }}
            />
            <Area
              type="monotone"
              dataKey="length"
              name="Words"
              stroke="var(--color-teal)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorLength)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
