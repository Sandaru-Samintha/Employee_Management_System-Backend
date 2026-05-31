import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
   {
      email :{
            type: String,
            required: true,
            unique: true
      },

      firstName: {
            type: String,
            required: true
      },

      lastName: {
            type: String,
            required: true
      },

      password: {
            type: String,
            required: true
      },

      role : {
            type: String,
            required: true,
            default: "manager"
      }
   }
);

const User = mongoose.model("user", UserSchema);

export default User;