import { getRecipes } from '../infrastructure/recipes.js';

function formatRecipes(recipes) {
    return recipes.map(recipe => ({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients.map(i => i.ingredient),
        appliances: [recipe.appliance],
        ustensils: recipe.ustensils
    }))
}
/**
 * Main search function
 * @param {string} searchValue
 * @param {Array} tags
 * @returns {Array} fileredRecipes
 */
export default function research(searchValue, tags) {
    let filteredRecipes = formatRecipes(getRecipes());
    if(!!searchValue){
        filteredRecipes = filterRecipesBySearchValue(filteredRecipes, searchValue);
    }
    if(!!tags){
        filteredRecipes = filterRecipesByTags(filteredRecipes, tags);
    }
    return resetRecipes(filteredRecipes);
}
function resetRecipes(formatedRecipes){
    return getRecipes().filter(recipe => formatedRecipes.find(formatedRecipe => formatedRecipe.id === recipe.id))
}
function filterRecipesBySearchValue(recipes, searchValue) {
    if (searchValue.length < 3) {
        return recipes;
    }
    return recipes.filter(recipe => doesRecipeIncludeValue(recipe, searchValue))
}

function filterRecipesByTags(recipes, tags) {
    return recipes.filter(recipe => {
        return tags.every((tag) =>
            recipe.ingredients.some((ingredient) => tag.toLowerCase() === ingredient.toLowerCase()) ||
            recipe.appliances.some((appliances) => tag.toLowerCase() === appliances.toLowerCase()) ||
            recipe.ustensils.some((ustensils) => tag.toLowerCase() === ustensils.toLowerCase())

        )
    })

}

function doesRecipeIncludeValue(recipe, searchValue) {
    return (
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchValue.toLowerCase())) ||
        recipe.description.includes(searchValue.toLowerCase()) ||
        recipe.name.includes(searchValue.toLowerCase())
    )
}

