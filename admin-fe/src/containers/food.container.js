import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as foodActions from "../actions/food.action";
import Food from "../components/food/food";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import storeConfig from '../config/store.config'
import Modal from "react-modal";


class FoodContainer extends Component {
  constructor() {
    super();
    this.state={
      isOpen:false,
    }
  }
  async componentWillMount() {
    this.props.foodActions.getCategory();
    this.props.foodActions.getFood();
    this.props.foodActions.getRestaurant();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.foodActions.getFood();
    }
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
    }
  }
  handleClickUser = () =>{
    if(storeConfig.getUser().is_admin) {
      this.props.history.push('/usermanager')
    }else{
      this.setState({
        isOpen:true,
      })
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider handleClickUser = {()=>this.handleClickUser()} />
        <Food
          food={this.props.food}
          totalpage={this.props.totalpage}
          page={this.props.page}
          category={this.props.category}
          restaurant={this.props.restaurant}
          deletefood={id => this.props.foodActions.deleteFood(id)}
          backPage={() => this.props.foodActions.backPage()}
          nextPage={() => this.props.foodActions.nextPage()}
          setPage={page => this.props.foodActions.setPage(page)}
          isadd={this.props.isadd}
          setSearchText = {(value) => this.props.foodActions.setSearchText(value)}
          searchTextSubmit={() => this.props.foodActions.searchTextSubmit()}
          isupdate={this.props.isupdate}
          addFood={(
            category,
            id_category,
            restaurant,
            id_restaurant,
            name,
            price,
            release_date,
            describe,
            chef,
            file,
            amount
          ) =>
            this.props.foodActions.addFood(
              category,
              id_category,
              restaurant,
              id_restaurant,
              name,
              price,
              release_date,
              describe,
              chef,
              file,
              amount
            )
          }
          updatefood={(
            id,
            name,
            category,
            id_category,
            restaurant,
            id_restaurant,
            price,
            release_date,
            describe,
            chef,
            file,
            amount
          ) =>
            this.props.foodActions.updateFood(
              id,
              name,
              category,
              id_category,
              restaurant,
              id_restaurant,
              price,
              release_date,
              describe,
              chef,
              file,
              amount
            )
          }
        />
        <Modal
            isOpen={this.state.isOpen}
            contentLabel="Example Modal"
            className="modal-cart"
          >
            <div>
              <div className="modal-title">
              <i class="fas fa-exclamation-circle"></i>
                <h2>Thông báo</h2>
              </div>
              <div className="modal-content-cart">
                <div className="modal-content-title">
                  Bạn cần phải là Admin mới có thể truy cập
                </div>
                <div className="btn-close-modal">
                  <button
                    className="btn btn-modal-cart"
                    onClick={() => {
                      this.setState({
                        isOpen:false
                      });
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  food: state.foodReducers.food.data,
  totalpage: state.foodReducers.food.totalpage,
  page: state.foodReducers.food.page,
  category: state.foodReducers.category.data,
  restaurant: state.foodReducers.restaurant.data,
  isadd: state.foodReducers.food.isadd,
  isupdate: state.foodReducers.food.isupdate,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    foodActions: bindActionCreators(foodActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodContainer);
