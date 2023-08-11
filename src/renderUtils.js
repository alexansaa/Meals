let myCommentsCounter = 0;
export const commentsCounter = () => myCommentsCounter;

export const renderComments = (commentsObjArr) => {
  const myContainer = document.querySelector('#myCommentsCtn');
  const titleContainer = document.querySelector('#titleComments');
  myCommentsCounter = 0;
  myContainer.textContent = '';
  commentsObjArr.forEach((cmt) => {
    myCommentsCounter += 1;
    const tmpCmt = document.createElement('p');
    tmpCmt.textContent = `${cmt.creationDate} ${cmt.username}: ${cmt.comment}`;
    myContainer.appendChild(tmpCmt);
  });
  titleContainer.textContent = `Comments (${myCommentsCounter})`;
};