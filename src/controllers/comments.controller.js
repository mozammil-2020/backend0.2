import mongoose from "mongoose";

import { comment } from "../models/user.model.js"

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const getvideocomments = asyncHandler(async( req, res) => {

// TODO: get all comments for a video

const { videoID } = req.params

const { page = 1, limit= 10 } = req.query
})

const addcomment = asyncHandler(async(req, res) => {

// TODO: add comment for video  
})

const updatecomment = asyncHandler(async(req, res) => {

// TODO: update a comment  
})

const deletecomment = asyncHandler(async(req, res) => {

// TODO: delete a comment
})

export {
         getvideocomments,
         addcomment,
         updatecomment,
         deletecomment
       }


       