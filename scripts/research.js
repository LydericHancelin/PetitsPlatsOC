function research(recipes, searchValue, advancedFields, simpleFields){
    let filteredRecipes = recipes;
    filteredRecipes = filterRecipesBySearchValue(filteredRecipes, searchValue);
    for(const [tag, tagValues] of Object.entries(advancedFields)){
        filteredRecipes = filterRecipesByComplexeTag(filteredRecipes, tag, tagValues)
    }
    for(const [tag, tagValue] of Object.entries(simpleFields)){
        filteredRecipes = filterRecipesBySimpleTag(filteredRecipes, tag, tagValue)
    }
    console.log(filteredRecipes);
    return filteredRecipes;
}

function filterRecipesByComplexeTag(recipes, tag, tagValues){
    return recipes.filter(recipe => tagValues.every(tagValue => recipe[tag].includes(tagValue)))
}
function filterRecipesBySimpleTag(recipes, tag, tagValue){
    if(!tagValue){
        return recipes;
    }
    return recipes.filter(recipe => recipe[tag] === tagValue)
}
function filterRecipesBySearchValue(recipes, searchValue){
    if (searchValue.length < 3){
        return recipes;
    }
    return recipes.filter(recipe => doesRecipeIncludeValue(recipe, searchValue))
}

function doesRecipeIncludeValue(recipe, searchValue) {
    return (
        recipe.ingredients.some(ingredient => ingredient.ingredient.includes(searchValue)) ||
        recipe.description.includes(searchValue) ||
        recipe.name.includes(searchValue)
)}