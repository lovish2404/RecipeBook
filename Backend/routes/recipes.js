import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.js";
const router = express.Router();

router.route("/").post(createRecipe).get(getAllRecipes);
router.route("/:id").get(getRecipe).delete(deleteRecipe).patch(updateRecipe);

export default router;
