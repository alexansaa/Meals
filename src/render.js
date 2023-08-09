import _ from 'lodash';
import { doGet, doPost } from './webRequest.js';
import Meal from './MealManager.js';

export const mealCtn = document.querySelector('#mealsContainer');

export const renderFunction = (mealArray) => {
  mealCtn.innerHTML = '';
  if (mealArray === null || mealArray.length === 0) {
    return;
  }
  mealArray.forEach((meal) => {
    const mealElmnt = document.createElement('div');
    mealElmnt.classList.add('meal-element');

    const mealName = document.createElement('h2');
    mealName.textContent = meal.strMeal;

    const mealCategory = document.createElement('p');
    mealCategory.textContent = `Category: ${meal.strCategory}`;

    const mealInstructions = document.createElement('p');
    mealInstructions.textContent = meal.strInstructions;

    mealElmnt.appendChild(mealName);
    mealElmnt.appendChild(mealCategory);
    mealElmnt.appendChild(mealInstructions);

    // Open  pop-up 
    mealElmnt.addEventListener('click', () => {
      renderSingleMealPopup(meal);
    });

    mealCtn.appendChild(mealElmnt);
  });
};

export const renderSingleMealPopup = (meal) => {
    
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
  
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
  
    const popupMealName = document.createElement('h2');
    popupMealName.textContent = meal.strMeal;
  
    const popupMealCategory = document.createElement('p');
    popupMealCategory.textContent = `Category: ${meal.strCategory}`;
  
    const popupMealInstructions = document.createElement('p');
    popupMealInstructions.textContent = meal.strInstructions;
  
    popupMealName.classList.add('meal-element');
    popupMealCategory.classList.add('meal-element');
    popupMealInstructions.classList.add('meal-element');
  
    popupContent.appendChild(popupMealName);
    popupContent.appendChild(popupMealCategory);
    popupContent.appendChild(popupMealInstructions);
  
    const closeButton = document.createElement('span');
    closeButton.classList.add('popup-close');
    closeButton.textContent = 'Close';
  
    popupContainer.appendChild(popupContent);
    popupContainer.appendChild(closeButton);
  
    document.body.appendChild(popupContainer);
  
    closeButton.addEventListener('click', () => {
      document.body.removeChild(popupContainer);
    });
  };

/*// Ejemplo de cómo usar la clase Meal y los métodos
async function main() {
  try {
    //  comidas aleatorias usando el método GetMealRandom de la clase Meal
    await Meal.GetMealRandom(5); //  5 comidas al azar
    const randomMeals = Meal.meals;

    //Renderiza las comidas aleatorias en la página principal
    renderFunction(randomMeals);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();*/


