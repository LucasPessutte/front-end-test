// src/components/Sections/DogsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { useDogs } from "@/hooks/useDogs";
import { calculateAge } from "@/utils/calculateAge";
import { Spinner } from "@/components/ui/spinner";
import DogsPagination from "./DogsPagination";

type Dog = {
  id: string;
  name: string;
  birth_date: string;
  breed: string;
  temperament: string;
  sex: string;
};

export default function DogsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useDogs(page, limit);

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

  const dogs: Dog[] = data.data;
  const { page: currentPage, totalPages } = data.pagination;

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <Table className="bg-white rounded-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-4">Nome</TableHead>
            <TableHead className="px-6 py-4">Idade</TableHead>
            <TableHead className="px-6 py-4">Raça</TableHead>
            <TableHead className="px-6 py-4">Sexo</TableHead>
            <TableHead className="px-6 py-4">Temperamento</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dogs.map((dog) => (
            <TableRow key={dog.id}>
              <TableCell className="px-6 py-4 font-bold">{dog.name}</TableCell>
              <TableCell className="px-6 py-4">
                {calculateAge(dog.birth_date)} ano(s)
              </TableCell>
              <TableCell className="px-6 py-4 lowercase">{dog.breed}</TableCell>
              <TableCell className="px-6 py-4 lowercase">{dog.sex}</TableCell>
              <TableCell className="px-6 py-4 lowercase">
                {dog.temperament}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DogsPagination
        page={currentPage}
        totalPages={totalPages}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </section>
  );
}
