import { addApplianceInCurrentList, addIngredientInCurrentList, addUstensilInCurrentList, getCurrentAppliances, getCurrentIngredients, getCurrentUstensils, getTagsList, removeApplianceInCurrentList, removeIngredientInCurrentList, removeUstensilInCurrentList } from "./page.js";

import { getRecipes } from "../data/recipes.js";

const RECIPES = getRecipes()

const $ingredientSearch = document.getElementById("ingredients")
const $applianceSearch = document.getElementById("appliances")
const $ustensilSearch = document.getElementById("ustensils")
const ingredientsListHTMLelement = document.getElementById("ingredientsList")
const ustensilsListHTMLelement = document.getElementById("ustensilsList")
const appliancesListHTMLelement = document.getElementById("appliancesList")
const tagsContainerHTMLelement = document.getElementById("tagsContainer")
const customSelectorIngredient = document.getElementById("ingredient_selector")
const customSelectorUstensil = document.getElementById("ustensil_selector")
const customSelectorAppliance = document.getElementById("appliance_selector")
const overlay = document.getElementById("overlay")

const globalIngredientsList = makeIngredientList();
const globalUstensilsList = makeUstensilList();
const globalAppliancesList = makeApplianceList();

overlay.addEventListener("click", closeModal)

$ingredientSearch.addEventListener("input", (e) => handleSearchIngredientInput(e.target.value));
$applianceSearch.addEventListener("input", (e) => handleSearchApplianceInput(e.target.value));
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
function handleSearchApplianceInput(enteredValue) {
    const newAppliancesList = globalAppliancesList.filter(appliance => appliance.includes(enteredValue))
    fillAppliancesList(newAppliancesList)
    updateHTMLappliancesList();
}

function closeModal() {
    ingredientsListHTMLelement.style.display = 'none';
    ustensilsListHTMLelement.style.display = 'none';
    appliancesListHTMLelement.style.display = 'none';
    overlay.style.display = 'none';
    customSelectorIngredient.classList.remove("opened")
    customSelectorUstensil.classList.remove("opened")
    customSelectorAppliance.classList.remove("opened")
    $ingredientSearch.value = "";
    $applianceSearch.value = "";
    $ustensilSearch.value = "";
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
function makeApplianceList() {
    const appliancesListWithDoubleValues = RECIPES.map(recipe  => recipe.appliance.toLowerCase())
    const mySet = new Set(appliancesListWithDoubleValues)
    return [...mySet]
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
function fillAppliancesList(applianceList) {
    appliancesListHTMLelement.innerHTML = ""
    applianceList.forEach(appliance => {
        appliancesListHTMLelement.appendChild(createClickableSpan(appliance, () => { addApplianceTag(appliance) }))
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
function addApplianceTag(appliance){
    addApplianceInCurrentList(appliance)
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
    getCurrentAppliances().forEach(appliance => {
        tagsContainerHTMLelement.appendChild(createTag(appliance, "appliance"))
    })
    $ingredientSearch.value = "";
    $applianceSearch.value = "";
    $ustensilSearch.value = "";
    closeModal();
}

function updateHTMLingredientsList() {
    ingredientsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ingredientSearch.setAttribute('style', 'width:100%')
    overlay.style.display = "block"
    rotateArrow(customSelectorIngredient)
}
function updateHTMLustensilsList() {
    ustensilsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ustensilSearch.setAttribute('style', 'width:100%')
    overlay.style.display = "block"
    rotateArrow(customSelectorUstensil)
}
function updateHTMLappliancesList() {
    appliancesListHTMLelement.setAttribute('style', 'display:inline-grid')
    $applianceSearch.setAttribute('style', 'width:100%')
    overlay.style.display = "block"
    rotateArrow(customSelectorAppliance)
}

function rotateArrow(element){
    element.classList.add("opened");
}

function deleteTag(tag) {
    removeIngredientInCurrentList(tag)
    removeUstensilInCurrentList(tag)
    removeApplianceInCurrentList(tag)
    updateHTMLTags()
}


