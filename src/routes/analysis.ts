import { Router } from "express";
import { getSortedAttacks } from "../controllers/analysis";

const router = Router();

router.get('/deadliest-attack-types/', getSortedAttacks);

router.get('/', ()=>{});

router.get('/', ()=>{});

export default router;