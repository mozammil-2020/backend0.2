import { Router } from "express";

import {
        addComment,
        deleteComment,
        getvideoComment,
        updateComment,
} from "../controllers/comments.controller.js"

import { verifyJWT } from "../middlewares/auth.meddleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/videoId").get(getvideoComment).post(addComment);

router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router