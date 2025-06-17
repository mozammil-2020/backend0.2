import mongoose,{ isValidObjectId } from "mongoose";

import { playlist } from "../models/playlist.model.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const createplaylist = asyncHandler(async(req, res) => {

const { name, description } = req.body

// TODO: create playlist
})

const getuserplaylist = asyncHandler(async(req, res) => {

const { userId } = req.params

// TODO: get user playlist
})

const getplaylistById =asyncHandler(async(req, res)=> {

const { playlisById } = req.params

// TODO: get play list By Id
})

const addvideotoplaylist = asyncHandler(async(req, res) => {

const { playlisById, videoId } = req.params
})

const removedvidioefromplaylist = asyncHandler(async(req, res) => {

const { playlistId, video } = req.params

// TODO: remove video from playlist
})

const deleteplaylist = asyncHandler(async(req, res) => {

const { playlistId } = req.params

// TODO: delete playlist
})

const updateplaylist = asyncHandler(async(req, res) => {

const { playlistId } = req.params

const { name, description } = req.body

// TODO: update playlist

})

export {
         createplaylist,
         getplaylistById,
         getuserplaylist,
         addvideotoplaylist,
         removedvidioefromplaylist,
         deleteplaylist,
         updateplaylist
       }


       