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
  Macho: {
    label: "Macho",
    color: "var(--chart-1)",
  },
  Fêmea: {
    label: "Fêmea",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DogsSexChart() {
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
      name: "Macho",
      value: dogs.filter((dog) => dog.sex === "MALE").length,
      fill: "var(--chart-1)",
    },
    {
      name: "Fêmea",
      value: dogs.filter((dog) => dog.sex === "FEMALE").length,
      fill: "var(--chart-2)",
    },
  ];

  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição por Sexo</CardTitle>
        <CardDescription>Baseado em {dogs.length} cachorros</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-4  ">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] w-full"
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
