import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as foodActions from '../actions/food.action'
import Category from '../components/category/category'
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import storeConfig from '../config/store.config'
import Modal from "react-modal";

class CategoryContainer extends Component {
    constructor() {
        super();
        this.state={
            isOpen:false,
          }
    }
    async componentWillMount() {
        this.props.foodActions.getCategory()
        let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
    }
    componentWillReceiveProps(nextProps) {
        if (
          nextProps.islogin !== this.props.islogin &&
          nextProps.islogin === false
        ) {
          this.props.history.push("/login");
        }
        if (nextProps.page !== this.props.page) {
            this.props.foodActions.getCategory();
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
            <NavbarContainer/>
            <Slider handleClickUser = {()=>this.handleClickUser()} />
            <Category
                category={this.props.category}
                addCategory={(name) => this.props.foodActions.addCategory(name)}
                isadd={this.props.isadd}
                updateCategory={(id, name) => this.props.foodActions.updateCategory(id, name)}
                deleteCategory={(id) => this.props.foodActions.deleteCategory(id)}
                isupdate={this.props.isupdate}
                page={this.props.page}
                totalpage={this.props.totalpage}
                backPage={() => this.props.foodActions.categoryBackPage()}
                nextPage={() => this.props.foodActions.categoryNextPage()}
                setPage={page => this.props.foodActions.categorySetPage(page)}
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
            
        )
    }
}
const mapStateToProps = state => ({
    category: state.foodReducers.category.data,
    isadd: state.foodReducers.category.isadd,
    isupdate: state.foodReducers.category.isupdate,
    islogin: state.userReducers.user.islogin,
    totalpage: state.foodReducers.category.totalpage,
    page: state.foodReducers.category.page
})

const mapDispatchToProps = dispatch => {
    return ({
        foodActions: bindActionCreators(foodActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryContainer)