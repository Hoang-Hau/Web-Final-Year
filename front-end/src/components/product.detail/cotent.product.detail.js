import React, { Component } from "react";
import storeConfig from "../../config/storage.config";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
class ContentProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      notificationComment: "",
      comment: "",
      quantity: 1,
      noti: false,
      show:false,
      pagination: [],
      size:'',
      setNotificationAddCart:'',
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
    if (storeConfig.getUser() !== null) {
      this.setState({
        name: storeConfig.getUser().firstName,
        email: storeConfig.getUser().email
      });
    } else {
      this.setState({
        name: "",
        email: ""
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.islogin === false) {
      this.setState({
        name: "",
        email: ""
      });
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  handlename = name => {
    if (this.state.name === "") {
      this.setState({ name: name });
    }
  };
  submitComment = () => {
    if (this.state.name === "") {
      this.setState({ notificationComment: "Name must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    if (this.state.comment === "") {
      this.setState({ notificationComment: "Comment must not be blank " });
      return;
    } else {
      this.setState({ notificationComment: "" });
    }
    this.props.submitComment(
      this.state.name,
      this.state.email,
      this.state.comment,
      this.props.id_product
    );
    this.setState({ comment: "" });
  };
  submitOrder = () => {
    let product = {...this.props.mproductDetail};
    product.count = this.state.quantity;
    product.size = this.state.size;
    if(product.size==='' || product.count < 1){
     
      this.setState({
        noti: true,
        setNotificationAddCart: 'Vui lòng chọn size và số lượng'
      })
      return
    }else{
      this.props.addToCart(product);
      this.setState({
        noti: true,
        setNotificationAddCart: 'Sản phẩm đã được thêm vào giỏ hàng',
      })
    }
    
  };
  render() {
    let xhtml='';
    console.log(this.state.noti);
    if(this.state.noti){
      xhtml = <div className='aler-box'>
        <div className='btn-close ' onClick={() => this.setState({ noti: false })}>
          X
        </div>
      <div className='aler-title'>
        <h3 className='title'>Thông Tin Đơn Hàng</h3>
      </div>
      <div className='aler-body'>{this.state.setNotificationAddCart}</div>
      <div className='alert-footer'>
        <button className="roduct-variation" onClick={() => this.setState({ noti: false })}>
          Cancel
          
        </button>
      </div>
    </div>
    }
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">
                  {this.props.category.map((element, index) => {
                    return (
                      <div key={index} className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a key={index}>{element.name}</a>
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
            </div>
            <div className="col-sm-9 padding-right">
              <div className="product-details">
                <div className="col-sm-5">
                  <div >
                    <img style={{height:"380px",width:"350px",overflow:"hidden"}} src={this.props.mproductDetail.img} alt="" />
                  </div>
                 
                </div>
                <div className="col-sm-7">
                  <div className="product-information">
                    <img
                      src="/assets/images/product-details/new.jpg"
                      className="newarrival"
                      alt=""
                    />
                    <h2>{this.props.mproductDetail.name}</h2>
                   
                    <img src="images/product-details/rating.png"  alt="" />

                    <span>
                      <div>
                        <span>Giá:</span>
                        <span>{this.props.mproductDetail.price}</span>
                        
                      </div>
                      <div className='count-product'>
                        <p className='count'>Số Lượng:</p>
                        <input
                        type="number"
                        min="0"
                        onChange={e =>
                          this.setState({ quantity: e.target.value })
                        }
                        value={this.state.quantity}
                      />
                      </div>
                      <div className="product-size row">
                    <label className="col-3">Size:</label>
                    <div className="col-9">
                      <select onChange={(e) => this.setState({
                        size: e.target.value
                      })} className='size'>
                        <option
                          value=""
                          disabled
                          selected
                          style={{ display: "none" }}
                        >
                          Chọn Size
                        </option>
                        {this.props.mproductDetail.size[0] !== undefined ?  this.props.mproductDetail.size[0]
                          .split(",")
                          .map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          )) : null}
                      </select>
                    </div>
                  </div>
                      <button
                        onClick={() => this.submitOrder()}
                        type="button"
                        className="btn btn-default cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Thêm giỏ hàng
                      </button>
                    </span>
                    <p>{this.state.noti}</p>
                    <p>
                      <b>Danh mục:</b> {this.props.nameCategory}
                    </p>
                    <p>
                      <b>Ngày tạo</b>{" "}
                      {new Date(
                        this.props.mproductDetail.release_date
                      ).toDateString("yyyy-MM-dd")}
                    </p>
                  
                   
                  </div>
                  <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    container={this}
                    aria-labelledby="contained-modal-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title">
                        showfication
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.setNotificationAddCart}</Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => this.setState({ show: false })}>
                        <a>Cancel</a>
                      </Button>
                      
                    </Modal.Footer>
                  </Modal>
                </div>
                {xhtml}
               
                  {/* <div className="col-sm-12 review-product">
                    <div>
                      <h3>Review Sản Phẩm</h3>
                    </div>
                   
                  </div> */}
                  <div className="tab-content">

                    <div className="tab-pane fade active in" id="reviews">
                      <div className="col-sm-12">
                        {/* <div className="content-conment">
                          {this.props.comment.map((element, index) => {
                            return (
                              <p>
                                <span>{element.name}:</span> {element.comment}
                              </p>
                            );
                          })}
                          <div className='Pagination-flex'>
                            {this.renderPagination()}
                          </div>
                         
                        </div>
                        <hr />
                        <p style={{ color: "#5BBCEC" }}>
                          {this.state.notificationComment}
                        </p> */}
                          
                        <div>
                          <h3>Miêu tả sản phẩm</h3>
                          <p>{this.props.mproductDetail.describe}</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
             
               
              </div>
            </div>
          </div>
        </div>
             
      </section>
    );
  }
}
export default ContentProductDetail;
