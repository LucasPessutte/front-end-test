// src/hooks/useDogs.ts
import axios from "axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

type FetchDogsParams = {
  page: number;
  limit: number;
};

const fetchDogs = async ({ page, limit }: FetchDogsParams) => {
  const response = await axios.get("http://localhost:3000/api/dogs", {
    params: { page, limit },
  });

  return response.data;
};

export function useDogs(page: number, limit: number) {
  return useQuery({
    queryKey: ["dogs", page, limit],
    queryFn: () => fetchDogs({ page, limit }),
    placeholderData: keepPreviousData,
  });
}
