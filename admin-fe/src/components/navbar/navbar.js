import React, { Component } from 'react'
class Navbar extends Component {

    render() {
        return (
            <header className="header dark-bg">
                <div className="toggle-nav">
                    <div className="icon-reorder tooltips" data-original-title="Toggle Navigation" data-placement="bottom"><i className="icon_menu"></i></div>
                </div>
                <a href="/" className="logo">Food Shop <span className="lite"></span></a>
                <div className="nav search-row" id="top_menu">
                   
                </div>

                <div className="top-nav notification-row">
                    <ul className="nav pull-right top-menu">
                        
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                               
                                <span className="username">Food Shop</span>
                                <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu extended logout">
                                <div className="log-arrow-up"></div>
                                <li>
                                    <a onClick={() => this.props.logout()}><i className="icon_key_alt"></i> Log Out</a>
                                </li>
                            </ul>
                        </li>

                    </ul>

                </div>
            </header>
        )
    }

}
export default Navbar