import { NextFunction, Request, Response } from "express";
import { getSortedOrganizationsInArea } from "../services/relationships";

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