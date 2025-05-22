import mongoose, {schema} from "mongoose"

const userSchema = new schema(
  {
    userName:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email:{
      type:String,
      lowercase: true,
      required: true,
      trim: true
    },
    fullName:{
      type: String,
      required: true,
      trim: true,
      index: true
    },
    avatar:{
      type: String, //cloudinary url
      required:true
    },
    coverImage:{
      type: String, //cloudinary url
    },
    watchHistory:[
      {
        type:schema.types.ObjectId,
        ref: "video"
      },
    ],
    password:{
      type:String,
      required:[true, "password is required"]
    },

    refreshToken:{
      type:String,
    },

  
  },

    {
     timmestamps: true
    },
)
