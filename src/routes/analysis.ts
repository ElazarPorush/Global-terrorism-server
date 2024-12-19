import { Router } from "express";
import { getHighestCasualtyCity, getSortedAttacks } from "../controllers/analysis";

const router = Router();

router.get('/deadliest-attack-types/', getSortedAttacks);

router.get('/highest-casualty-regions/', getHighestCasualtyCity);

router.get('/', ()=>{});

export default router;