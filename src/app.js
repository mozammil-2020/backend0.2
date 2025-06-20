import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  orgin:process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));

app.use(express.static("public"));

app.use (cookieParser());

// routes import

import userRouter from "./routes/user.routs.js"

import healthcheckRouter from "./routes/healthcheck.routes.js"

import tweetRouter from "./routes/tweet.routes.js"

import subscriptionRoutes from "./routes/subscription.routes.js"

import likeRouter from "./routes/like.routes.js"

import playlistRouter from "./routes/playlist.routes.js"

import commentsRouter from "./routes/comments.routes.js"

import dashboardRouter from "./routes/dashbord.routes.js"

import videoRouter from "./routes/video.routes.js"

// routes decleration

app.use("/api/v1/healthcheck", healthcheckRouter)

app.use("/api/v1/users", userRouter)

app.use("/api/v1/tweets", tweetRouter)

app.use("/api/v1/subscription", subscriptionRoutes)

app.use("/api/v1/videos", videoRouter)

app.use("/api/v1/comments", commentsRouter)

app.use("/api/v1/like", likeRouter)

app.use("/api/v1/playlist", playlistRouter)

app.use("/api/v1/dashboard", dashboardRouter)

export { app }