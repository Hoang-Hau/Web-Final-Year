import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as foodActions from "../actions/food.action";
import Restaurant from "../components/restaurant/restaurant";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class RestaurantContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.foodActions.getRestaurant();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
    if (nextProps.page !== this.props.page) {
      this.props.foodActions.getRestaurant();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Restaurant
          restaurant={this.props.restaurant}
          isadd={this.props.isadd}
          addRestaurant={name => this.props.foodActions.addRestaurant(name)}
          deleteRestaurant={(id) => this.props.foodActions.deleteRestaurant(id)}
          updateRestaurant={(id, name) =>
            this.props.foodActions.updateRestaurant(id, name)
          }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.foodActions.restaurantBackPage()}
          nextPage={() => this.props.foodActions.restaurantNextPage()}
          setPage={page => this.props.foodActions.restaurantSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  restaurant: state.foodReducers.restaurant.data,
  isadd: state.foodReducers.restaurant.isadd,
  isupdate: state.foodReducers.restaurant.isupdate,
  islogin: state.userReducers.user.islogin,
  totalpage: state.foodReducers.restaurant.totalpage,
  page: state.foodReducers.restaurant.page
});

const mapDispatchToProps = dispatch => {
  return {
    foodActions: bindActionCreators(foodActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantContainer);
