'use strict'
const restaurant_controller = require('../controllers/restaurant.controller');
module.exports = (app) => {
    app.route('/restaurant')
        .get(restaurant_controller.getRestaurant);
    app.route('/restaurant/all/:page')
        .get(restaurant_controller.getAll);
    app.route('/restaurant/name/:id')
        .get(restaurant_controller.getNameByID)
}