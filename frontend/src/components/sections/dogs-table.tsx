import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Spinner } from "../ui/spinner";
import { calculateAge } from "@/utils/calculateAge";
import { useDogs } from "@/hooks/useDogs";
import DogsPagination from "@/components/sections/dogs-pagination";
import { formatBreed, formatSex, formatTemperament } from "@/utils/Formatters";

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
  onLimitChange: (limit: number) => void;
};

export default function DogsTable({
  page,
  limit,
  filters,
  onPageChange,
  onLimitChange,
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
    <section className="mt-6">
      <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase text-gray-600">
                Nome
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-gray-600">
                Idade
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-gray-600">
                Raça
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-gray-600">
                Sexo
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase text-gray-600">
                Temperamento
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dogs.map((dog) => (
              <TableRow
                key={dog.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium text-gray-900 py-4">
                  {dog.name}
                </TableCell>
                <TableCell className="text-gray-600">
                  {calculateAge(dog.birth_date)} ano(s)
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatBreed(dog.breed)}
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatSex(dog.sex)}
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatTemperament(dog.temperament)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {dogs.length === 0 && (
        <span className="block text-center mt-4 text-gray-500">
          Nenhum cachorro encontrado com os filtros selecionados
        </span>
      )}

      <DogsPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </section>
  );
}
