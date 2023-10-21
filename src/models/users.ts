import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: String,
    email: String,
    image: String,
    tier: String,
    role: String,
    emailVerified: Boolean,
    username: String,
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
