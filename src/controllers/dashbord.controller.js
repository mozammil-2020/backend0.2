import mongoose from "mongoose";

import { video } from "../models/video.model.js";

import { subscription } from "../models/subscription.model.js";

import { like } from "../models/like.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const getchannelstatus = asyncHandler(async(req, res) => {

// TODO: get the channel status like total video views, total subcription,total videos, total like etc.
           
})

const getchannelvideos = asyncHandler(async(req, res) => {

// TODO: get all videos update by the channel   
})

export {
         getchannelstatus,
         getchannelvideos
       }

       