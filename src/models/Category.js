const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên category"],
    },
    icon: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CategorySchema.virtual("subcategories", {
  ref: "Subcategory",
  localField: "_id",
  foreignField: "category",
});

module.exports = mongoose.model("Category", CategorySchema);
