import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const likeSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (if applicable)
    },
  },
  {
    timestamps: true,
  }
);

const entrySchema = new Schema(
  {
    _id: { 
      type: String, 
      default: () => new ObjectId().toString() 
    },
    entry_number: Number,
    headline_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Headline", // Reference to the Headline model
    },
    content: String,
    type: String,
    posted_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (if applicable)
    },
    reply_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry", // Reference to another entry if it's a reply
    },
    club_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club", // Reference to a Club model (if applicable)
    },
    likes: [likeSchema], // Embed the "likes" field as an array of like objects
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;