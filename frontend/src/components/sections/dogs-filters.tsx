// src/components/sections/dogs-filters.tsx
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { BREEDS, SEX_OPTIONS, TEMPERAMENTS } from "@/constants/dogs";

type Filters = {
  breed?: string;
  sex?: string;
  temperament?: string;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
};

export default function DogsFilters({ filters, onChange, onClear }: Props) {
  return (
    <section className="max-w-7xl mx-auto bg-white rounded-lg p-6 mb-6 mt-10">
      <div className="flex items-center gap-2">
        <Search width={20} />
        <h1 className="text-2xl font-semibold">Encontre seu Pet</h1>
      </div>

      <Separator className="my-4" />

      <div className="flex gap-4 flex-wrap items-end">
        {/* RAÇA */}
        <Select
          value={filters.breed ?? ""}
          onValueChange={(value) =>
            onChange({
              ...filters,
              breed: value || undefined,
            })
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Raça" />
          </SelectTrigger>
          <SelectContent>
            {BREEDS.map((breed) => (
              <SelectItem key={breed} value={breed}>
                {breed.replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SEXO */}
        <Select
          value={filters.sex ?? ""}
          onValueChange={(value) =>
            onChange({
              ...filters,
              sex: value || undefined,
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent>
            {SEX_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* TEMPERAMENTO */}
        <Select
          value={filters.temperament ?? ""}
          onValueChange={(value) =>
            onChange({
              ...filters,
              temperament: value || undefined,
            })
          }
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Temperamento" />
          </SelectTrigger>
          <SelectContent>
            {TEMPERAMENTS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-auto" onClick={onClear}>
          Limpar filtros
        </Button>
      </div>
    </section>
  );
}
