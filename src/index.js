import './style.css';
import Meal from './MealManager.js';
import { mainConter } from './renderUtils.js';
import { renderFunction} from './renderUtilsTwo.js';

const mealsTitle = document.querySelector('#mealsTitle');
const iconElement = document.querySelector('#iconImg');
iconElement.classList.add('iconImg');

await Meal.GetLikes();

await Meal.GetMealRandom();
renderFunction(Meal.meals);

mealsTitle.textContent = `Meals (${mainConter})`;