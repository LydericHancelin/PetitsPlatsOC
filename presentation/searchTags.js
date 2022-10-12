import { addApplianceInCurrentList, addIngredientInCurrentList, addUstensilInCurrentList, getCurrentAppliances, getCurrentIngredients, getCurrentRecipes, getCurrentUstensils, getTagsList, removeApplianceInCurrentList, removeIngredientInCurrentList, removeUstensilInCurrentList } from "./page.js";

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

overlay.addEventListener("click", closeModal)

$ingredientSearch.addEventListener("click", () => handleDisplayIngredient());
$ustensilSearch.addEventListener("click", () => handleDisplayUstensil());
$applianceSearch.addEventListener("click", () => handleDisplayAppliance());


$ingredientSearch.addEventListener("input", (e) => handleSearchIngredientInput(e.target.value));
$applianceSearch.addEventListener("input", (e) => handleSearchApplianceInput(e.target.value));
$ustensilSearch.addEventListener("input", (e) => handleSearchUstensilInput(e.target.value));

function handleDisplayIngredient() {
    fillIngredientsList(makeIngredientList());
    updateHTMLingredientsList();
}
function handleDisplayAppliance() {
    fillAppliancesList(makeApplianceList());
    updateHTMLappliancesList();
}
function handleDisplayUstensil() {
    fillUstensilsList(makeUstensilList());
    updateHTMLustensilsList();
}

function handleSearchIngredientInput(enteredValue) {
    const newIngredientsList = makeIngredientList().filter(ingredient => ingredient.includes(enteredValue))
    fillIngredientsList(newIngredientsList)
    updateHTMLingredientsList();
}
function handleSearchUstensilInput(enteredValue) {
    const newUstensilsList = makeUstensilList().filter(ustensil => ustensil.includes(enteredValue))
    fillUstensilsList(newUstensilsList)
    updateHTMLustensilsList();
}
function handleSearchApplianceInput(enteredValue) {
    const newAppliancesList = makeApplianceList().filter(appliance => appliance.includes(enteredValue))
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
    const currentRecipes = getCurrentRecipes()
    let ingredientsListWithDoubleValues = []
    currentRecipes.forEach(( recipe ) => {
        ingredientsListWithDoubleValues =  [...ingredientsListWithDoubleValues, ...recipe.ingredients.map((ingredients) => ingredients.ingredient)]
    })
    const ingredientsListWithOutDoubleValues = new Set(ingredientsListWithDoubleValues)
    console.log(ingredientsListWithOutDoubleValues)
    return [...ingredientsListWithOutDoubleValues].sort()
}
function makeUstensilList() {
    const ustensilsListWithDoubleValues = getCurrentRecipes().reduce((ustensilsSet, { ustensils })  =>  {
        ustensilsSet.add(...ustensils.map((ustensils) => ustensils.toLowerCase()))
    return ustensilsSet
    }, new Set())
    return [...ustensilsListWithDoubleValues].sort()
}
function makeApplianceList() {
    const appliancesListWithDoubleValues = getCurrentRecipes().map(recipe  => recipe.appliance.toLowerCase())
    const mySet = new Set(appliancesListWithDoubleValues)
    return [...mySet].sort()
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


