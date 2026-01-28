import { DogBreed } from "../enums/breed.enum";
import { DogTemperament } from "../enums/temperament.enum";
import { DogSex } from "../enums/sex.enum";

export interface Dog {
  id: string;
  name: string;
  birth_date: Date;
  breed: DogBreed;
  temperament: DogTemperament;
  sex: DogSex;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface CreateDogDTO {
  name: string;
  birth_date: Date;
  breed: DogBreed;
  temperament: DogTemperament;
  sex: DogSex;
}

export interface UpdateDogDTO {
  name?: string;
  birth_date?: Date;
  breed?: DogBreed;
  temperament?: DogTemperament;
  sex?: DogSex;
}

export interface DogFilters {
  age?: number;
  breed?: DogBreed;
  sex?: DogSex;
  temperament?: DogTemperament;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
