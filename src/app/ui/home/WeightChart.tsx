"use client"

import { Area, AreaChart, CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
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
      label: translate?.weight ?? "-",
      color: "oklch(var(--p))",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full overflow-y-auto space-y-1 py-2">
      <div className="font-semibold">{ translate?.title ?? "-" }</div>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={[...chartData ?? [], { date: new Date(), weight: chartData?.at(-1)?.weight ?? 0 }]}
          margin={{
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
          {/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}
            <defs>
              <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-weight)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-weight)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="weight"
              type="natural"
              fill="url(#fillWeight)"
              fillOpacity={0.4}
              stroke="var(--color-weight)"
              stackId="a"
            />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
