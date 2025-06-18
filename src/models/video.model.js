import mongoose, {schema} from "mongoose";

import mongooseAggregatepageinate from "mongoose-aggregate-pageinate-v2";

const videoschema = new schema ({
                  videofile:{
                    type:String, //cloudinary.url
                    required: true
                  },
                  title:{
                    type: String,
                    required: true
                  },
                  description:{
                    type:String,
                    required: true
                  },
                  views:{
                    type:Number,
                    default:0
                  },
                  ispublished:{
                    type:Boolean,
                    default:true
                  },
                  owner:{
                    type:schema.Types.ObjectId,
                    ref: "user"
                  },
},
        {timestamps: true}
)

videoschema.plugin(mongooseAggregatepageinate)

export const video = mongoose.model("video", videoschema)

