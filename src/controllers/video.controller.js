import mongoose, { isvalidobjectId} from  "mongoose"

import { video } from "../models/video.model.js"

import { user } from "../models/user.model.js"

import { ApiError } from "../utils/ApiError.js"

import { ApiResponse } from "../utils/ApiResponse.js"

import { asyncHandler } from "../utils/asyncHandler.js"

import { uploadoncloudinary } from "../utils/cloudinary.js"

const getAllvideos = asyncHandler(async(req, res) => {

  const { page=1, limit=10, qurey, sortBy,userId} = req.qurey

  //TODO:- get all videos based on qurey, sort, pegination

})

const publisAvideo = asyncHandler(async(req, res) => {

const { title, description } = req.body

// TODO: get video by Id
})

const getvideoById = asyncHandler(async(req, res) => {

const { videoId } = req.params

// TODO: get video by Id

})

const updatevideo = asyncHandler(async(req, res) => {

const { videoId } = req.params

// TODO: update video details like title, description, thumbnail

})

const deletevideo = asyncHandler(async(req,  res)=> {

const { videoId } = req.params

// TODO: delete video

})

const togglepublishstatus = asyncHandler(async(req, res) => {

const { videoId } = req.params

})

export {
         getAllvideos,
         publisAvideo,
         getvideoById,
         updatevideo,
         deletevideo,
         togglepublishstatus
       }

       