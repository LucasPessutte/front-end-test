"use client";

import { Pie, PieChart } from "recharts";
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

const chartConfig = {
  value: {
    label: "Quantidade",
  },
  Calmo: {
    label: "Calmo",
    color: "var(--chart-1)",
  },
  Carinhoso: {
    label: "Carinhoso",
    color: "var(--chart-2)",
  },
  Agressivo: {
    label: "Agressivo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function DogsTemperamentChart() {
  const page1 = useDogs({ page: 1, limit: 100 });
  const page2 = useDogs({ page: 2, limit: 100 });

  if (page1.isLoading || page2.isLoading) {
    return <Spinner />;
  }

  if (page1.isError || page2.isError || !page1.data || !page2.data) {
    return <p>Erro ao carregar dados</p>;
  }

  const dogs = [...page1.data.data, ...page2.data.data];

  const chartData = [
    {
      name: "Calmo",
      value: dogs.filter((dog) => dog.temperament === "CALM").length,
      fill: "var(--chart-1)",
    },
    {
      name: "Carinhoso",
      value: dogs.filter((dog) => dog.temperament === "AFFECTIONATE").length,
      fill: "var(--chart-2)",
    },
    {
      name: "Agressivo",
      value: dogs.filter((dog) => dog.temperament === "AGGRESSIVE").length,
      fill: "var(--chart-3)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição por Temperamento</CardTitle>
        <CardDescription>Baseado em {dogs.length} cachorros</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-4">
        <ChartContainer
          config={chartConfig}
          className="w-96 aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name" label />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
