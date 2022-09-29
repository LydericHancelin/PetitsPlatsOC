import { displayRecipes } from './updateRecipes.js'
import { getRecipes } from "../data/recipes.js";

function init() {
    displayRecipes(getRecipes())
};

init()