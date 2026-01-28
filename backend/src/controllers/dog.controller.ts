import { Request, Response } from "express";
import { dogService } from "../services/dog.service";
import {
  createDogSchema,
  updateDogSchema,
  dogFiltersSchema,
  paginationSchema,
  uuidSchema,
} from "../validations/dog.validation";
import { ZodError } from "zod";

export class DogController {
  async getAllDogsController(req: Request, res: Response) {
    try {
      const filters = dogFiltersSchema.parse(req.query);
      const pagination = paginationSchema.parse(req.query);

      const result = await dogService.getAllDogs(filters, pagination);

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getDogByIdController(req: Request, res: Response) {
    try {
      const id = uuidSchema.parse(req.params.id);

      const dog = await dogService.getDogById(id);

      return res.status(200).json({
        success: true,
        data: dog,
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async createDogController(req: Request, res: Response) {
    try {
      const validatedData = createDogSchema.parse(req.body);

      const createdDog = await dogService.createDog(validatedData);

      return res.status(201).json({
        success: true,
        data: createdDog,
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async updateDogController(req: Request, res: Response) {
    try {
      const id = uuidSchema.parse(req.params.id);
      const validatedData = updateDogSchema.parse(req.body);

      const updatedDog = await dogService.updateDog(id, validatedData);

      return res.status(200).json({
        success: true,
        data: updatedDog,
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async deleteDogController(req: Request, res: Response) {
    try {
      const id = uuidSchema.parse(req.params.id);

      await dogService.deleteDog(id);

      return res.status(200).json({
        success: true,
        message: "Dog deleted successfully",
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Validation error",
          details: error.errors,
        },
      });
    }

    if (error instanceof Error) {
      if (error.message === "Dog not found") {
        return res.status(404).json({
          success: false,
          error: {
            message: error.message,
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        },
      });
    }

    return res.status(500).json({
      success: false,
      error: {
        message: "Internal server error",
      },
    });
  }
}

export const dogController = new DogController();
