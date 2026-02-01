import { useState } from "react";
import DogsFilters from "@/components/sections/dogs-filters";
import DogsTable from "@/components/sections/dogs-table";

export default function DogsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [filters, setFilters] = useState<{
    breed?: string;
    sex?: string;
    temperament?: string;
    age?: number;
  }>({});

  return (
    <section className="p-4 w">
      <DogsFilters
        filters={filters}
        onChange={(newFilters) => {
          setPage(1);
          setFilters(newFilters);
        }}
        onClear={() => {
          setPage(1);
          setFilters({});
        }}
      />

      <DogsTable
        page={page}
        limit={limit}
        filters={filters}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setPage(1);
          setLimit(newLimit);
        }}
      />
    </section>
  );
}
