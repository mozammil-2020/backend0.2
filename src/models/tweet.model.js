import mongoose, {schema} from "mongoose";

const tweetschema = new  schema({
                  content: {
                    type: String,
                    required: true
                  },
                  owner:{
                    tupe: schema.Types.ObjectId,
                    ref:  "user"
                  },
},
       {timestamps: true}
)

export const Tweet = mongoose.model("Tweet", tweetschema)