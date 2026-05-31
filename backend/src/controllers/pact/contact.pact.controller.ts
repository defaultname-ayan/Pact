import type { AuthRequest } from "../../middleware/authMiddleware.js";
import { transitionPactService } from "../../services/pact/pact.service.js";
import { z } from "zod";
import { Response } from "express";

async function acceptPact(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const pactId = Number(req.params.id);

    await transitionPactService(pactId, "ACTIVE", userId!);

    return res.json({
      message: "Pact accepted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

async function declinePact(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    const pactId = Number(req.params.id);

    await transitionPactService(pactId, "DECLINED", userId!);
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
