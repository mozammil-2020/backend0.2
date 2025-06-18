import mongoose, {schema} from "mongoose";

const playlistschema = new schema({

                     name:{
                      type:String,
                      required: true
                     },

                     description:{
                      type: String,
                      required: true
                     },

                     vidoes: [
                      {
                        type: schema.Types.ObjectId,
                        ref: "video"
                      }
                     ],

                     owner:{
                      type:schema.Types.ObjectId,
                      ref: "user"
                     },
}, 
          {timestamps: true}
)

export const playlist = mongoose.model("playlist", playlistschema)