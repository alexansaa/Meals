import { describe, expect, test } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { mainConter, renderFunction } from './src/renderUtilsTwo.js';
import Meal from './src/MealManager.js';

// setting up the mock document
const { document } = new JSDOM('<!doctype html><html><body><div id="mealsContainer"></div></body></html>').window;
global.document = document;

describe('Meals Items Counter', () => {
  test('correclty count meals rendered', () => {
    // Arrange
    const myMeals = [
      new Meal(52772, 'area 1', 'category 1', 'the instructions', 'meal name', 'meal pic url', 'source 1', 'youtube link'),
      new Meal(52773, 'area 1', 'category 1', 'the instructions', 'meal name', 'meal pic url', 'source 1', 'youtube link'),
      new Meal(52774, 'area 1', 'category 1', 'the instructions', 'meal name', 'meal pic url', 'source 1', 'youtube link'),
      new Meal(52775, 'area 1', 'category 1', 'the instructions', 'meal name', 'meal pic url', 'source 1', 'youtube link'),
      new Meal(52776, 'area 1', 'category 1', 'the instructions', 'meal name', 'meal pic url', 'source 1', 'youtube link'),
      new Meal(52777, 'area 1', 'category 1', 'the instructions', 'meal name', 'meal pic url', 'source 1', 'youtube link'),
    ];

    // Act
    renderFunction(myMeals);

    // Assert
    expect(mainConter).toBe(6);
  });
});