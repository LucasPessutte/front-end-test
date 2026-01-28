import { PrismaClient } from "@prisma/client";
import {
  CreateDogDTO,
  UpdateDogDTO,
  DogFilters,
  PaginationParams,
} from "../types/dog.types";

const prisma = new PrismaClient();

export class DogRepository {
  async findAllDogs(filters: DogFilters, pagination: PaginationParams) {
    const where: any = {
      deleted_at: null,
    };

    // Apply age filter by calculating birth date range
    if (filters.age !== undefined) {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setFullYear(currentDate.getFullYear() - filters.age - 1);
      const endDate = new Date(currentDate);
      endDate.setFullYear(currentDate.getFullYear() - filters.age);

      where.birth_date = {
        gte: startDate,
        lte: endDate,
      };
    }

    // Apply exact match filters
    if (filters.breed) {
      where.breed = filters.breed;
    }

    if (filters.sex) {
      where.sex = filters.sex;
    }

    if (filters.temperament) {
      where.temperament = filters.temperament;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const dogs = await prisma.dog.findMany({
      where,
      skip,
      take: pagination.limit,
      orderBy: {
        created_at: "desc",
      },
    });

    return dogs;
  }

  async countDogs(filters: DogFilters): Promise<number> {
    const where: any = {
      deleted_at: null,
    };

    // Apply age filter
    if (filters.age !== undefined) {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setFullYear(currentDate.getFullYear() - filters.age - 1);
      const endDate = new Date(currentDate);
      endDate.setFullYear(currentDate.getFullYear() - filters.age);

      where.birth_date = {
        gte: startDate,
        lte: endDate,
      };
    }

    // Apply exact match filters
    if (filters.breed) {
      where.breed = filters.breed;
    }

    if (filters.sex) {
      where.sex = filters.sex;
    }

    if (filters.temperament) {
      where.temperament = filters.temperament;
    }

    return await prisma.dog.count({ where });
  }

  async findDogById(id: string) {
    return await prisma.dog.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
  }

  async createDog(data: CreateDogDTO) {
    return await prisma.dog.create({
      data: {
        name: data.name,
        birth_date: data.birth_date,
        breed: data.breed,
        temperament: data.temperament,
        sex: data.sex,
      },
    });
  }

  async updateDog(id: string, data: UpdateDogDTO) {
    return await prisma.dog.update({
      where: { id },
      data,
    });
  }

  async deleteDog(id: string) {
    return await prisma.dog.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async disconnect() {
    await prisma.$disconnect();
  }
}

export const dogRepository = new DogRepository();
