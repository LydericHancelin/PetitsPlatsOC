import { displayRecipes } from './updateRecipes.js'
import research from '../core-logic/research.js';
import { setErrorVisible } from './searchBar.js';

const currentIngredients = new Set()
const currentUstensils = new Set()
const currentAppliances = new Set()
let currentRecipes = research();

export function getCurrentRecipes(){
    return [... currentRecipes];
}

export function getCurrentIngredients() {
    return [...currentIngredients];
}
export function addIngredientInCurrentList(ingredient){
    currentIngredients.add(ingredient);
    triggerResearch()
}
export function removeIngredientInCurrentList(ingredient){
    currentIngredients.delete(ingredient);
    triggerResearch()
}

export function getCurrentUstensils() {
    return [...currentUstensils];
}
export function addUstensilInCurrentList(ustensil){
    currentUstensils.add(ustensil);
    triggerResearch()
}
export function removeUstensilInCurrentList(ustensil){
    currentUstensils.delete(ustensil);
    triggerResearch()
}

export function getCurrentAppliances() {
    return [...currentAppliances];
}
export function addApplianceInCurrentList(appliance){
    currentAppliances.add(appliance);
    triggerResearch()
}
export function removeApplianceInCurrentList(appliance){
    currentAppliances.delete(appliance);
    triggerResearch()
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
    triggerResearch()
}
export function getSearchBarValue() {
    return searchBarValue;
}
export function triggerResearch() {
    currentRecipes = research(getSearchBarValue(), getTagsList())
    console.log(getTagsList())
    if(currentRecipes.length === 0){
        setErrorVisible(true);
    }else{
        setErrorVisible(false)
    }
    displayRecipes(currentRecipes);
}

