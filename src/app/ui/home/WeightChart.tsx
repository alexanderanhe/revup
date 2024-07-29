"use client"

import { Area, CartesianGrid, ComposedChart, LabelList, Line, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/ui/utils/shadcn-ui/chart"

import { WeightData } from "@/lib/definitions";
import { cn } from "@/lib/utils";

export default function WeightChart({ data: chartData, translate }: { data: WeightData[] | null, translate?: {[key: string]: string} }) {
  if (!chartData) return null;

  const chartConfig = {
    weight: {
      label: translate?.weight ?? "-",
      color: "oklch(var(--p))",
    },
    weightLine: {
      label: translate?.weight ?? "-",
      color: "oklch(var(--p))",
    },
  } satisfies ChartConfig;
  const lastWeight = chartData?.at(-1)?.weight ?? 0;
  const totalLoss = chartData[0]?.weight - lastWeight;
  const lastLoss = (chartData.at(-2)?.weight ?? 0) - lastWeight;
  const data = [...chartData, { date: new Date(), weight: lastWeight }]
    .map((d) => ({ ...d, weightLine: d.weight }));

  return (
    <div className="w-full overflow-y-auto space-y-1 py-2">
      <div className="font-semibold">{ translate?.title ?? "-" }</div>
      <div className={cn(
        "grid justify-between",
        chartData.length > 1 && "grid-cols-3",
      )}>
        <div>{ translate?.currWeight }: { chartData.at(-1)?.weight } kg</div>
        {chartData.length > 1 && (
          <div className="tooltip" data-tip={translate?.totalLossTooltip}>
            <span className={cn(totalLoss>0 ? "text-success" : "text-error")}>{ totalLoss }</span>
          </div>
        )}
        {chartData.length > 1 && (
          <div className="tooltip" data-tip={translate?.lastLossTooltip}>
            <span className={cn(lastLoss>0 ? "text-success" : "text-error")}>{ lastLoss }</span>
          </div>
        )}
      </div>
      <ChartContainer config={chartConfig}>
        <ComposedChart
          accessibilityLayer
          data={data}
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
            <Line
              dataKey="weightLine"
              type="natural"
              stroke="var(--color-weight)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-weight)",
                stroke: "var(--color-weight)",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}