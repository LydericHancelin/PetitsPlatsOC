const $gridcard = document.querySelector(".grid-cards")

export function displayRecipes(recipes) {
    $gridcard.innerHTML = ""
    recipes.forEach(element => {
        $gridcard.appendChild(getRecipeCardDOM(element))
    });

    function getRecipeCardDOM(element) {
        const card = document.createElement('div')
        card.classList.add('card')
        const picture = document.createElement('div')
        picture.classList.add('picture')
        const recette = document.createElement('div')
        recette.classList.add("recette")
        const title = document.createElement('div')
        title.classList.add("title")
        const h1 = document.createElement('h1')
        h1.classList.add("recipeTitle")
        h1.textContent = element.name
        const span = document.createElement('span')
        const p = document.createElement("p")
        p.textContent = element.time + " min"
        const img = document.createElement('img')
        img.setAttribute("src", "presentation/images/timer.svg")
        const text = document.createElement('div')
        text.classList.add("text");
        const ul = document.createElement('ul')
        ul.classList.add("ingredients")
        element.ingredients.forEach(object => {
            const li = document.createElement('li')
            if (!!object.quantity) {
                if (!!object.unit) {
                    li.textContent = object.ingredient + " : " + object.quantity + " " + object.unit
                }
                else {
                    li.textContent = object.ingredient + " : " + object.quantity
                }
            } else {
                li.textContent = object.ingredient
            }

            ul.appendChild(li)
        })
        const desc = document.createElement("div")
        desc.classList.add("desc")
        desc.textContent = element.description
        text.appendChild(ul)
        text.appendChild(desc)
        span.appendChild(img)
        span.appendChild(p)
        title.appendChild(h1)
        title.appendChild(span)
        recette.appendChild(title)
        recette.appendChild(text)
        card.appendChild(picture)
        card.appendChild(recette)
        return (card)
    }
}