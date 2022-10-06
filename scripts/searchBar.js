import {setsearchBarValue, updateRecipes} from './page.js'

const $searchBar = document.getElementById("search")

$searchBar.setAttribute("data-error", "Oh oh, la recette que vous recherchez n'existe pas encore, veuillez tenter autre chose.");

$searchBar.addEventListener("input", handleSearchBarChange)

function handleSearchBarChange(e){
    if (canResearch(e.target.value)){
        setsearchBarValue(e.target.value);
    }
}

function canResearch(searchValue){
    return searchValue.length >= 3
}

export function displayErrorMessage(){
    $searchBar.setAttribute('data-error-visible', true)
}