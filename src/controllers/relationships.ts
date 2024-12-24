import { NextFunction, Request, Response } from "express";
import { getHighestCasualtyCitiesOfOrganizationFunc, getOrganizationsByYearFunc, getSortedOrganizationsInArea } from "../services/relationships";
import { get } from "mongoose";

export const getOrganizationsInArea = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await getSortedOrganizationsInArea(req.params.area)
      res.json(data)
    } catch (err) {
      console.error("[server] Can't get sorted organizations in area", err);
      next(err);
    }
};

export const getOrganizationsByYear = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await getOrganizationsByYearFunc(req.params.year)
      res.json(data)
    } catch (err) {
      console.error("[server] Can't get Organizations By Year", err);
      next(err);
    }
};

export const getHighestCasualtyCitiesOfOrganization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await getHighestCasualtyCitiesOfOrganizationFunc(req.params.organization)
      res.json(data)
    } catch (err) {
      console.error("[server] Can't get Highest Casualty Cities Of Organization", err);
      next(err);
    }
};