import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  MemberId: mongoose.Schema.Types.ObjectId,
  Name: String,
  NftType: String,
});

const entrySchema = new Schema({
  EntryTitle: String,
  EntryId: mongoose.Schema.Types.ObjectId,
  NftType: String,
});

const clubSchema = new Schema(
  {
    Name: String,
    Members: [memberSchema],
    Founder: memberSchema,
    Entries: [entrySchema],
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);

export default Club;
