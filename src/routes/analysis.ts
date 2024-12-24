import { Router } from "express";
import { addNewAttack, getAttacksTypesByYear, getHighestCasualtyCity, getSortedAttacks } from "../controllers/analysis";

const router = Router();

router.get('/deadliest-attack-types/', getSortedAttacks);

router.get('/highest-casualty-regions/', getHighestCasualtyCity);

router.get('/incident-trends/', getAttacksTypesByYear);

router.post('/add-new-attack/', addNewAttack);

export default router;