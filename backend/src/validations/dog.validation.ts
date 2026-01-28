import { z } from "zod";
import { DogBreed } from "../enums/breed.enum";
import { DogTemperament } from "../enums/temperament.enum";
import { DogSex } from "../enums/sex.enum";

export const createDogSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  birth_date: z.coerce
    .date()
    .refine((date) => date < new Date(), "Birth date must be in the past"),
  breed: z.nativeEnum(DogBreed, {
    errorMap: () => ({ message: "Invalid breed" }),
  }),
  temperament: z.nativeEnum(DogTemperament, {
    errorMap: () => ({ message: "Invalid temperament" }),
  }),
  sex: z.nativeEnum(DogSex, {
    errorMap: () => ({ message: "Invalid sex" }),
  }),
});

export const updateDogSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  birth_date: z.coerce
    .date()
    .refine((date) => date < new Date(), "Birth date must be in the past")
    .optional(),
  breed: z.nativeEnum(DogBreed).optional(),
  temperament: z.nativeEnum(DogTemperament).optional(),
  sex: z.nativeEnum(DogSex).optional(),
});

export const dogFiltersSchema = z.object({
  age: z.coerce.number().int().min(0).max(30).optional(),
  breed: z.nativeEnum(DogBreed).optional(),
  sex: z.nativeEnum(DogSex).optional(),
  temperament: z.nativeEnum(DogTemperament).optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const uuidSchema = z.string().uuid("Invalid UUID format");
