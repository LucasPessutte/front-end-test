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

export default function DogsFilters() {
  return (
    <section className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden p-6 mb-6 mt-10">
      <div className="flex items-center gap-2">
        <Search width={24} />
        <h1 className="text-2xl font-semibold ">Encontre seu Pet</h1>
      </div>
      <Separator className="my-4" />

      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Raça" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Tipo raça</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Macho</SelectItem>
            <SelectItem value="FEMALE">Fêmea</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Temperamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CALM">Calmo</SelectItem>
            <SelectItem value="AFFECTIONATE">Carinhoso</SelectItem>
            <SelectItem value="AGGRESSIVE">Agressivo</SelectItem>
          </SelectContent>
        </Select>

        <Button className="ml-auto">Limpar Filtros</Button>
      </div>
    </section>
  );
}
