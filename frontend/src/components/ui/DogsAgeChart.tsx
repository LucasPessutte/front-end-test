"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useDogs } from "@/hooks/useDogs";
import { Spinner } from "@/components/ui/spinner";
import { calculateAge } from "@/utils/calculateAge";

const chartConfig = {
  count: {
    label: "Quantidade",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DogsAgeChart() {
  const page1 = useDogs({ page: 1, limit: 100 });
  const page2 = useDogs({ page: 2, limit: 100 });

  if (page1.isLoading || page2.isLoading) {
    return <Spinner />;
  }

  if (page1.isError || page2.isError || !page1.data || !page2.data) {
    return <p>Erro ao carregar dados</p>;
  }

  const dogs = [...page1.data.data, ...page2.data.data];

  const ageMap: Record<number, number> = {};

  dogs.forEach((dog) => {
    const age = calculateAge(dog.birth_date);
    ageMap[age] = (ageMap[age] || 0) + 1;
  });

  const chartData = Object.entries(ageMap)
    .map(([age, count]) => ({
      age: Number(age),
      count,
    }))
    .sort((a, b) => a.age - b.age);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Idade</CardTitle>
        <CardDescription>Baseado em {dogs.length} cachorros</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="age"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value} ano(s)`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => `${value} ano(s)`}
                />
              }
            />

            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={{ fill: "var(--color-count)" }}
              activeDot={{ r: 6 }}
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
      </CardContent>
    </Card>
  );
}
