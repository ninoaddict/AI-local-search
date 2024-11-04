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
  index: {
    label: "Iteration",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type ValuePlotProps = {
  chartData: Iteration[];
  description?: string;
  initialValue: number;
};

export function ValuePlot({
  initialValue,
  chartData,
  description,
}: ValuePlotProps) {
  const chartDataWithIndex = [
    { Value: initialValue, index: 0 },
    ...chartData.map((item, index) => ({
      ...item,
      index: index + 1,
    })),
  ];

  {
    console.log(chartData.length);
  }

  return (
    <Card className="p-0 bg-white border-2 border-black rounded-lg shadow-black shadow-light dark:shadow-dark">
      <CardHeader className="text-center">
        <CardTitle className="font-poppinsMedium">
          Objective Value Graph
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="p-0">
          <AreaChart className="py-1" data={chartDataWithIndex}>
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

            <Area
              dataKey="index"
              stroke="var(--color-index)"
              type="linear"
              dot={false}
              fillOpacity={0}
              strokeOpacity={0}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
