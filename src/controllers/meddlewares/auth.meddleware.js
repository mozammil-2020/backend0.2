import { ApiError } from "../utils/ApiError";

import { asyncHandler } from "../utils/asyncHandler";

import jwt from " jsonwebtoken ";

import { user } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {

try {

  const token = req.cookies?.accessToken || req.header ("Authrization")?.replace("Bearer", " ")

  // console.log(token)

  if(!token) {
    throw new ApiError(401, "Unauthorized request")
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  const user = await user.findById(decodedToken?._Id).select("-password -refreshToken")

  if(!user){
    throw new ApiError(401, "Invalid Access Token")
  }

  req.user = user;
  next()

} catch (error) {
  
  throw new ApiError(401, error?.message || "Invalid Access Token")
}
})
