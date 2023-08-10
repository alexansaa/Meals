export const mealCtn = document.querySelector('#mealsContainer');
export const singleMealCtn = document.querySelector('#contentContainer');

function renderComments(commentsObjArr) {
  const myContainer = document.querySelector('#myCommentsCtn');
  commentsObjArr.forEach((cmt) => {
    const tmpCmt = document.createElement('p');
    tmpCmt.textContent = `${cmt.creation_date} ${cmt.username}: ${cmt.comment}`;
    myContainer.appendChild(tmpCmt);
  });
}

export const renderSingleMealPopup = async (meal) => {
  await meal.GetComments();

  const singleCtn = document.createElement('div');
  singleCtn.classList.add('overlay');

  const mealSingle = document.createElement('div');
  mealSingle.classList.add('overlay-content');
  mealSingle.classList.add('my-3');
  mealSingle.classList.add('mx-3');
  mealSingle.classList.add('border');
  mealSingle.classList.add('border-dark');
  mealSingle.classList.add('border-3');

  const imgX = document.createElement('img');
  imgX.classList.add('iconX');

  const imgCnt = document.createElement('div');
  imgCnt.classList.add('singleMealCtn');

  const imgMeal = document.createElement('img');
  imgMeal.classList.add('w-75');
  imgMeal.classList.add('d-block');
  imgMeal.classList.add('mx-auto');
  imgMeal.src = meal.strMealThumb;

  imgCnt.appendChild(imgMeal);

  const cntCnt = document.createElement('div');
  cntCnt.classList.add('w-75');
  cntCnt.classList.add('mx-auto');

  const popupMealName = document.createElement('h2');
  popupMealName.classList.add('text-center');
  popupMealName.classList.add('py-2');
  popupMealName.textContent = meal.strMeal;

  const popupMealCategory = document.createElement('p');
  popupMealCategory.textContent = `Category: ${meal.strCategory}`;

  const popupMealInstructions = document.createElement('p');
  popupMealInstructions.textContent = `Preparation: ${meal.strInstructions}`;

  cntCnt.appendChild(popupMealName);
  cntCnt.appendChild(popupMealCategory);
  cntCnt.appendChild(popupMealInstructions);

  const commentsCtn = document.createElement('div');
  commentsCtn.classList.add('w-75');
  commentsCtn.classList.add('mx-auto');

  const commentsName = document.createElement('h3');
  commentsName.classList.add('text-center');
  commentsName.classList.add('py-2');
  commentsName.textContent = 'Comments (7)';

  const myCommentsCtn = document.createElement('div');
  myCommentsCtn.classList.add('w-75');
  myCommentsCtn.classList.add('mx-auto');
  myCommentsCtn.id = 'myCommentsCtn';

  commentsCtn.appendChild(commentsName);

  const addComntCtn = document.createElement('div');
  addComntCtn.classList.add('w-75');
  addComntCtn.classList.add('mx-auto');
  addComntCtn.classList.add('d-flex');
  addComntCtn.classList.add('flex-column');

  const addCommentsName = document.createElement('h3');
  addCommentsName.classList.add('text-center');
  addCommentsName.classList.add('py-2');
  addCommentsName.textContent = 'Add a comment';

  const nameInput = document.createElement('input');
  nameInput.classList.add('border');
  nameInput.classList.add('border-dark');
  nameInput.classList.add('border-3');
  nameInput.classList.add('my-2');
  nameInput.classList.add('w-25');
  nameInput.placeholder = 'Your Name';

  const insightInput = document.createElement('input');

  const textInsight = document.createElement('textarea');
  textInsight.classList.add('border');
  textInsight.classList.add('border-dark');
  textInsight.classList.add('border-3');
  textInsight.classList.add('my-2');
  textInsight.classList.add('w-50');
  textInsight.rows = 9;
  textInsight.cols = 12;
  textInsight.placeholder = 'Your insights';

  insightInput.appendChild(textInsight);

  const commentBtn = document.createElement('button');
  commentBtn.classList.add('w-25');
  commentBtn.textContent = 'Comment';
  commentBtn.type = 'button';

  addComntCtn.appendChild(addCommentsName);
  addComntCtn.appendChild(nameInput);
  addComntCtn.appendChild(textInsight);
  addComntCtn.appendChild(commentBtn);

  mealSingle.appendChild(imgX);
  mealSingle.appendChild(imgCnt);
  mealSingle.appendChild(cntCnt);
  mealSingle.appendChild(commentsCtn);
  mealSingle.appendChild(myCommentsCtn);
  mealSingle.appendChild(addComntCtn);

  singleCtn.appendChild(mealSingle);

  singleMealCtn.appendChild(singleCtn);

  renderComments(meal.comments);

  imgX.addEventListener('click', () => {
    singleCtn.remove();
  });

  commentBtn.addEventListener('click', async () => {
    const user = nameInput.value;
    const comment = textInsight.value;
    if (await meal.PostComment(user, comment)) {
      renderComments(meal.comments);
    }
  });
};

export const renderFunction = (mealArray) => {
  mealCtn.innerHTML = '';
  if (mealArray === null || mealArray.length === 0) {
    return;
  }
  mealArray.forEach((meal) => {
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
