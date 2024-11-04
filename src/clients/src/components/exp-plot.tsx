"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Iteration } from "../types/response-types";
export const description = "A linear area chart";

const chartConfig = {
  Exp: {
    label: "Exp",
    color: "hsl(var(--chart-1))",
  },
  index: {
    label: "Iteration",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type ValuePlotProps = {
  chartData: Iteration[];
  description?: string;
};

export function ExpPlot({ chartData }: ValuePlotProps) {
  const chartDataWithIndex = [
    { Exp: 1, index: 0 },
    ...chartData.map((item, index) => ({
      ...item,
      index: index + 1,
    })),
  ];

  return (
    <Card className="p-0 bg-white border-2 border-black rounded-lg shadow-black shadow-light dark:shadow-dark">
      <CardHeader className="text-center">
        <CardTitle className="font-poppinsMedium">Exp Value Graph</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="p-0">
          <LineChart className="py-1" data={chartDataWithIndex}>
            <CartesianGrid vertical={false} />
            <YAxis dataKey="Exp" />
            <XAxis
              dataKey="index"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Line
              dataKey="Exp"
              type="linear"
              fill="var(--color-exp)"
              fillOpacity={0.4}
              stroke="var(--color-exp)"
            />

            <Line
              dataKey="index"
              stroke="var(--color-index)"
              type="linear"
              dot={false}
              fillOpacity={0}
              strokeOpacity={0}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
