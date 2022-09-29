import {setsearchBarValue, updateRecipes} from './page.js'

const $searchBar = document.getElementById("search")

$searchBar.addEventListener("input", handleSearchBarChange)

function handleSearchBarChange(e){
    if (canResearch(e.target.value)){
        setsearchBarValue(e.target.value);
    }
}

function canResearch(searchValue){
    return searchValue.length >= 3
}