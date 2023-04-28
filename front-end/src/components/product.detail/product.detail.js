import React, { Component } from "react";
import FooterBottom from "../footer/footer.bottom";
import FooterMiddle from "../footer/footer.middle";
import FooterTop from "../footer/footer.top";
import HeaderMiddle from "../header/header.middle";
import ContentProductDetail from "./cotent.product.detail";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <header id="header">
          <HeaderMiddle
            islogin={this.props.islogin}
            logout={() => this.props.logout()}
            history={this.props.history}
          />
        </header>
        <ContentProductDetail
          category={this.props.category}
          mproductDetail={this.props.mproductDetail}
          nameCategory={this.props.nameCategory}
          productrelated={this.props.productrelated}
          islogin={this.props.islogin}
          id_product={this.props.id_product}
          submitComment={(name, email, comment, id_product) =>
            this.props.submitComment(name, email, comment, id_product)
          }
        />
        <footer id="footer">
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </footer>
      </div>
    );
  }
}
export default ProductDetail;
