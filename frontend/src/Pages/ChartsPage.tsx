import { DogsAgeChart } from "@/components/ui/DogsAgeChart";
import { DogsSexChart } from "@/components/ui/DogsSexChart";
import { DogsTemperamentChart } from "@/components/ui/DogsTemperamentChart";

export default function ChartsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DogsSexChart />
          <DogsTemperamentChart />
        </div>

        <DogsAgeChart />
      </div>
    </section>
  );
}
