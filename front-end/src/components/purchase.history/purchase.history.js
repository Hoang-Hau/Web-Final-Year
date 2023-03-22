import React, { Component } from "react";
import FooterBottom from "../footer/footer.bottom";
import FooterMiddle from "../footer/footer.middle";
import FooterTop from "../footer/footer.top";
import HeaderMiddle from "../header/header.middle";
import storeConfig from "../../config/storage.config";
class HistoryPurchase extends Component {
  constructor(props) {
    super(props);
    this.state={
      issend:'99',
      product_id: '',
      isComment : false,
      name: "",
      email: "",
      comment: "",
    }

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
  caculatorTotalBill = (products) => {
    let total = 0;
    products.map((element, index) => {
      total += element.count * element.price
    })
    return total
  }

  renderBill = () => {
    if(this.state.issend === '99'){
      let count =0;
      let xhtml = this.props.purchaseHistory.map((element, index) => {
        if (element.issend === '99') {
          count++;
          return (
            <div className="table-responsive cart_info" style={{marginBottom: "50px"}}>
              
              <span>Date: {new Date(element.date).toDateString("yyyy-MM-dd")}</span>
              <p className='cart_total_price'>Total: {this.caculatorTotalBill(element.products)}<sup>đ</sup></p>
              
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                {element.products.map((item, index) => {
                  return (
                    <tr>
                    <td className="cart_product">
                      <a href=""><img src={item.img}/></a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a>{item.name} </a>
                        <p>size: {item.size}</p>
                      </h4>
              
                    </td>
                    <td className="cart_price">
                      <p>{item.price}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <input
                          className="cart_quantity_input"
                          type="text"
                          name="quantity"
                          value={item.count}
                          autocomplete="off"
                          size="2"
                        />
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price">{item.count * item.price}</p>
                    </td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
              <div className='login-form'>
                <div className='delete-cart'>
                <button onClick={() => this.props.deleteBill(element._id)} className="destroy btn btn-default">Hủy Đơn Hàng</button>
                </div>
             
              </div>
              <hr/>
            </div>
          )
        }
       
      })
      if(count === 0){
        xhtml = <div className='no-bill'>
        <div className="logo-404">
        <div>
          <div className='null-cart'>
            <img src="https://taingay.net/wp-content/uploads/2022/02/logo-do-an-696x696-1.png" alt="" />
            
          </div>
          <h3 className='title'>Không Có Đơn Hàng</h3>
          </div>
          
        </div>
        </div>
      }
      return xhtml;
    }
    
    if(this.state.issend === '0'){
      let count =0;
      let xhtml = this.props.purchaseHistory.map((element, index) => {
        if (element.issend === '0') {
          count++;
          return (
            <div className="table-responsive cart_info" style={{marginBottom: "50px"}}>
              
              <span>Date: {new Date(element.date).toDateString("yyyy-MM-dd")}</span>
              <p className='cart_total_price'>Total: {this.caculatorTotalBill(element.products)}<sup>đ</sup></p>
              
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                {element.products.map((item, index) => {
                  return (
                    <tr>
                    <td className="cart_product">
                      <a href=""><img src={item.img}/></a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a>{item.name} </a>
                        <p>size: {item.size}</p>

                      </h4>
              
                    </td>
                    <td className="cart_price">
                      <p>{item.price}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <input
                          className="cart_quantity_input"
                          type="text"
                          name="quantity"
                          value={item.count}
                          autocomplete="off"
                          size="2"
                        />
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price">{item.count * item.price}</p>
                    </td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
              
              <hr/>
            </div>
          )
        }
       
      })
      if(count === 0){
        xhtml = <div className='no-bill'>
        <div className="logo-404">
        <div>
          <div className='null-cart'>
            <img src="https://taingay.net/wp-content/uploads/2022/02/logo-do-an-696x696-1.png" alt="" />
            
          </div>
          <h3 className='title'>Không Có Đơn Hàng</h3>
          </div>
        </div>
        </div>
      }
      return xhtml;
    }

    if(this.state.issend === '1'){
      let count =0;
      let xhtml = this.props.purchaseHistory.map((element, index) => {
        if (element.issend === '1') {
          count++;
          return (
            <div className="table-responsive cart_info" style={{marginBottom: "50px"}}>
              
              <span>Date: {new Date(element.date).toDateString("yyyy-MM-dd")}</span>
              <p className='cart_total_price'>Total: {this.caculatorTotalBill(element.products)}<sup>đ</sup> </p>
              
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                {element.products.map((item, index) => {
                  return (
                   
                    <tr>
                    <td className="cart_product">
                      <a href=""><img src={item.img}/></a>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <a>{item.name} </a>
                        <p>size: {item.size}</p>

                      </h4>
              
                    </td>
                    <td className="cart_price">
                      <p>{item.price}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <input
                          className="cart_quantity_input"
                          type="text"
                          name="quantity"
                          value={item.count}
                          autocomplete="off"
                          size="2"
                        />
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price">{item.count * item.price}</p>
                      <button onClick={()=>this.handleClickComment(item._id)}>Bình Luận</button>
                    </td>
                  </tr>
                  
                  )
                })}
                </tbody>
              </table>
              
              <hr/>
            </div>
          )
        }
       
      })
      if(count === 0){
        xhtml = <div className='no-bill'>
        <div className="logo-404">
          <div>
          <div className='null-cart'>
            <img src="https://taingay.net/wp-content/uploads/2022/02/logo-do-an-696x696-1.png" alt="" />
            
          </div>
          <h3 className='title'>Không Có Đơn Hàng</h3>
          </div>
         
        </div>
        </div>
      }
      return xhtml;
    }

  }
  handleClick99(){
    this.setState({
      issend:'99'
    })
  }
  handleClick0(){
    this.setState({
      issend:'0'
    })
  }
  handleClick1(){
    this.setState({
      issend:'1'
    })
  }
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
      this.state.id_product
    );
    this.setState({ comment: "" , isComment: false});
  };
  handleClickComment = (_id) =>{
   
    this.setState({
      isComment:true,
      id_product: _id,
    })
  }
  render() {
    let xhtml='';
  
    if(this.state.isComment){
      xhtml = <div className='aler-box'>
        <div className='btn-close ' onClick={() => this.setState({ isComment: false })}>
          X
        </div>
      <div className='aler-title'>
        <h3 className='title'>Đánh giá của bạn về sản phẩn</h3>
      </div>
      <div className='aler-body'>
      <form action="#">
                        
                        <textarea
                          value={this.state.comment}
                          onChange={e =>
                            this.setState({ comment: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-default pull-right"
                          onClick={() => this.submitComment()}
                        >
                          Bình Luận
                        </button>
                      </form>
      </div>
      <div className='alert-footer'>
        <button className="roduct-variation" onClick={() => this.setState({ isComment: false })}>
          Cancel
          
        </button>
      </div>
    </div>
    }
    return (
      <div>
        <header id="header">
          <HeaderMiddle
            islogin={this.props.islogin}
            logout={() => this.props.logout()}
            history={this.props.history}
          />
        </header>
        <div>
          <section id="cart_items">
            <div className="container">
              <div className='bill-title'>
                <h2>Đơn Hàng Của Bạn</h2>
              </div>
              <div className='menu-profile container'>
            <ul>
              <li><button onClick={() => this.handleClick99()} className='menu-custom btn'>Đang Chờ Xử Lý</button></li>
              <li> <button onClick={() => this.handleClick0()}  className='menu-custom btn'>Đang Giao Hàng</button></li>
              <li> <button onClick={() => this.handleClick1()}  className='menu-custom btn'>Đã Giao Hàng</button></li>

            </ul>
              <hr></hr>
            </div>
              {this.renderBill()}
            </div>
            {xhtml}
          </section>
        </div>
        <footer id="footer">
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </footer>
      </div>
    );
  }
}
export default HistoryPurchase;
