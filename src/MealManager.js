import Like from './Like.js';
import Comment from './Comment.js';
import _ from 'lodash';
import { doGet, doPost } from './webRequest.js';

// base APIs urls
// Meal Database
const mealAPI = 'https://www.themealdb.com/api/json/v1/1';
const mealById = '/lookup.php?i=';
const mealRandom = '/random.php';
// Involvement data storage
const dataAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wH7OLHn1qj0rNeNeg59n';
const dataLikes = '/likes/';
const dataComments = '/comments';
const itemIdPostfix = '?item_id=';

export default class Meal {
  static meals = [];

  constructor(idMeal, strArea, strCategory, strInstructions,
    strMeal, strMealThumb, strSource, strYoutube) {
    this.idMeal = idMeal;
    this.strArea = strArea;
    this.strCategory = strCategory;
    this.strInstructions = strInstructions;
    this.strMeal = strMeal;
    this.strMealThumb = strMealThumb;
    this.strSource = strSource;
    this.strYoutube = strYoutube;
    this.comments = [];
  }

  static async GetMealRandom(number) {
    const url = _.join([mealAPI, mealRandom], '');
    const mealPromises = [];
    for (let i = 0; i < number; i += 1) {
      mealPromises.push(
        doGet(url).then((ans) => {
          const tmp = ans.meals[0];
          return new Meal(
            tmp.idMeal,
            tmp.strArea,
            tmp.strCategory,
            tmp.strInstructions,
            tmp.strMeal,
            tmp.strMealThumb,
            tmp.strSource,
            tmp.strYoutube,
          );
        }),
      );
    }
    const mealsRandArray = await Promise.all(mealPromises);
    this.meals = mealsRandArray;
  }

  static async GetMealId(idMeal) {
    const url = _.join([mealAPI, mealById, idMeal], '');
    const myMeal = await doGet(url).then((ans) => {
      const tmp = ans.meals[0];
      return new Meal(tmp.idMeal, tmp.strArea, tmp.strCategory, tmp.strInstructions, tmp.strMeal,
        tmp.strMealThumb, tmp.strSource, tmp.strYoutube);
    });
    return myMeal;
  }

  static async GetLikes() {
    const url = _.join([dataAPI, dataLikes], '');
    Like.likes = await doGet(url);
  }

  async PostLike() {
    const url = _.join([dataAPI, dataLikes], '');
    const body = {
      item_id: this.idMeal,
    };
    const tmpAns = await doPost(url, body);
    if (tmpAns.status) {
      const myMealLike = Like.likes.find((obj) => obj.idMeal === this.idMeal);
      if (myMealLike == null) {
        const myLikeObj = new Like(this.idMeal, 1);
        Like.likes.push(myLikeObj);
      } else {
        myMealLike.likesQty += 1;
      }
    }
    return tmpAns.status;
  }

  GetLikeQty() {
    const myMealLike = Like.likes.find((obj) => obj.idMeal === this.idMeal);
    if (myMealLike == null) {
      return 0;
    }
    return myMealLike.likesQty;
  }

  async PostComment(uName, uComment) {
    const url = _.join([dataAPI, dataComments], '');
    const body = {
      item_id: this.idMeal,
      username: uName,
      comment: uComment,
    };
    const tmpAns = await doPost(url, body);
    if (tmpAns.status) {
      const newCmt = new Comment(uComment, Date(), uName);
      this.comments.push(newCmt);
    }
    return tmpAns.status;
  }

  async GetComments() {
    const url = _.join([dataAPI, dataComments, itemIdPostfix, this.idMeal], '');
    this.comments = [];
    const tmpAns = await doGet(url);
    try {
      if (tmpAns.error.status === 400) {
        return;
      }
    } catch {
      tmpAns.forEach((cmt) => {
        const tmpCmt = new Comment(cmt.comment, cmt.creation_date, cmt.username);
        this.comments.push(tmpCmt);
      });
    }
  }
}