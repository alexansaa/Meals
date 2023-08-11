export let commentsCounter = 0;

export const renderComments = (commentsObjArr) => {
  const myContainer = document.querySelector('#myCommentsCtn');
  const titleContainer = document.querySelector('#titleComments');
  commentsCounter = 0;
  myContainer.textContent = '';
  commentsObjArr.forEach((cmt) => {
    commentsCounter += 1;
    const tmpCmt = document.createElement('p');
    tmpCmt.textContent = `${cmt.creationDate} ${cmt.username}: ${cmt.comment}`;
    myContainer.appendChild(tmpCmt);
  });
  titleContainer.textContent = `Comments (${commentsCounter})`;
};