"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { GeneticIteration } from "../types/response-types";

export const description = "A linear area chart";

const chartConfig = {
  avg: {
    label: "AvgValue",
    color: "hsl(var(--chart-1))",
  },
  min: {
    label: "MinValue",
    color: "hsl(var(--chart-2))",
  },
  index: {
    label: "Iteration",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type GeneticPlotProps = {
  chartData: GeneticIteration[];
};

export function GeneticPlot({ chartData }: GeneticPlotProps) {
  const chartDataWithIndex = chartData.map((item, index) => ({
    ...item,
    index,
  }));

  return (
    <Card className="p-0 bg-white border-2 border-black rounded-lg shadow-black shadow-light dark:shadow-dark">
      <CardHeader className="text-center">
        <CardTitle className="font-poppinsMedium text-md">
          Objective Value Graph
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={chartDataWithIndex}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="index" tickLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <YAxis dataKey="AvgValue" />
            <Line
              dataKey="AvgValue"
              type="linear"
              stroke="var(--color-avg)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="MinValue"
              type="linear"
              stroke="var(--color-min)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              dataKey="index"
              type="linear"
              stroke="var(--color-index)"
              strokeWidth={2}
              dot={false}
              strokeOpacity={0}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
