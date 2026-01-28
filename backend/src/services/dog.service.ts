import { dogRepository } from "../repositories/dog.repository";
import {
  CreateDogDTO,
  UpdateDogDTO,
  DogFilters,
  PaginationParams,
  PaginatedResponse,
  Dog,
} from "../types/dog.types";

export class DogService {
  async getAllDogs(
    filters: DogFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<Dog>> {
    const [dogs, totalCount] = await Promise.all([
      dogRepository.findAllDogs(filters, pagination),
      dogRepository.countDogs(filters),
    ]);

    const totalPages = Math.ceil(totalCount / pagination.limit);

    return {
      data: dogs as Dog[],
      pagination: {
        total: totalCount,
        page: pagination.page,
        limit: pagination.limit,
        totalPages,
      },
    };
  }

  async getDogById(id: string): Promise<Dog> {
    const dog = await dogRepository.findDogById(id);

    if (!dog) {
      throw new Error("Dog not found");
    }

    return dog as Dog;
  }

  async createDog(data: CreateDogDTO): Promise<Dog> {
    const createdDog = await dogRepository.createDog(data);
    return createdDog as Dog;
  }

  async updateDog(id: string, data: UpdateDogDTO): Promise<Dog> {
    // Check if dog exists
    await this.getDogById(id);

    const updatedDog = await dogRepository.updateDog(id, data);
    return updatedDog as Dog;
  }

  async deleteDog(id: string): Promise<void> {
    // Check if dog exists
    await this.getDogById(id);

    await dogRepository.deleteDog(id);
  }
}

export const dogService = new DogService();
