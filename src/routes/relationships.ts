import { Router } from "express";
import { getOrganizationsInArea } from "../controllers/relationships";

const router = Router();

router.get('/top-groups/', getOrganizationsInArea);

router.get('/groups-by-year/', ()=>{});

router.get('/deadliest-regions/', ()=>{});

export default router;