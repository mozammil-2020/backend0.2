import { asyncHandler } from "../utils/asyncHandler.js"

import { ApiError } from "../utils/ApiError.js"

import { user } from "../models/user.model.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"

import { ApiResponnse } from "../utils/ApiResponse.js";

import jwt from "jsonwebtoken"

import mongoose from "mongoose";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await user.findById(userId)
    const AccessToken = user.generateAccessToken()
    const RefreshToken = user.RefreshToken()

    user.RefreshToken = RefreshToken

    await user.save({validateBforeSave:false})
    return { AccessToken, RefreshToken}

  } catch (error) {
    throw new ApiError (500, "somthing is worng while gennerating AccessToken and RefreshToken")
  }
}

const registeruser = asyncHandler(async(req,res)=>{

  //get user details from frontend
  //validation - not empty
  //check if user already exist: user name, email
  //check for image - check for avatar
  //upload them to cloudinary , avatar
  //create user object- create intry in db
  //remove password and refresh token field from reponse
  //check for user creation
  // return response

  const{fullName, email, username, password}= req.body
  //console.log("email: ", email)

  if(
    [fullName,email,username,password].some((field)=>field?.trim() === "")
  ){
    throw new ApiError (409, "All field are required")
  }

  const existeduser = await user.findone({
    or$: [{username}, {email}]
    })

    if(existeduser) {
      throw new ApiError (409, "user with email or username is already exist")
    }
      // console.log(req.files);

      const avatarlocalpath = req.files?.avatar[0]?.path

      // const coverImagelocalpath = req.files?.coverImage[0]?.path

      let CoverImageLocalPath;

      if(req.files && Array.isArray(req.files.CoverImage) && req.filea.CoverImage.length > 0){
        CoverImageLocalPath = req.files.CoverImage[0].path
      }

      if( !avatarlocalpath) {
        throw new ApiError (400, "Avatar file is required")
      }

      const avatar = await uploadOnCloudinary(avatarlocalpath);

      const coverImage = await uploadOnCloudinary(CoverImageLocalPath)

      if(!avatar) {
        throw new ApiError (400, "avatar file is required")
      }

      const user = await user.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || " ",
        email,
        password,
        username:username.tolowecase ()
      })

      const createduser = await user.findById(user._Id).select("-password -refreshToken")

      if(!createduser){
        throw new ApiError (500, "something is wrong while registring the user")
      }
      returnes.status(201).json(
        new ApiResponnse (200, createduser, "user registerd successfully")
      )
  }
)

//controller for logout

const loginuser = asyncHandler(async(req,res) => {

    // req body -> data
    // username or email
    // find the user
    // check password
    // access and refreshToken
    // send cookie
 
    const { email, username, password} = req.body
    console.log (email);

    if(!username && !email) {
      throw new ApiError (400, "username or email is required")
    }

    // here is an alternative of above code based on login discussed in video
    // if(!(username || email)){
    // throw new ApiError (400, "username or email required")
    //}

    const user = await user.findone({
      $or:[{username}, {email}]
    })
    if(!user){
      throw new ApiError (404, "user does not exist")
    }
    const ispasswordvalid = await user.ispassworcorrect(password)
    if(!ispasswordvalid){
      throw new ApiError (401, "Invalid user credential")
    }

    const {AccessToken, RefreshToken}= await generateAccessTokenandRefreshToken(user._Id)

    const loggedInuser = await user.findById(user._Id).select ("-password -refreshToken")

    const options = {
              httponly:true,
              secure: true
    }

    return res
         .status(200)
         .cookie("AccessToken", AccessToken, options)
         .cookie("RefreshToken", RefreshToken, options)
         .json(
            new ApiError(200,
              {
                user:loggedInuser, AccessToken, RefreshToken
              },
              "user logged in successfully"
            )
         )
   }
)

const logoutuser = asyncHandler(async(req, res) =>{
    await user.findByIdandupdate(
          req.user._Id,
          {
            $unset:{
              RefreshToken:1
            }
          },
        {
          new:true
        }
    )
    const options ={
      httponly:true,
      secure:true
    }
    return res
          .status (200)
          .clearcookie ("AccessToken", options)
          .clearcookie ("RefreshToken", options)
          .json(new ApiResponnse(200, { }, "user logged out"))
     }
   )
    const RefreshAccessToken = asyncHandler(async(req, res) => {

    const IncomingRefreshToken = req.cookies.RefreshToken ||req.body.RefreshToken
    
    if(!IncomingRefreshToken) {
      throw new ApiError(401,"unauthorizedrequest")
    }
    try {
      const decodetoken = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

      const user = await user.findById(decodetoken?._Id)

      if(!user) {
        throw new ApiError(401, "Invalid Refresh Token")
      }
      if(IncomingRefreshToken !== user?.RefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used")
      }
        const options = {
          httponly: true,
          secure: true
        }
        const {AccessToken, newRefreshToken} = await generateAccessandRefreshToken (user._Id)

        return res
        .status(200)
        .cookie("AccessToken", AccessToken, options)
        .cookie("RefreshToken", newRefreshToken, options)
        .json(
          new ApiResponnse(
            200,
            {AccessToken, RefreshToken:newRefreshToken },
            "AccessToken refreshed"
          )
        )
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
    })

    //controller for change password

    const changecurrentpassword = asyncHandler(async(req, res)=>{
    const {oldpassword, newpassword}= req.body
    const user = await user.findById(req.user?._Id)

    const ispassworcorrect = await user.ispassworcorrect(oldpassword)

    if(!ispassworcorrect){
      throw new ApiError (400, "Invalid old password")
    }
    user.password = newpassword
    await  user.save({validatebeforsave:false})

    return res
           .status (200)
           .json(new ApiResponnse(200, {}, "password change successfully"))
    }
  )

  // controller for getcurrent user

  const getcurrentuser = asyncHandler(async(req, res)=> {
    return res
          .status(200)
          .json (new ApiResponnse(
            200,
            req.user,
            "user fitched successfully"
          ))

  })

  // controller for updateAccount Details

  const updateAccountDetails = asyncHandler(async(req,res)=> {

    const { fullName, email} = req.body

    if(!fullName || email) {
      throw new ApiError (400, "All field are required")
    }
    const user = await user.findByIdandupdate(req.user?._Id,
      {
        $set:{
          fullName,
          email: email
        }
      },

      {new: true}
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponnse(200, user, "Account details is updated successfully"))
  })

  // controller for updateuser avatar

  const updateuseravatar = asyncHandler(async(req, res) => {
    const avatarlocalpath = req.file?.path
    if(!avatarlocalpath){
      throw new ApiError (400, "Avatar file is missing")
    }

    //TODO: delete old image-assignment

    const avatar = await uploadOnCloudinary(avatarlocalpath)
    if(!avatar.url){
      throw new ApiError (400, "Error while uploading on avatar")
    }

    const user = await user.findByIdandupdate(req.user?._Id,
      {
        $set:{
          avatar: avatar.url
        }
      },

      {new : true}
    ).select("-password")

    return res
          .status(200)
          .json(
            new ApiResponnse(200,user, "Avatar image updated successfully")
          )

  })

  // controller for update user coverImage

  const updateusercoverimage = asyncHandler(async(req,res) => {
    const coverImagelocalpath = req.file?.path

    if(!coverImagelocalpath){
      throw new ApiError (400, "Cover image file is missing")
    }

    //TODO: delete old image -assignment

    const coverImage = await uploadOnCloudinary(coverImagelocalpath)

    if(!coverImage.url){
      throw new ApiError(400, "Error while uploading on avatar")
    }

    const user = await user.findByIdandupdate(req.user?._Id,
      {
        $set:{
          coverImage: coverImage.url
        }
      },
      {new:true}
    ).select("-password")
    return res
          .status(200)
          .json(
            new ApiResponnse(200, user, "cover image upload successfilly")
          )
  })

  //controller for geruserchanelprofile

  const getuserchanelprofile = asyncHandler(async(req, res)=> {
    const { username} = req.params

    if(!username?.trim()){
      throw new ApiError(400, "Username is missing")
    }

    const channel = await user.aggregate([
      {
      $match:{
        username: username?.tolowecase()
        }
      },
      {
        $lookup:{
          from:"subscription",
          lookfield: "_Id",
          foreingfield: "channel",
          as: "subscribers"
        }
      },
      {
        $lookup:{
          from: "subscription",
          localfield: "_Id",
          foreingfield: "subscriber",
          as:"subscribed To"
        }
      },
      {
        $addFields:{
          subscribersCount:{
            $size: "$subscribers"
          },
          channelssubscribedTocount:{
            $size:"$subscribedTo"
          },
          issubscribed:{
            $cond:{
              if:{$in:[req.user?._Id, "$subscribers.subscriber"]},
              then: true,
              else: false
            }
          }
        }
      },

      {
        $project:{
          fullname:1,
          username:1,
          subscriberscount:1,
          channelssubscribedTocount:1,
          issubscribed:1,
          avatar:1,
          coverImage:1,
          email:1
        }
      }
    ])
    if(!channel?.length){
      throw new ApiError(400, "Channel does not exist")
    }
    return res
          .status(200)
          .json(
            new ApiResponnse(200, channel[0], "User channel fitched successfully")
          )
  })

  const getwatchhistory= asyncHandler(async(req, res)=> {

    const user = await user.aggregate([
      {
        $match:{
          _Id:new mongoose.Types.ObjectId(req.user._Id)
        }
      },
      {
        $lookup:{
          from:"videos",
          localfield:"watchhistory",
          foreingfield: "_Id",
          as: "watchhistory",
          pipeline:[
            {
            $lookup:{
              from: "user",
              localfield: "owner",
              foriengnfield: "_Id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullName:1,
                    username:1,
                    avatar:1
                  }
                }
              ]
             }
            },
            {
              $addFields:{
                owner:{
                  $first: "$owner"
                }
              }
            }
          ]
        }
      }
    ])

    return res
          .status(200)
          .json(
            new ApiResponnse(200, user[0].watchhistory,"watch history fecthed successfully")
          )
  })

  export{
    registeruser,
    loginuser,
    logoutuser,
    RefreshAccessToken,
    changecurrentpassword,
    getcurrentuser,
    updateAccountDetails,
    updateuseravatar,
    updateusercoverimage,
    getuserchanelprofile,
    getwatchhistory
  }