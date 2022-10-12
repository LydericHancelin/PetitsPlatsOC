import {setsearchBarValue, triggerResearch} from './page.js'

const $searchBar = document.getElementById("search")
const $error = document.getElementById("error")

$searchBar.addEventListener("input", handleSearchBarChange)

function handleSearchBarChange(e){
    if (canResearch(e.target.value)){
        setsearchBarValue(e.target.value);
    }
    else{
        setsearchBarValue("")
    }
}

function canResearch(searchValue){
    return searchValue.length >= 3
}

export function setErrorVisible(errorVisible){
    if (errorVisible){
        $error.style.display = "block"
    }
    else {
        $error.style.display = "none"
    }
}