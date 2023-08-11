import { renderSingleMealPopup } from './render.js';

export var mainConter = 0;

export const renderFunction = (mealArray) => {
    const mealCtn = document.querySelector('#mealsContainer');
    mealCtn.innerHTML = '';
    if (mealArray === null || mealArray.length === 0) {
      return;
    }
    mealArray.forEach((meal) => {
      mainConter += 1;
  
      const mealElmnt = document.createElement('div');
      mealElmnt.classList.add('col-6');
      mealElmnt.classList.add('col-md-4');
      mealElmnt.classList.add('col-lg-3');
  
      const imgMeal = document.createElement('img');
      imgMeal.classList.add('w-100');
      imgMeal.src = meal.strMealThumb;
  
      const nameCtn = document.createElement('div');
      nameCtn.classList.add('d-flex');
      nameCtn.classList.add('flex-row');
      const mealName = document.createElement('h2');
      mealName.textContent = meal.strMeal;
      const likeBtn = document.createElement('img');
      likeBtn.classList.add('iconLike');
      nameCtn.appendChild(mealName);
      nameCtn.appendChild(likeBtn);
  
      const likeQty = document.createElement('p');
      likeQty.textContent = `Likes ${meal.GetLikeQty()}`;
  
      const comentBtn = document.createElement('button');
      comentBtn.textContent = 'Comment';
      comentBtn.type = 'button';
  
      mealElmnt.appendChild(imgMeal);
      mealElmnt.appendChild(nameCtn);
      mealElmnt.appendChild(likeQty);
      mealElmnt.appendChild(comentBtn);
  
      // Open  pop-up
      imgMeal.addEventListener('click', () => {
        renderSingleMealPopup(meal);
      });
  
      // Like action
      likeBtn.addEventListener('click', async () => {
        if (await meal.PostLike()) {
          likeQty.textContent = `Likes ${meal.GetLikeQty()}`;
        }
      });
  
      // Comment action
      comentBtn.addEventListener('click', () => {
        renderSingleMealPopup(meal);
      });
  
      mealCtn.appendChild(mealElmnt);
    });
  };