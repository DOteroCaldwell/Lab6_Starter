// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9.
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10.
  const mainElem = document.querySelector('main');
  // A11.
  recipes.forEach(recipeData => {
    const card = document.createElement('recipe-card');
    card.data = recipeData;
    mainElem.append(card);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // B1. Store the stringified recipes array
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. Reference to the form
  const form = document.getElementById('new-recipe');
  // Reference to <main>
  const mainElem = document.querySelector('main');
  // B10. Reference to the clear button
  const clearButton = document.querySelector('button.danger');

  // B3. Handle form submission
  form.addEventListener('submit', event => {
    event.preventDefault();
    // B4. Gather form data
    const formData = new FormData(form);

    // B5. Build recipe object
    const recipeObject = {};
    for (let [key, value] of formData.entries()) {
      if (key === 'rating' || key === 'numRatings') {
        recipeObject[key] = Number(value);
      } else {
        recipeObject[key] = value;
      }
    }
    // recipeObject.imgSrc = 'assets/images/Oreo.jpg';

    // B6. Create and populate recipe-card
    const card = document.createElement('recipe-card');
    // B7.
    card.data = recipeObject;
    // B8.
    mainElem.append(card);

    // B9. Persist updated recipes
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);

    form.reset();
  });

  // B11. Handle clearing storage
  clearButton.addEventListener('click', () => {
    // B12.
    localStorage.clear();
    // B13.
    mainElem.innerHTML = '';
  });
}
