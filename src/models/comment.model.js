import mongoose, {schema} from "mongoose";

import mongooseAggregatepageinate from "mongoose-aggregate-pageinate-v2";

const commentschema = new schema (
                    {
                    content:{
                      type: String,
                      required:true
                    },

                    video:{
                      type:schema.Types.ObjectId,
                      ref: "video"
                    },

                    owner:{
                      type:schema.Types.ObjectId,
                      ref:"user"
                    },
  },
       {timestamps: true}                  
)

commentschema.plugin(mongooseAggregatepageinate)

 export const comment = mongoose.model("comment", commentschema)

 

