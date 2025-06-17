import mongoose, {isValidObjectId} from "mongoose";

import { tweet } from "../models/tweet.model.js";

import { user } from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const createtweet = asyncHandler(async(req, res) => {

// TODO: create tweet
})

const getusertweets =asyncHandler(async(req, res) => {

// TODO: get user tweets
})

const updatetweets = asyncHandler(async(req, res) => {

// TODO: get update tweet
})

const deletetweet = asyncHandler(async(req, res) => {

// TODO: delete tweet
})

export {
         createtweet,
         getusertweets,
         updatetweets,
         deletetweet
       }

       