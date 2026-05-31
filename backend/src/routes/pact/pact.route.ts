import { Router } from "express";
import {
  createPact,
  getPacts,
  getPactById,
  updatePact,
  deletePact,
} from "../../controllers/pact/pactController";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createPact);
router.get("/", authMiddleware, getPacts);
router.get("/:id", authMiddleware, getPactById);
router.put("/:id", authMiddleware, updatePact);
router.delete("/:id", authMiddleware, deletePact);

export default router;
