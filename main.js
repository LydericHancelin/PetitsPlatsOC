import { displayRecipes } from './presentation/updateRecipes.js'
import { getRecipes } from "./infrastructure/recipes.js";

function init() {
    displayRecipes(getRecipes())
};

init()