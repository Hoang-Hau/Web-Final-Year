import React, { Component } from "react";
import { Link } from "react-router-dom";
class Food extends Component {
  constructor() {
    super();
    this.state = {
      sizeall : ['L','M','S','X','XL','XXL'],
      pagination: [],
      food: null,
      file: null,
      imagePreviewUrl: null,
      curr: "add",
      category: "Thể Loại",
      publisher: "Nhà Xuất Bản",
      author: "Tác Giả",
      name: "",
      release_date: null,
      price: "",
      amount:0,
      img: "",
      describe: "",
      id_nsx: "",
      id_author: "",
      id_category: "",
      id_restaurant:"",
      chef:"",
      restaurant: "Nhà hàng",
      noti: "",
      id: null,
      sizes: new Set(),
      checksizes: '',
      check: [false,false,false,false,false,false]
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
    this.checkedCheckbox = new Set();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.food !== null) {
      this.setState({
        imagePreviewUrl: nextProps.food.img
      });
    }
    if (nextProps.isadd === true) {
      this.reset()
    } 
    if(nextProps.isupdate === true) {
      this.reset()
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
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
  handleChangeImg = img => {
    if(img === undefined)
      return
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: img,
        img: reader.result
      });
    };
    reader.readAsDataURL(img);
  };
  invalidPrice = t => {
    var str = t.toString();
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == "+" || str.charAt(i) == "-") count++;
      else break;
    }
    str = str.substring(count, str.length);
    count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == ".") {
        count++;
      }
      if (str.charAt(i) < "0" || str.charAt(i) > "9") return false;
    }
    if (count > 1) return false;
    return !isNaN(Number.parseFloat(str));
  };
  submitAddFood = () => {
    const {
      category,
      id_category,
      restaurant,
      id_restaurant,
      name,
      price,
      release_date,
      describe,
      chef,
      amount,
      file,
    } = this.state;
    console.log(this.state)
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (amount == 0) {
      this.setState({
        noti: "Amount is requerid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (chef.length <= 0) {
      this.setState({
        noti: "Chef invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (release_date === null) {
      this.setState({
        noti: "Day invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (category === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (restaurant === "") {
      this.setState({
        noti: "Restaurant invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (file === null) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addFood(
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
    );
  };
  submitUpdateFood = () => {
    const {
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
      id, 
      img,
      amount
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (chef.length <= 0) {
      this.setState({
        noti: "Chef invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (release_date === null) {
      this.setState({
        noti: "Day invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (category === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (restaurant === "") {
      this.setState({
        noti: "Restaurant invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
   

    
    if (file === null && img === '' ) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updatefood(
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
    );
  };
  renderBtnSubmit = () => {
    if (this.state.curr === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAddFood()}
              className="btn-custom"
              type="submit"
            >
              Add
            </button>
            <button className="btn-custom" disabled type="button">
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn-custom" disabled type="submit">
              Add
            </button>
            <button
              className="btn-custom"
              onClick={() => this.submitUpdateFood()}
              type="button"
            >
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
      noti: "",
        name: "",
        file: null,
        imagePreviewUrl: null,
        curr: "add",
        category: "danh mục",
        restaurant: "nhà hàng",
        amount:0,
        name: "",
        release_date: null,
        price: "",
        img: "",
        describe: "",
        id_nsx: "",     
        id_category: "",
        id_restaurant: "",
        chef:"",
        noti: "",
        id: null,
        sizes:[]
    })
  }
  renderMenuCategory = () => {
    if (this.props.category) {
      console.log("hihi",this.props.category)
      return this.props.category.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                category: element.name,
                id_category: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  renderMenuCategory = () => {
    if (this.props.category) {
      console.log("hihi",this.props.category)
      return this.props.category.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                category: element.name,
                id_category: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };
  getNameCategoryByID = id => {
    for (let i = 0; i < this.props.category.length; i++) {
      if (id === this.props.category[i]._id) return this.props.category[i].name;
    }
  };
  renderMenuRestaurant = () => {
    if (this.props.restaurant) {
      return this.props.restaurant.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                restaurant: element.name,
                id_restaurant: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };
  renderMenuRestaurant = () => {
    if (this.props.restaurant) {
      console.log("hihi",this.props.restaurant)
      return this.props.restaurant.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                restaurant: element.name,
                id_restaurant: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };
  getNameRestaurantByID = id => {
    for (let i = 0; i < this.props.restaurant.length; i++) {
      if (id === this.props.restaurant[i]._id) return this.props.restaurant[i].name;
    }
  };

  handleCheckChieldElement = (event, key) => {
    let sizecheck = this.state.check;
    sizecheck[key] = !sizecheck[key];
    
    if(this.checkedCheckbox.has(event)){
      this.checkedCheckbox.delete(event);
    }else{
      this.checkedCheckbox.add(event);
    }
    this.setState({
      sizes: this.checkedCheckbox
    })
   
  }
  handleUpdate = (element) =>{
    this.setState({
      curr: "update",
      name: element.name,
      release_date: element.release_date.slice(
        0,
        10
      ),
      price: element.price,
      chef:element.chef,
      describe: element.describe,
      category: element.category,
      id_category: element.id_category,
      restaurant: element.restaurant,
      id_restaurant: element.id_restaurant,
      id_nsx: element.id_nsx,
      img: element.img,
      id: element._id,
      amount:element.amount
    })
  }
  handeSearch = (e) => {
    if(e === 13) {
        this.props.searchTextSubmit()
    }
  }
  render() {
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Bảng
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <i className="fa fa-table" />Bảng
              </li>
              <li>
                <i className="fa fa-th-list" />Quản lý
              </li>
              <li>
              <div className="navbar-form">
                  <input className="form-control" placeholder="Search" type="text" 
                     onChange={(e) => this.props.setSearchText(e.target.value)}
                     onKeyUp={(e) => this.handeSearch(e.keyCode)}
                  />
              </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Advanced Table</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Tên
                    </th>
                    <th>
                      <i className="icon_calendar" /> Ngày tạo
                    </th>
                    <th>
                      <i className="icon_mail_alt" /> Giá
                    </th>
                    <th>
                      <i /> Số lượng
                    </th>
                    <th>
                      <i /> Nhà hàng
                    </th>
                    <th>
                      <i /> Danh mục
                    </th>
                    <th>
                      <i  /> Hình ảnh
                    </th>
                    <th>
                      <i /> Chi tiết
                    </th>
                    <th>
                      <i /> Đầu bếp
                    </th>
                    <th>
                      <i className="icon_cogs" /> Hoạt động
                    </th>
                  </tr>
                  {this.props.food.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>{element.release_date.slice(0,10)}</td>
                        <td>{element.price}</td>
                        <td>{element.amount}</td>
                        <td>{element.restaurant}</td>
                        <td>{element.category}</td>
                        <td><img width="100px" height="100px" src={element.img}/></td>
                        <td style={{ width: "40%" }}>{element.describe}</td>
                        <td >{element.chef}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() => this.handleUpdate(element)
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() => this.props.deletefood(element._id)}
                              className="btn btn-danger"
                            >
                              <i className="icon_close_alt2" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Form validations</header>
              <div className="panel-body">
                <div className="form" id="from-book">
                  <div
                    className="form-validate form-horizontal"
                    id="feedback_form"
                    method="get"
                    action=""
                  >
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Tên <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              name: e.target.value
                            });
                          }}
                          value={this.state.name}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Ngày tạo<span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.release_date}
                          onChange={e =>
                            this.setState({
                              release_date: e.target.value
                            })
                          }
                          className="form-control "
                          id="cemail"
                          type="date"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Giá
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.price}
                          onChange={e =>
                            this.setState({
                              price: e.target.value
                            })
                          }
                          className="form-control "
                          id="curl"
                          type="text"
                          name="url"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Số lượng
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.amount}
                          min="0"
                          onChange={e =>
                            this.setState({
                              amount: e.target.value
                            })
                          }
                          className="form-control "
                          id="curl"
                          type="number"
                          name="url"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Miêu Tả <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.describe}
                          onChange={e =>
                            this.setState({
                              describe: e.target.value
                            })
                          }
                          className="form-control"
                          id="subject"
                          name="subject"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Đầu bếp <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.chef}
                          onChange={e =>
                            this.setState({
                              chef: e.target.value
                            })
                          }
                          className="form-control"
                          id="chef"
                          name="chef"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment " className="control-label col-lg-2">
                        Danh mục
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.category} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          {this.renderMenuCategory()}
                        </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment " className="control-label col-lg-2">
                        Nhà hàng
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.restaurant} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          {this.renderMenuRestaurant()}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Image upload{" "}
                      </label>
                      <div className="col-lg-10">
                        <input
                          className="form-control "
                          type="file"
                          id="ccomment"
                          name="comment"
                          required
                          onChange={e =>
                            this.handleChangeImg(e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Image
                      </label>
                      <div className="col-lg-10">
                        <img
                          src={this.state.img}
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtnSubmit()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default Food;
