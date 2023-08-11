import './style.css';
import Meal from './MealManager.js';
import { renderFunction } from './render.js';

const iconElement = document.querySelector('#iconImg');
iconElement.classList.add('iconImg');

await Meal.GetLikes();

await Meal.GetMealRandom();
renderFunction(Meal.meals);