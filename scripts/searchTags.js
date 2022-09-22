import recipes from '../data/recipes.js';

const $ingredientSearch = document.getElementById("ingredients")
const $applianceSearch = document.getElementById("appliances")
const $ustensilSearch = document.getElementById("ustensils")
const ingredientsListHTMLelement = document.getElementById("ingredientsList")
const ustensilsListHTMLelement = document.getElementById("ustensilsList")
const tagsContainerHTMLelement = document.getElementById("tagsContainer")
const overlay = document.getElementById("overlay")


const fields = { ingredients: [], appliances: [], ustensils: "" }
const globalIngredientsList = makeIngredientList();
const currentIngredients = new Set();

const globalUstensilsList = makeUstensilList();
const currentUstensils = new Set();

overlay.addEventListener("click", closeModal)

$ingredientSearch.addEventListener("input", (e) => handleSearchIngredientInput(e.target.value));
// $applianceSearch.addEventListener("input", (e) => handleSearchInput(e.target.value , changedInput));
$ustensilSearch.addEventListener("input", (e) => handleSearchUstensilInput(e.target.value));

function handleSearchIngredientInput(enteredValue, changedInput) {
    const newIngredientsList = globalIngredientsList.filter(ingredient => ingredient.includes(enteredValue))
    // calcul de la nouvelle donnée en créant la variable newfield
    // met a jour les fields => fields[changedInput] = newField
    fillIngredientsList(newIngredientsList)
    updateHTMLingredientsList();
}
function handleSearchUstensilInput(enteredValue, changedInput) {
    const newUstensilsList = globalUstensilsList.filter(ustensil => ustensil.includes(enteredValue))
    fillUstensilsList(newUstensilsList)
    updateHTMLustensilsList();
    // return;
    return research(recipes, searchBarValue, advancedField, simpleField);
}

function closeModal() {
    ingredientsListHTMLelement.style.display = 'none';
    ustensilsListHTMLelement.style.display = 'none';
    overlay.style.display = 'none';
}

function makeIngredientList() {
    const ingredientsListWithDoubleValues = recipes.map(recipe => recipe.ingredients).flat().map(ingredient => ingredient.ingredient.toLowerCase())
    // console.log(Array.from(new Set(ingredientsListWithDoubleValues)));
    return Array.from(new Set(ingredientsListWithDoubleValues));
}

function makeUstensilList() {
    const ustensilsListWithDoubleValues = recipes.map(recipe => recipe.ustensils).flat().map(ustensil => ustensil.toLowerCase())
    // console.log(Array.from(new Set(ustensilsListWithDoubleValues)));
    return Array.from(new Set(ustensilsListWithDoubleValues));
}

function fillIngredientsList(ingredientList) {
    ingredientsListHTMLelement.innerHTML = ""
    ingredientList.forEach(ingredient => {
        ingredientsListHTMLelement.appendChild(createClickableSpan(ingredient, () => { addIngredientTag(ingredient) }))
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
    if (tagType === 'ingredient'){
        tag.classList.add("ingredientTag")
    }
    else if (tagType === 'ustensil'){
        tag.classList.add("ustensilTag")
    }
    else{
        tag.classList.add("applianceTag")
    }
    const closeSpan = document.createElement('span')
    closeSpan.innerText = "X"
    closeSpan.addEventListener("click", () => deleteTag(text))
    closeSpan.classList.add("cross")
    tag.innerText = text
    tag.appendChild(closeSpan)
    return tag
}

function addIngredientTag(ingredient) {
    currentIngredients.add(ingredient)
    updateHTMLTags()
}

function addUstensilTag(ustensil) {
    currentUstensils.add(ustensil)
    updateHTMLTags()
}

function updateHTMLTags() {
    tagsContainerHTMLelement.innerHTML = "";
    currentIngredients.forEach(ingredient => {
        tagsContainerHTMLelement.appendChild(createTag(ingredient, "ingredient"))
    })
    currentUstensils.forEach(ustensil => {
        tagsContainerHTMLelement.appendChild(createTag(ustensil, "ustensil"))
    })
    $ingredientSearch.value="Ingredients";
    $applianceSearch.value="Appliances";
    $ustensilSearch.value="Ustensils";
    closeModal();
}
function updateHTMLingredientsList() {
    ingredientsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ingredientSearch.setAttribute('style', 'width:100%')
    overlay.style.display = "block"
}
function updateHTMLustensilsList() {
    ustensilsListHTMLelement.setAttribute('style', 'display:inline-grid')
    $ustensilSearch.setAttribute('style', 'width:100%')
}

function deleteTag(tag) {
    currentIngredients.delete(tag)
    currentUstensils.delete(tag)
    updateHTMLTags()
}


