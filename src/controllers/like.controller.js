import mongoose from "mongoose";

import { like } from "../models/like.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const togglevideolike = asyncHandler(async(req, res) => {

const { videoId } = req.params

// TODO: toggle like on video

})

const togglecommentlike = asyncHandler(async(req, res) => {

const { commentId } = req.params

// TODO: toggle like on comment
})

const toggletweetlike = asyncHandler(async(req, res) => {

const { tweet } = req.params

// TODO: toggle like on tweet
})

const getlikedvideos = asyncHandler(async(req, res) => {

// TODO: get all like videos
})

export {
         togglecommentlike,
         toggletweetlike,
         togglevideolike,
         getlikedvideos
}