import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import { logout } from "../actions/authAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import logo from '../Assets/img/Pinnacle/logoWhite.png'
class HeadBar extends Component {
  constructor() {
    super();
    this.state = { activeItem: "home" };
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleLogOut = () => {
    this.props.logout();
    return( <Redirect to="/auth" />);
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
      <Menu.Item>
        <img src={logo} />
      </Menu.Item>
        <Menu.Item
          name="home"
          as="a"
          active={activeItem === "home"}
          href="https://pinnacleonline.org"
        />

        <Menu.Item
          name="About Us"
          as="a"
          active={activeItem === "About"}
          href="https://pinnacleonline.org/about"
        />

        <Menu.Item
          name="Tutoring at Pinnacle"
          as="a"
          active={activeItem === "Tutoring"}
          href="https://pinnacleonline.org/teach"
        />
        <Menu.Menu position="right">
          {/* <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item> */}
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleLogOut}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, { logout })(HeadBar);
