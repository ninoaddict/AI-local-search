"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ValuePlotProps = {
  chartData: Iteration[];
};

export function ValuePlot({ chartData }: ValuePlotProps) {
  const chartDataWithIndex = chartData.map((item, index) => ({
    ...item,
    index,
  }));

  return (
    <Card className="p-0 bg-white border-2 border-black rounded-lg shadow-black shadow-light dark:shadow-dark">
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="p-0">
          <AreaChart
            className="py-1"
            data={chartDataWithIndex}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis dataKey="Value" />
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
            <Area
              dataKey="Value"
              type="linear"
              fill="var(--color-value)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}