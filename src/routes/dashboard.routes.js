import { Router } from "express";

import {
        getchannelstats,
        getchannelvideos,
} from "../controllers/dashbord.controller.js"

import { verifyJWT } from "../middlewares/auth.meddleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/stats").get(getchannelstats)

router.route("/video").get(getchannelvideos)

export default router