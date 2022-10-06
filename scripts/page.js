import { displayErrorMessage } from './searchBar.js';
import { displayRecipes } from './updateRecipes.js'
import research from './research.js';

const currentIngredients = new Set()
const currentUstensils = new Set()
const currentAppliances = new Set()

export function getCurrentIngredients() {
    return [...currentIngredients];
}
export function addIngredientInCurrentList(ingredient){
    currentIngredients.add(ingredient);
    updateRecipes()
}
export function removeIngredientInCurrentList(ingredient){
    currentIngredients.delete(ingredient);
    updateRecipes()
}

export function getCurrentUstensils() {
    return [...currentUstensils];
}
export function addUstensilInCurrentList(ustensil){
    currentUstensils.add(ustensil);
    updateRecipes()
}
export function removeUstensilInCurrentList(ustensil){
    currentUstensils.delete(ustensil);
    updateRecipes()
}

export function getCurrentAppliances() {
    return [...currentAppliances];
}
export function addApplianceInCurrentList(appliance){
    currentAppliances.add(appliance);
    updateRecipes()
}
export function removeApplianceInCurrentList(appliance){
    currentAppliances.delete(appliance);
    updateRecipes()
}

export function getTagsList() {
    if (currentIngredients.size || currentUstensils.size || currentAppliances.size) {
        return [...currentIngredients, ...currentUstensils, ...currentAppliances];
    }
    return
}

let searchBarValue = "";
export function setsearchBarValue(value){
    searchBarValue = value;
    updateRecipes()
}
export function getSearchBarValue() {
    return searchBarValue;
}
export function updateRecipes() {
    displayRecipes(research(getSearchBarValue(), getTagsList()));
}

export function errorMessage() {
    displayErrorMessage()
}
