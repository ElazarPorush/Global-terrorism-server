import { NextFunction, Request, Response } from "express";
import { getAttacksTypeByYear, getHighestCasualtyCities, getSortedAttacksByType } from "../services/analysis";
import { YearDTO } from "../types/dto/yearDto";

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

export const getHighestCasualtyCity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await getHighestCasualtyCities()
      res.json(data)
    } catch (err) {
      console.error("[server] Can't get highest casualty cities", err);
      next(err);
    }
};

export const getAttacksTypesByYear = async (
    req: Request<any, any, any, YearDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await getAttacksTypeByYear(req.query)
      res.json(data)
    } catch (err) {
      console.error("[server] Can't get attacks types by year", err);
      next(err);
    }
};