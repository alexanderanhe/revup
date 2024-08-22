"use client"

import { Area, CartesianGrid, ComposedChart, LabelList, Line, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/ui/utils/shadcn-ui/chart"

import { Measurements, WeightData } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import MeasurementsDrawer from "../../utils/MeasurementsDrawer";
import { PlusCircleIcon } from "lucide-react";

export default function MyWeight({ data: chartData, translate }: { data: WeightData[] | null, translate?: {[key: string]: string} }) {
  if (!chartData) return null;
  const weight_unit = chartData[0]?.weight_unit ?? "kg";

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

  const measurements = chartData.map(({ date, weight }) => ({
    created_at: new Date(date),
    weight,
  })) as Measurements[];

  return (
    <div className="w-full space-y-1 py-2">
      <div className="flex font-semibold">
        <span className="grow">{ translate?.title ?? "-" }</span>
        <MeasurementsDrawer className="btn btn-xs btn-link btn-square" measurements={measurements}>
          <PlusCircleIcon className="size-4" />
        </MeasurementsDrawer>
      </div>
      <div className={cn(
        "grid",
        chartData.length > 1 && "grid-cols-[auto_1fr]",
      )}>
        <div>{ translate?.currWeight }: { chartData.at(-1)?.weight } { weight_unit }</div>
        <div className="grid grid-cols-2">
          {chartData.length > 1 && (
            <div className="tooltip tooltip-top" data-tip={translate?.totalLossTooltip}>
              <span className={cn("font-medium underline decoration-dotted", totalLoss > 0 ? "text-success" : totalLoss < 0 ? "text-error" : "text-neutral")}>{ totalLoss } { weight_unit }</span>
            </div>
          )}
          {chartData.length > 1 && (
            <div className="tooltip tooltip-top before:left-auto before:right-0 before:translate-x-0" data-tip={translate?.lastLossTooltip}>
              <span className={cn("font-medium underline decoration-dotted", lastLoss > 0 ? "text-success" : lastLoss < 0 ? "text-error": "text-neutral")}>{ lastLoss } { weight_unit }</span>
            </div>
          )}
        </div>
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
            tickFormatter={(value: Date) => value.toLocaleDateString()}
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