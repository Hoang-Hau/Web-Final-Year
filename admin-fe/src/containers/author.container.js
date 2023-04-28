import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/food.action";
import Author from "../components/author/author";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
class AuthorContainer extends Component {
  constructor() {
    super();
  }
  async componentWillMount() {
    this.props.productActions.getAuthor();
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
      this.props.productActions.getAuthor();
    }
  }
  render() {
    return (
      <section id="container" className="">
        <NavbarContainer />
        <Slider />
        <Author
          author={this.props.author}
          isadd={this.props.isadd}
          addAuthor={name => this.props.productActions.addAuthor(name)}
          updateAuthor={(id, name) =>
            this.props.productActions.updateAuthor(id, name)
          }
          isupdate={this.props.isupdate}
          page={this.props.page}
          totalpage={this.props.totalpage}
          backPage={() => this.props.productActions.authorBackPage()}
          nextPage={() => this.props.productActions.authorNextPage()}
          setPage={page => this.props.productActions.authorSetPage(page)}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  author: state.productReducers.author.data,
  isadd: state.productReducers.author.isadd,
  isupdate: state.productReducers.author.isupdate,
  islogin: state.userReducers.user.islogin,
  totalpage: state.productReducers.author.totalpage,
  page: state.productReducers.author.page
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
)(AuthorContainer);
