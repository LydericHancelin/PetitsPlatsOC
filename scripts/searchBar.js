import recipes from '../data/recipes.js';

const $searchBar = document.getElementById("search")

$searchBar.addEventListener("input", handleSearchBarChange)

function handleSearchBarChange(e){
    if (canResearch(e.target.value)){
        research(recipes, e.target.value, [], []);
    }
}

function canResearch(searchValue){
    return searchValue.length >= 3
}