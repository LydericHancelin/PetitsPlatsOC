async function getRecipes () {
    // On récupère l'ensemble des données liées aux recettes dans le js
    const response = await fetch('/data/recipes.js')
    if (!response.ok) {
      return []
    }
    console.log(response)
    const body = await response.data
    const recipes = body.recipes
    return recipes
}

const $searchBar = document.getElementById("search")
const recipes = getRecipes()

$searchBar.addEventListener("change", handleSearchBarChange)

function handleSearchBarChange(e){
    if (canResearch(e.target.value)){
        research(recipes, e.target.value);
    }
}

function canResearch(searchValue){
    searchValue.length >= 3
}