import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, , "Please provide title"],
      maxLength: 50,
    },
    ingredients: {
      type: [String],
      required: [true, "Please provide ingredients"],
    },
    category: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snacks"],
      required: [true, "Please provide category"],
    },
    cookingTime: {
      type: Number,
      required: [true, "Please provide cooking time"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Cooking time must be more than 0s",
      },
      validate: {
        validator: function (value) {
          return value < 3600;
        },
        message: "Cooking time must be less than 1 hour",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
