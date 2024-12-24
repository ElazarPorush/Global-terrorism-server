import { Router } from "express";
import { getHighestCasualtyCitiesOfOrganization, getOrganizationsByYear, getOrganizationsInArea } from "../controllers/relationships";

const router = Router();

router.get('/top-groups/:area', getOrganizationsInArea);

router.get('/groups-by-year/:year', getOrganizationsByYear);

router.get('/deadliest-regions/:organization', getHighestCasualtyCitiesOfOrganization);

export default router;