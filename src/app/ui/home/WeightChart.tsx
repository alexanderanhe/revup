"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/ui/utils/shadcn-ui/chart"

import { WeightData } from "@/lib/definitions";

export default function WeightChart({ data: chartData, translate }: { data: WeightData[] | null, translate?: {[key: string]: string} }) {
  const chartConfig = {
    weight: {
      label: translate?.title ?? "-",
      color: "oklch(var(--a))",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full overflow-y-auto space-y-1 py-2">
      <div className="font-semibold">{ translate?.title ?? "-" }</div>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData ?? []}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.toLocaleDateString()}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Line
            dataKey="weight"
            type="natural"
            stroke="var(--color-weight)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-weight)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </div>
  )
}
