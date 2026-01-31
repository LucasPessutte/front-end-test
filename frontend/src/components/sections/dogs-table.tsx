// src/components/Sections/DogsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { calculateAge } from "@/utils/calculateAge";
import { useDogs } from "@/hooks/useDogs";

type Filters = {
  breed?: string;
  sex?: string;
  temperament?: string;
};

type Props = {
  page: number;
  limit: number;
  filters: Filters;
  onPageChange: (page: number) => void;
};

export default function DogsTable({
  page,
  limit,
  filters,
  onPageChange,
}: Props) {
  const { data, isLoading, isError } = useDogs({ page, limit, ...filters });

  if (isLoading) {
    return <Spinner className="mx-auto mt-10" />;
  }

  if (isError || !data) {
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar os dados.
      </p>
    );
  }

  const { data: dogs, pagination } = data;

  return (
    <section className="max-w-7xl mx-auto mt-6">
      <Table className="bg-white rounded-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Raça</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Temperamento</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dogs.map((dog) => (
            <TableRow key={dog.id}>
              <TableCell className="font-medium">{dog.name}</TableCell>
              <TableCell>{calculateAge(dog.birth_date)} ano(s)</TableCell>
              <TableCell>{dog.breed}</TableCell>
              <TableCell>{dog.sex}</TableCell>
              <TableCell>{dog.temperament}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          disabled={pagination.page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>

        <span className="text-sm">
          Página {pagination.page} de {pagination.totalPages}
        </span>

        <Button
          variant="outline"
          disabled={pagination.page === pagination.totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Próxima
        </Button>
      </div>
    </section>
  );
}
