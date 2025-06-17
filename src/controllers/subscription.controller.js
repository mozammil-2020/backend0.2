import mongoose, { isValidObjectId } from "mongoose";

import { user } from "../models/user.model.js";

import { subscription } from "../models/subscription.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const togglesubscription = asyncHandler(async(req, res) => {

const { channelId } = req.params

// TODO: toggle subscription
})

// controller to return subscription list of channel

const getuserchannelsubscribers = asyncHandler(async(req, res) => {

const { channelId } = req.params
})

// controller to return channel list to which user has subscribed

const getsubscribedchannels = asyncHandler(async(req, res) => {

const { subscribedId } = req.params
})

export { 
         togglesubscription,
         getuserchannelsubscribers,
         getsubscribedchannels
       }

       