import recipes from '../data/recipes.js';

const $ingredientSearch = document.getElementById("ingredients")
const $applianceSearch = document.getElementById("appliances")
const $ustensilesSearch = document.getElementById("ustensils")

const fields = {ingredients: [], appliances: [], ustensils: "" }
const ingredientsList = []

$ingredientSearch.addEventListener("input", (e) => handleSearchInput(e.target.value, changedInput));
$applianceSearch.addEventListener("input", (e) => handleSearchInput(e.target.value , changedInput));
$ustensilesSearch.addEventListener("input", (e) => handleSearchInput(e.target.value, changedInput));

function handleSearchInput(enteredValue, changedInput) {

    const newList = makeIngredientList().filter(ingredient => ingredient.includes(enteredValue))
    // calcul de la nouvelle donnée en créant la variable newfield
    // met a jour les fields => fields[changedInput] = newField
    return research(recipes, searchBarValue, advancedField, simpleField);
}
makeIngredientList();
function makeIngredientList(){
    const tmp = recipes.map(recipe => recipe.ingredients).flat().map(ingredient => ingredient.ingredient)
    tmp.forEach(ingredient => {
        if(!ingredientsList.includes(ingredient)){
            ingredientsList.push(ingredient)
        }
    });
    console.log(ingredientsList);
    return ingredientsList
}


