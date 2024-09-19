import { Recipe } from "../models/recipeModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ recipes, count: recipes.length });
};
export const getRecipe = async (req, res) => {
  const {
    user: { userId },
    params: { id: recipeId },
  } = req;
  const recipe = await Recipe.findOne({ _id: recipeId, createdBy: userId });
  if (!recipe) {
    throw new NotFoundError(`No recipe with id ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};
export const createRecipe = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.OK).json({ recipe });
};
export const updateRecipe = async (req, res) => {
  const {
    body: { ingredients, title, category, cookingTime },
    user: { userId },
    params: { id: recipeId },
  } = req;
  if (
    ingredients === "" ||
    title === "" ||
    category === "" ||
    cookingTime === ""
  ) {
    throw new BadRequestError("Provide full details");
  }
  const recipe = await Recipe.findByIdAndUpdate(
    { _id: recipeId, createdBy: userId },
    req.body,
    { runValidators: true, new: true }
  );
  if (!recipe) {
    throw new NotFoundError(`No recipe with id ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};

export const deleteRecipe = async (req, res) => {
  const {
    user: { userId },
    params: { id: recipeId },
  } = req;
  const recipe = await Recipe.findOneAndDelete({
    _id: recipeId,
    createdBy: userId,
  });
  if (!recipe) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "deleted" });
};
