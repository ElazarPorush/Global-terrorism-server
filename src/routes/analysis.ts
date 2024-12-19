import { Router } from "express";
import { getAttacksTypesByYear, getHighestCasualtyCity, getSortedAttacks } from "../controllers/analysis";

const router = Router();

router.get('/deadliest-attack-types/', getSortedAttacks);

router.get('/highest-casualty-regions/', getHighestCasualtyCity);

router.get('/incident-trends/', getAttacksTypesByYear);

export default router;