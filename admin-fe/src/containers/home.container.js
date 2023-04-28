import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homeActions from "../actions/home.action";
import Home from "../components/home/home";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import storeConfig from '../config/store.config'
import Modal from "react-modal";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state={
      isOpen:false,
    }
  }
  async componentWillMount() { 
    this.props.homeActions.getTopFood();
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
    console.log('object',this.state.noti);
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider  handleClickUser = {()=>this.handleClickUser()}/>
        <Home top_product={this.props.top_product} />
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
  top_product: state.homeReducers.home.top_product,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
