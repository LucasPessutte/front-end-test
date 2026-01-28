import { Router } from "express";
import { dogController } from "../controllers/dog.controller";

const router = Router();

// GET /api/dogs - List all dogs with pagination and filters
router.get("/", (req, res) => dogController.getAllDogsController(req, res));

// GET /api/dogs/:id - Get dog by ID
router.get("/:id", (req, res) => dogController.getDogByIdController(req, res));

// POST /api/dogs - Create new dog
router.post("/", (req, res) => dogController.createDogController(req, res));

// PATCH /api/dogs/:id - Update dog
router.patch("/:id", (req, res) => dogController.updateDogController(req, res));

// DELETE /api/dogs/:id - Delete dog (soft delete)
router.delete("/:id", (req, res) =>
  dogController.deleteDogController(req, res),
);

export default router;
