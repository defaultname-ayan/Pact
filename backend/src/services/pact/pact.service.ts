import * as z from "zod";
import { PactStatus, type Pact } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";

export const transitionSchema = z.object({
  pactId: z.number(),
  newStatus: z.enum(["ACTIVE", "DECLINED", "COMPLETED", "FAILED"]),
});

type TransitionStatus = z.infer<typeof transitionSchema>["newStatus"];

const allowedTransitions: Record<PactStatus, readonly PactStatus[]> = {
  PENDING: [PactStatus.ACTIVE, PactStatus.DECLINED],

  ACTIVE: [PactStatus.COMPLETED, PactStatus.FAILED],

  DECLINED: [],

  COMPLETED: [],

  FAILED: [],
};

function validateTransition(pact: Pact, newStatus: PactStatus) {
  const validTransitions = allowedTransitions[pact.status];

  if (!validTransitions.includes(newStatus)) {
    throw new Error(`Cannot transition from ${pact.status} to ${newStatus}`);
  }
}

function validateAuthorization(
  pact: Pact,
  newStatus: PactStatus,
  actorId: number,
) {
  // Partner actions

  if (newStatus === PactStatus.ACTIVE && pact.partnerId !== actorId) {
    throw new Error("Only partner can accept pact");
  }

  if (newStatus === PactStatus.DECLINED && pact.partnerId !== actorId) {
    throw new Error("Only partner can decline pact");
  }

  // Creator actions

  if (
    [PactStatus.COMPLETED, PactStatus.FAILED].includes(newStatus) &&
    pact.creatorId !== actorId
  ) {
    throw new Error("Only creator can finalize pact");
  }
}

export async function transitionPactService(
  pactId: number,
  newStatus: TransitionStatus,
  actorId: number,
) {
  const pact = await prisma.pact.findUnique({
    where: {
      id: pactId,
    },
  });

  if (!pact) {
    throw new Error("Pact not found");
  }

  validateTransition(pact, newStatus as PactStatus);

  validateAuthorization(pact, newStatus as PactStatus, actorId);

  const updatedPact = await prisma.pact.update({
    where: {
      id: pactId,
    },

    data: {
      status: newStatus as PactStatus,

      ...(newStatus === PactStatus.ACTIVE && {
        activatedAt: new Date(),
      }),

      ...(newStatus === PactStatus.COMPLETED && {
        completedAt: new Date(),
      }),

      ...(newStatus === PactStatus.FAILED && {
        failedAt: new Date(),
      }),
    },
  });

  return updatedPact;
}
