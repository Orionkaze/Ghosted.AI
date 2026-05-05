"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../ui/Card";

interface DataPoint {
  date: string;
  you: number;
  them: number;
}

interface ResponseTimeChartProps {
  data: DataPoint[];
}

export function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  return (
    <Card variant="default" className="p-6 h-[300px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-text-primary">Average Response Time</h3>
        <p className="text-sm text-text-secondary">Measured in hours over time</p>
      </div>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
              tickFormatter={(value) => `${value}h`}
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
            <Line
              type="monotone"
              dataKey="you"
              name="You"
              stroke="var(--color-blue)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "var(--color-blue)" }}
            />
            <Line
              type="monotone"
              dataKey="them"
              name="Them"
              stroke="var(--color-teal)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "var(--color-teal)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
