import recipes from "../data/recipes.js";

const $inputsearch = document.getElementById("search");
const $ingredientssearch = document.getElementById("ingredients");
const $appliancesearch = document.getElementById("appareils");
const $ustensilessearch = document.getElementById("ustensiles");
const $psearcherror = document.getElementById("search-error");
const $ingredientsModal = document.getElementById("ingredients-modal");
const $filters = document.querySelector('.filters');

let arrayRecipes = [];
// const filters = {ingredients: []};

//eventlisteners
$inputsearch.addEventListener("change", getInputSearchValue);
$inputsearch.addEventListener("change", searchValueInRecipes);

$ingredientssearch.addEventListener("change", e => filterIngredients(e.target.value));
// $ingredientssearch.addEventListener("change", e => findSearchValueInIngredients(e.target.value));
// $ingredientssearch.addEventListener("click", updateIngredientsModal);
$appliancesearch.addEventListener("change", searchValueInRecipes);
$appliancesearch.addEventListener("change", getInputSearchValue);
$ustensilessearch.addEventListener("change", searchValueInRecipes);
$ustensilessearch.addEventListener("change", e => findSearchValueInUstensiles(e.target.value));


//searchIngrdients onchange $ingredientssearch

function getInputSearchValue() {
    $psearcherror.innerText = "";
    if ($inputsearch.value.length >= 3) {
        return $inputsearch.value;
    }
    if ($ingredientssearch.value.length >= 3) {
        return $ingredientssearch.value;
    }
    if ($appliancesearch.value.length >= 3) {
        return $appliancesearch.value;
    }
    if ($ustensilessearch.value.length >= 3) {
        return $ustensilessearch.value;
    }
    $psearcherror.innerText = "La recherche doit comprendre au moins 3 caractères pour être valide";
    return;
}

function findSearchValueInName(searchValue, name) {
    name = name.toLowerCase();
    return name.includes(searchValue);
}

function findSearchValueInAppliance(searchValue, appliance) {
    appliance = appliance.toLowerCase();
    return appliance.includes(searchValue);
}

function findSearchValueInUstensils(searchValue, ustensils) {
    return ustensils.includes(searchValue)
}

function findSearchValueInIngredients(searchValue, ingredients) {
    return ingredients.find(element => element.ingredient.includes(searchValue))
}

function findRecipesBySearchValue(searchValue) {
    const arrayRecipes = [];
    recipes.forEach(element => {
        if (findSearchValueInName(searchValue, element.name)) {
            arrayRecipes.push(element);
        }
        else if (findSearchValueInAppliance(searchValue, element.appliance)) {
            arrayRecipes.push(element);
        }
        else if (findSearchValueInUstensils(searchValue, element.ustensils)) {
            arrayRecipes.push(element);
        }
        else if (findSearchValueInIngredients(searchValue, element.ingredients)) {
            arrayRecipes.push(element);
        }
    });

    // tu aurais pu utiliser filter
    // return recipes.filter(element => isElementElible(element))

    return arrayRecipes;
}

function searchIngredients(value, arrayIngredients) {
    //return liste d'ingredients (value)
}

function addIngredientToFilter(ingredient) {
    //filters.ingredient = ingredient
}

function filterRecipes(filtres, recipes) {
    //return arrayFiltered
}

function searchValueInRecipes() {
    arrayRecipes = [];
    const searchValue = getInputSearchValue().toLowerCase();
    arrayRecipes = findRecipesBySearchValue(searchValue);
    console.log(arrayRecipes)
    displayRecipes(arrayRecipes);
}



let ingredientsList = []
function updateIngredientsModal() {
    $ingredientsModal.innerHTML = ""
    currentIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div')
        ingredientItem.classList.add("tag");
        ingredientItem.addEventListener("click", () => addTotags(ingredient));
        ingredientItem.textContent = ingredient;
        $ingredientsModal.appendChild(ingredientItem)
    })
}

const INGREDIENTS_LIST = recipes.map(recipe => recipe.ingredients).flat().map(ingredient => ingredient.ingredient);
let currentIngredients = INGREDIENTS_LIST;

function filterIngredients(ingredient) {
    currentIngredients = INGREDIENTS_LIST.filter(e => e.includes(ingredient));
    updateIngredientsModal()
}
function addTotags(tagName) {
    const tag = document.createElement("div")
    const supprTag = document.createElement("img")
    supprTag.setAttribute("src", "/assets/images/closetag.svg")
    tag.appendChild(supprTag)
    tag.textContent = tagName;
    $filters.appendChild(tag)
}


function init() {
    displayRecipes(recipes)
};

init()