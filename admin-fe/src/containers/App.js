import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./home.container";
import FoodContainer from "./food.container";
import CategoryContainer from "./category.container";
import AuthorContainer from "./author.container";
import RestaurantContainer from "./restaurant.container";
import UserContainer from "./user.container";
import LoginContainer from "./login.container";
import StatisticalContainer from './statistical.container'
import BillContainer from './bill.container'
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/productmanager" component={FoodContainer} />
          <Route exact path="/categorymanager" component={CategoryContainer} />
          <Route exact path="/authormanager" component={AuthorContainer} />
          <Route exact path="/restaurantmanager" component={RestaurantContainer} />
          <Route exact path="/usermanager" component={UserContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/statistical" component={StatisticalContainer} />
          <Route exact path="/billmanager" component={BillContainer} />
        </Switch>
      </Router>
    );
  }
}
export default App;
