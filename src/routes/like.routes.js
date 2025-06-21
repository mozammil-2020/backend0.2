import { Router } from "express";

import {
        getlikedvideos,
        togglecommentlike,
        togglevideolike,
        toggletweetlike,
} from "../controllers/like.controller.js"

import { verifyJWT } from "../middlewares/auth.meddleware.js";

const router = Router();

router.use(verifyJWT) // Apply verify JWT middleware to allrotes in this file

router.route("/toggle/v/:videoId").post(togglevideolike);

router.route("/toggle/c/:commentId").post(togglecommentlike);

router.route("/toggle/t/:tweetId").post(toggletweetlike);

router.route("/videos").get(getlikedvideos);

export default router
