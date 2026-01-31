// src/pages/DogsPage.tsx
import { useState } from "react";
import DogsFilters from "@/components/sections/dogs-filters";
import DogsTable from "@/components/sections/dogs-table";

export default function App() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [filters, setFilters] = useState<{
    breed?: string;
    sex?: string;
    temperament?: string;
  }>({});

  return (
    <>
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
      />
    </>
  );
}
