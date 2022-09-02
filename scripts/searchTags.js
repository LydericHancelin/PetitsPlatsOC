import recipes from '../data/recipes.js';

const $ingredientSearch = document.getElementById("ingredients")
const $applianceSearch = document.getElementById("appliances")
const $ustensilesSearch = document.getElementById("ustensils")
const ingredientsListHTMLelement = document.getElementById("ingredientsList")
const tagsContainerHTMLelement = document.getElementById("tagsContainer")

const fields = { ingredients: [], appliances: [], ustensils: "" }
const globalIngredientsList = makeIngredientList();
const currentIngredients = new Set();

$ingredientSearch.addEventListener("input", (e) => handleSearchInput(e.target.value,));
// $applianceSearch.addEventListener("input", (e) => handleSearchInput(e.target.value , changedInput));
// $ustensilesSearch.addEventListener("input", (e) => handleSearchInput(e.target.value, changedInput));

function handleSearchInput(enteredValue, changedInput) {

    const newList = globalIngredientsList.filter(ingredient => ingredient.includes(enteredValue))
    // calcul de la nouvelle donnée en créant la variable newfield
    // met a jour les fields => fields[changedInput] = newField
    fillIngredientsList(newList)
    updateHTMLingredientsList();
    return;
    // return research(recipes, searchBarValue, advancedField, simpleField);
}


function makeIngredientList() {
    const ingredientsListWithDoubleValues = recipes.map(recipe => recipe.ingredients).flat().map(ingredient => ingredient.ingredient.toLowerCase())
    console.log(Array.from(new Set(ingredientsListWithDoubleValues)));
    return Array.from(new Set(ingredientsListWithDoubleValues));
}

function fillIngredientsList(ingredientList) {
    ingredientsListHTMLelement.innerHTML = ""
    ingredientList.forEach(ingredient => {
        ingredientsListHTMLelement.appendChild(createClickableSpan(ingredient, () => { addTag(ingredient) }))
    });
}

function createClickableSpan(text, handler) {
    const clickableSpan = document.createElement('span')
    clickableSpan.innerText = text
    clickableSpan.addEventListener("click", handler)
    return clickableSpan
}

function createTag(text) {
    const tag = document.createElement('span')
    tag.classList.add("ingredientTag")
    const closeSpan = document.createElement('span')
    closeSpan.innerText = "X"
    closeSpan.addEventListener("click", () => deleteTag(text))
    closeSpan.classList.add("cross")
    tag.innerText = text
    tag.appendChild(closeSpan)
    return tag
}

function addTag(ingredient) {
    currentIngredients.add(ingredient)
    updateHTMLingredientsTags()
}

function updateHTMLingredientsTags() {
    tagsContainerHTMLelement.innerHTML = "";
    console.log(currentIngredients)
    currentIngredients.forEach(ingredient => {
        tagsContainerHTMLelement.appendChild(createTag(ingredient))
    })
}
function updateHTMLingredientsList() {
    ingredientsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ingredientSearch.setAttribute('style', 'width:100%')
}

function deleteTag(tag) {
    currentIngredients.delete(tag)
    updateHTMLingredientsTags()
}


