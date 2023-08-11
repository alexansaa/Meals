import { describe, expect, test } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { renderComments, commentsCounter } from './src/renderUtils.js';
import Comment from './src/Comment.js';

// setting up the mock document
const { document } = new JSDOM('<!doctype html><html><body><h3 id="titleComments"></h3><div id="myCommentsCtn"></div></body></html>').window;
global.document = document;

describe('Meals Coments Counter', () => {
  test('correclty count comments rendered', () => {
    // Arrange
    const crrDate = new Date();
    const myDate = `${crrDate.getFullYear()}-${crrDate.getMonth() + 1}-${crrDate.getDay()}`;
    const myComments = [
      new Comment('my comment 1', myDate, 'my user 1'),
      new Comment('my comment 2', myDate, 'my user 2'),
      new Comment('my comment 3', myDate, 'my user 3'),
    ];

    // Act
    renderComments(myComments);

    // Assert
    expect(commentsCounter).toBe(3);
  });
});
