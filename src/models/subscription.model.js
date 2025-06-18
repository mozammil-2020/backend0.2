import mongoose, {schema} from "mongoose";

const subscriptionschema = new schema({
                         
                          subscriber:{
                            type:schema.Types.ObjectId,
                            ref: "user"
                          },

                          channel: {
                            type: schema.Types.ObjectId,
                            ref: "user"
                          },
},

      {timestamps: true}

)

export const subscription = mongoose.model("subscription", subscriptionschema)