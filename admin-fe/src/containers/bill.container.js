import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/food.action";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import Bill from "../components/bill/bill";
import storeConfig from '../config/store.config'
import Modal from "react-modal";

class BillContainer extends Component {
  constructor() {
    super();
    this.state={
      isOpen:false,
    }
  }
  async componentWillMount() {
    this.props.productActions.getBill("true");
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
        <Slider  handleClickUser = {()=>this.handleClickUser()}/>
        <Bill
         updateIssend={(name,id) =>
          this.props.productActions.updateIssend(name,id)
         }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          bill={this.props.bill}
          backPage={() => this.props.productActions.billBackPage()}
          nextPage={() => this.props.productActions.billNextPage()}
          setPage={page => this.props.productActions.billSetPage(page)}
          getBill={(status => this.props.productActions.getBill(status))}
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
  islogin: state.userReducers.user.islogin,
  totalpage: state.foodReducers.bill.totalpage,
  page: state.foodReducers.bill.page,
  bill: state.foodReducers.bill.data
});

const mapDispatchToProps = dispatch => {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillContainer);
