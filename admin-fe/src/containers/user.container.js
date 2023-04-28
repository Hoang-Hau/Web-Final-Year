import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user.action";
import User from "../components/user/user";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import storeConfig from '../config/store.config'
import Modal from "react-modal";

class UserContainer extends Component {
  constructor() {
    super();
    this.state={
      isOpen:false,
    }
  }
  async componentWillMount() {
    this.props.userActions.getUser();
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
      this.props.userActions.getUser();
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
    console.log('use ne',this.props.user);
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider handleClickUser = {()=>this.handleClickUser()} />
        <User
          user={this.props.user}
          isadd={this.props.isadd}
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.userActions.backPage()}
          nextPage={() => this.props.userActions.nextPage()}
          setPage={page => this.props.userActions.setPage(page)}
          updateUser={(
            email,
            firstName,
            lastName,
            address,
            phone_number,
            is_admin,
            is_manage,
          ) =>
            this.props.userActions.updateUser(
              email,
              firstName,
              lastName,
              address,
              phone_number,
              is_admin,
              is_manage
            )
          }
          deleteUser={email => this.props.userActions.deleteUser(email)}
          addUser={(
            email,
            password,
            firstName,
            lastName,
            address,
            phone_number,
            is_admin,
            is_manage
          ) =>
            this.props.userActions.addUser(
              email,
              password,
              firstName,
              lastName,
              address,
              phone_number,
              is_admin,
              is_manage
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
  user: state.userReducers.user.data,
  isadd: state.userReducers.user.isadd,
  isupdate: state.userReducers.user.isupdate,
  totalpage: state.userReducers.user.totalpage,
  page: state.userReducers.user.page,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
