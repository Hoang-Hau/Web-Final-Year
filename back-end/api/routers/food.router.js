'use strict'
const food_controller = require('../controllers/food.controller');
module.exports = (app) => {
    app.route('/food/totalpage')
        .get(food_controller.getTotalPage);

    app.route('/food/allfood')
        .post(food_controller.getAllFood);

    app.route('/food/publisher')
        .post(food_controller.getFoodByPublisher);

    app.route('/food/category')
        .post(food_controller.getFoodByCategory);

    app.route('/food/author')
        .post(food_controller.getFoodByAuthor);

    app.route('/food/:id')
        .get(food_controller.getFoodByID)

    app.route('/food/related/:foodId')
        .get(food_controller.getRelatedFood)
}