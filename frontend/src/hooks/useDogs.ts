// src/hooks/useDogs.ts
import axios from "axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export type Dog = {
  id: string;
  name: string;
  birth_date: string;
  breed: string;
  temperament: string;
  sex: string;
};

type DogsResponse = {
  success: boolean;
  data: Dog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type FetchDogsParams = {
  page: number;
  limit: number;
  breed?: string;
  sex?: string;
  temperament?: string;
};

const fetchDogs = async (params: FetchDogsParams): Promise<DogsResponse> => {
  const response = await axios.get("http://localhost:3000/api/dogs", {
    params,
  });
  return response.data;
};

export function useDogs(params: FetchDogsParams) {
  return useQuery({
    queryKey: ["dogs", params],
    queryFn: () => fetchDogs(params),
    placeholderData: keepPreviousData,
  });
}
