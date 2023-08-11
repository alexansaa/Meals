export default class Like {
  static likes = [];

  constructor(idMeal, likesQty) {
    this.idMeal = idMeal;
    this.likesQty = likesQty;
  }
}