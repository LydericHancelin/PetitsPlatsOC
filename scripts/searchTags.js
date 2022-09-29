import { addIngredientInCurrentList, addUstensilInCurrentList, getCurrentIngredients, getCurrentUstensils, getSearchBarValue, getTagsList, removeIngredientInCurrentList, removeUstensilInCurrentList } from "./page.js";

import { getRecipes } from "../data/recipes.js";

const RECIPES = getRecipes()

const $ingredientSearch = document.getElementById("ingredients")
const $applianceSearch = document.getElementById("appliances")
const $ustensilSearch = document.getElementById("ustensils")
const ingredientsListHTMLelement = document.getElementById("ingredientsList")
const ustensilsListHTMLelement = document.getElementById("ustensilsList")
const tagsContainerHTMLelement = document.getElementById("tagsContainer")
const overlay = document.getElementById("overlay")

const globalIngredientsList = makeIngredientList();

const globalUstensilsList = makeUstensilList();
const currentUstensils = new Set();

overlay.addEventListener("click", closeModal)

$ingredientSearch.addEventListener("input", (e) => handleSearchIngredientInput(e.target.value));
// $applianceSearch.addEventListener("input", (e) => handleSearchInput(e.target.value , changedInput));
$ustensilSearch.addEventListener("input", (e) => handleSearchUstensilInput(e.target.value));

function handleSearchIngredientInput(enteredValue) {
    const newIngredientsList = globalIngredientsList.filter(ingredient => ingredient.includes(enteredValue))
    fillIngredientsList(newIngredientsList)
    updateHTMLingredientsList();
}

function handleSearchUstensilInput(enteredValue) {
    const newUstensilsList = globalUstensilsList.filter(ustensil => ustensil.includes(enteredValue))
    fillUstensilsList(newUstensilsList)
    updateHTMLustensilsList();
}

function makeSearch() {
    const tags = [Array.from(globalIngredientsList), Array.from(globalUstensilsList)].flat();
    //setTags(tags)
}

function closeModal() {
    ingredientsListHTMLelement.style.display = 'none';
    ustensilsListHTMLelement.style.display = 'none';
    overlay.style.display = 'none';
}

function makeIngredientList() {
    const ingredientsListWithDoubleValues = RECIPES.reduce((ingredientsSet, { ingredients }) => {
        ingredientsSet.add(...ingredients.map(({ ingredient: name }) => name.toLowerCase()))

        return ingredientsSet
    }, new Set())
    return [...ingredientsListWithDoubleValues]
}

function makeUstensilList() {
    const ustensilsListWithDoubleValues = RECIPES.reduce((ustensilsSet, { ustensils })  =>  {
        ustensilsSet.add(...ustensils.map((ustensils) => ustensils.toLowerCase()))
    return ustensilsSet
    }, new Set())
    return [...ustensilsListWithDoubleValues]
}

function fillIngredientsList(ingredientList) {
    ingredientsListHTMLelement.innerHTML = ""
    ingredientList.forEach(ingredient => {
        ingredientsListHTMLelement.appendChild(createClickableSpan(ingredient, () => {
            addIngredientTag(ingredient)
        }))
    });
}

function fillUstensilsList(ustensilList) {
    ustensilsListHTMLelement.innerHTML = ""
    ustensilList.forEach(ustensil => {
        ustensilsListHTMLelement.appendChild(createClickableSpan(ustensil, () => { addUstensilTag(ustensil) }))
    });
}

function createClickableSpan(text, handler) {
    const clickableSpan = document.createElement('span')
    clickableSpan.innerText = text
    clickableSpan.addEventListener("click", handler)
    return clickableSpan
}

function createTag(text, tagType) {
    const tag = document.createElement('span')
    const closeSpan = document.createElement('span')
    tag.classList.add(`${tagType}-tag`)
    closeSpan.innerText = "X"
    closeSpan.addEventListener("click", () => deleteTag(text))
    closeSpan.classList.add("cross")
    tag.innerText = text
    tag.appendChild(closeSpan)
    return tag
}

function addIngredientTag(ingredient) {
    addIngredientInCurrentList(ingredient)
    updateHTMLTags()
}

function addUstensilTag(ustensil) {
    addUstensilInCurrentList(ustensil)
    updateHTMLTags()
}

function updateHTMLTags() {
    tagsContainerHTMLelement.innerHTML = "";
    getCurrentIngredients().forEach(ingredient => {
        tagsContainerHTMLelement.appendChild(createTag(ingredient, "ingredient"))
    })
    getCurrentUstensils().forEach(ustensil => {
        tagsContainerHTMLelement.appendChild(createTag(ustensil, "ustensil"))
    })
    $ingredientSearch.value = "";
    $applianceSearch.value = "";
    $ustensilSearch.value = "";
    closeModal();
}

function updateHTMLingredientsList() {
    ingredientsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ingredientSearch.setAttribute('style', 'width:100%')
}

function updateHTMLustensilsList() {
    ustensilsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ustensilSearch.setAttribute('style', 'width:100%')
    // overlay.style.display = "block"
}

function deleteTag(tag) {
    removeIngredientInCurrentList(tag)
    removeUstensilInCurrentList(tag)
    updateHTMLTags()
}


