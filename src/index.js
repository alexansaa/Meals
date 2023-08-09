import _ from 'lodash';
import './style.css';
import Meal from './MealManager.js';
import { renderFunction, renderSingleMealPopup } from './render.js';

const iconElement = document.querySelector('#iconImg');
iconElement.classList.add('iconImg');

await Meal.GetMealRandom(6);

await renderFunction(Meal.meals);
