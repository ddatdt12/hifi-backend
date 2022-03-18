const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppError = require("../utils/AppError");

const PostSchema = new Schema(
  {
    title: String,
    jobType: String,
    categories: [String],
    salary: {
      min: Number,
      max: Number,
      unit: Number,
      negotiable: Boolean,
    },
    description: String,
    skillTags: [String],
    preferedLangs: [String],
    locations: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    postPhoto: String,
    verficationStatus: {
      type: String,
      enum: ["fulfilled", "pending", "rejected"],
      default: "pending",
    },
    employer: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
