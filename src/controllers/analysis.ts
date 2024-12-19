import { NextFunction, Request, Response } from "express";
import { getSortedAttacksByType } from "../services/analysis";

export const getSortedAttacks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await getSortedAttacksByType()
      res.json(data)
    } catch (err) {
      console.error("[server] Can't get sorted attacks", err);
      next(err);
    }
};