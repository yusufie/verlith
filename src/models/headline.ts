import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const headlineSchema = new Schema(
  {
    _id: { 
      type: String, 
      default: () => new ObjectId().toString() 
    },
    headline_number: Number,
    title: String,
    content: String,
    first_entry_id: mongoose.Schema.Types.ObjectId,
    created_by_user_id: mongoose.Schema.Types.ObjectId,
    club_id: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Headline = mongoose.models.Headline || mongoose.model("Headline", headlineSchema);

export default Headline;